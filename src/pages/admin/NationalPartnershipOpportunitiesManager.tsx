import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Upload, Plus, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ExpansionCard {
  number: string;
  title: string;
  description: string;
  months: string;
  facilities: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
}

interface HealthcarePartner {
  name: string;
  description: string;
  bgColor: string;
  iconBgColor: string;
  icon: string;
}

interface SeniorLivingChain {
  name: string;
  description: string;
  bgColor: string;
  iconBgColor: string;
  icon: string;
}

interface TimelineCard {
  year: string;
  description: string;
  facilities: string;
  revenue: string;
  bgColor: string;
  textColor: string;
  dotColor: string;
}

interface SectionData {
  title: string;
  subtitle: string;
  listen_button?: {
    text: string;
    url: string;
    enabled: boolean;
  };
  read_button?: {
    text: string;
    url: string;
    enabled: boolean;
  };
  watch_button?: {
    text: string;
    url: string;
    enabled: boolean;
  };
  expansion_strategy: {
    heading: string;
    description: string;
    cards: ExpansionCard[];
  };
  strategic_partners: {
    heading: string;
    healthcare_systems: {
      title: string;
      partners: HealthcarePartner[];
    };
    senior_living_chains: {
      title: string;
      chains: SeniorLivingChain[];
    };
    partnership_benefits: {
      title: string;
      gradient: string;
      benefits: string[];
    };
  };
  market_timeline: {
    heading: string;
    cards: TimelineCard[];
  };
}

const NationalPartnershipOpportunitiesManager = () => {
  const [section, setSection] = useState<SectionData>({
    title: '',
    subtitle: '',
    listen_button: { text: 'Listen More', url: '', enabled: false },
    read_button: { text: 'Read More', url: '', enabled: false },
    watch_button: { text: 'Watch More', url: '', enabled: false },
    expansion_strategy: {
      heading: '',
      description: '',
      cards: []
    },
    strategic_partners: {
      heading: '',
      healthcare_systems: {
        title: '',
        partners: []
      },
      senior_living_chains: {
        title: '',
        chains: []
      },
      partnership_benefits: {
        title: '',
        gradient: '',
        benefits: []
      }
    },
    market_timeline: {
      heading: '',
      cards: []
    }
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    try {
      const { data, error } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_key', 'partnership_opportunities')
        .single();

      if (error) throw error;

      if (data) {
        setSection(data.content as unknown as SectionData);
      }
    } catch (error) {
      console.error('Error fetching section:', error);
      toast.error('Failed to load section data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('section_content')
        .upsert(
          {
            section_key: 'partnership_opportunities',
            content: section as any,
          },
          {
            onConflict: 'section_key'
          }
        );

      if (error) throw error;

      toast.success('Section updated successfully');
    } catch (error) {
      console.error('Error saving section:', error);
      toast.error('Failed to save section');
    }
  };

  const handleButtonFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    buttonType: 'listen' | 'read' | 'watch'
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setUploading(true);
    setUploadProgress(0);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(filePath);

      setSection(prev => ({
        ...prev,
        [`${buttonType}_button`]: {
          ...prev[`${buttonType}_button` as keyof typeof prev] as any,
          url: publicUrl
        }
      }));

      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>National Partnership Opportunities Section</CardTitle>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <Label className="text-sm font-medium">Section Key (for HTML anchors)</Label>
            <Badge variant="secondary" className="mt-2">partnership-opportunities</Badge>
            <p className="text-sm text-muted-foreground mt-2">
              This is used for internal references and cannot be changed
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Title and Subtitle */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Section Title</Label>
              <Input
                id="title"
                value={section.title}
                onChange={(e) => setSection({ ...section, title: e.target.value })}
                placeholder="Section title"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Section Subtitle</Label>
              <Textarea
                id="subtitle"
                value={section.subtitle}
                onChange={(e) => setSection({ ...section, subtitle: e.target.value })}
                placeholder="Section subtitle"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold">Action Buttons</h3>

            {/* Listen Button */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                <div className="flex items-center gap-2">
                  <ChevronDown className="w-4 h-4" />
                  <span className="font-medium">Listen Button</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-4 border rounded-lg space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="listen-enabled"
                    checked={section.listen_button?.enabled}
                    onCheckedChange={(checked) =>
                      setSection({
                        ...section,
                        listen_button: { ...section.listen_button!, enabled: checked as boolean }
                      })
                    }
                  />
                  <Label htmlFor="listen-enabled">Enable Listen Button</Label>
                </div>
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={section.listen_button?.text}
                    onChange={(e) =>
                      setSection({
                        ...section,
                        listen_button: { ...section.listen_button!, text: e.target.value }
                      })
                    }
                    placeholder="Listen More"
                  />
                </div>
                <Tabs defaultValue="url">
                  <TabsList>
                    <TabsTrigger value="url">URL</TabsTrigger>
                    <TabsTrigger value="upload">Upload Audio File</TabsTrigger>
                  </TabsList>
                  <TabsContent value="url" className="space-y-2">
                    <Label>Audio URL</Label>
                    <Input
                      value={section.listen_button?.url}
                      onChange={(e) =>
                        setSection({
                          ...section,
                          listen_button: { ...section.listen_button!, url: e.target.value }
                        })
                      }
                      placeholder="https://..."
                    />
                  </TabsContent>
                  <TabsContent value="upload" className="space-y-2">
                    <Label>Upload Audio File</Label>
                    <Input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => handleButtonFileUpload(e, 'listen')}
                      disabled={uploading}
                    />
                    {uploading && <Progress value={uploadProgress} />}
                  </TabsContent>
                </Tabs>
              </CollapsibleContent>
            </Collapsible>

            {/* Read Button */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                <div className="flex items-center gap-2">
                  <ChevronDown className="w-4 h-4" />
                  <span className="font-medium">Read Button</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-4 border rounded-lg space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="read-enabled"
                    checked={section.read_button?.enabled}
                    onCheckedChange={(checked) =>
                      setSection({
                        ...section,
                        read_button: { ...section.read_button!, enabled: checked as boolean }
                      })
                    }
                  />
                  <Label htmlFor="read-enabled">Enable Read Button</Label>
                </div>
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={section.read_button?.text}
                    onChange={(e) =>
                      setSection({
                        ...section,
                        read_button: { ...section.read_button!, text: e.target.value }
                      })
                    }
                    placeholder="Read More"
                  />
                </div>
                <Tabs defaultValue="url">
                  <TabsList>
                    <TabsTrigger value="url">URL</TabsTrigger>
                    <TabsTrigger value="upload">Upload File</TabsTrigger>
                  </TabsList>
                  <TabsContent value="url" className="space-y-2">
                    <Label>Document URL</Label>
                    <Input
                      value={section.read_button?.url}
                      onChange={(e) =>
                        setSection({
                          ...section,
                          read_button: { ...section.read_button!, url: e.target.value }
                        })
                      }
                      placeholder="https://..."
                    />
                  </TabsContent>
                  <TabsContent value="upload" className="space-y-2">
                    <Label>Upload PDF/Document</Label>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleButtonFileUpload(e, 'read')}
                      disabled={uploading}
                    />
                    {uploading && <Progress value={uploadProgress} />}
                  </TabsContent>
                </Tabs>
              </CollapsibleContent>
            </Collapsible>

            {/* Watch Button */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                <div className="flex items-center gap-2">
                  <ChevronDown className="w-4 h-4" />
                  <span className="font-medium">Watch Button</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-4 border rounded-lg space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="watch-enabled"
                    checked={section.watch_button?.enabled}
                    onCheckedChange={(checked) =>
                      setSection({
                        ...section,
                        watch_button: { ...section.watch_button!, enabled: checked as boolean }
                      })
                    }
                  />
                  <Label htmlFor="watch-enabled">Enable Watch Button</Label>
                </div>
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={section.watch_button?.text}
                    onChange={(e) =>
                      setSection({
                        ...section,
                        watch_button: { ...section.watch_button!, text: e.target.value }
                      })
                    }
                    placeholder="Watch More"
                  />
                </div>
                <Tabs defaultValue="url">
                  <TabsList>
                    <TabsTrigger value="url">URL</TabsTrigger>
                    <TabsTrigger value="upload">Upload File</TabsTrigger>
                  </TabsList>
                  <TabsContent value="url" className="space-y-2">
                    <Label>Video URL</Label>
                    <Input
                      value={section.watch_button?.url}
                      onChange={(e) =>
                        setSection({
                          ...section,
                          watch_button: { ...section.watch_button!, url: e.target.value }
                        })
                      }
                      placeholder="https://..."
                    />
                  </TabsContent>
                  <TabsContent value="upload" className="space-y-2">
                    <Label>Upload Video</Label>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleButtonFileUpload(e, 'watch')}
                      disabled={uploading}
                    />
                    {uploading && <Progress value={uploadProgress} />}
                  </TabsContent>
                </Tabs>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Expansion Strategy Section */}
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold">Expansion Strategy</h3>
            <div>
              <Label>Heading</Label>
              <Input
                value={section.expansion_strategy.heading}
                onChange={(e) =>
                  setSection({
                    ...section,
                    expansion_strategy: { ...section.expansion_strategy, heading: e.target.value }
                  })
                }
                placeholder="Expansion Strategy"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={section.expansion_strategy.description}
                onChange={(e) =>
                  setSection({
                    ...section,
                    expansion_strategy: { ...section.expansion_strategy, description: e.target.value }
                  })
                }
                placeholder="Description"
              />
            </div>

            {/* Expansion Cards */}
            {section.expansion_strategy.cards.map((card, index) => (
              <Collapsible key={index}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                  <div className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4" />
                    <span className="font-medium">{card.title || `Card ${index + 1}`}</span>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 p-4 border rounded-lg space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Number</Label>
                      <Input
                        value={card.number}
                        onChange={(e) => {
                          const newCards = [...section.expansion_strategy.cards];
                          newCards[index].number = e.target.value;
                          setSection({
                            ...section,
                            expansion_strategy: { ...section.expansion_strategy, cards: newCards }
                          });
                        }}
                        placeholder="1"
                      />
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={card.title}
                        onChange={(e) => {
                          const newCards = [...section.expansion_strategy.cards];
                          newCards[index].title = e.target.value;
                          setSection({
                            ...section,
                            expansion_strategy: { ...section.expansion_strategy, cards: newCards }
                          });
                        }}
                        placeholder="Oregon Pilot Program"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={card.description}
                      onChange={(e) => {
                        const newCards = [...section.expansion_strategy.cards];
                        newCards[index].description = e.target.value;
                        setSection({
                          ...section,
                          expansion_strategy: { ...section.expansion_strategy, cards: newCards }
                        });
                      }}
                      placeholder="Description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Months</Label>
                      <Input
                        value={card.months}
                        onChange={(e) => {
                          const newCards = [...section.expansion_strategy.cards];
                          newCards[index].months = e.target.value;
                          setSection({
                            ...section,
                            expansion_strategy: { ...section.expansion_strategy, cards: newCards }
                          });
                        }}
                        placeholder="6-12"
                      />
                    </div>
                    <div>
                      <Label>Facilities</Label>
                      <Input
                        value={card.facilities}
                        onChange={(e) => {
                          const newCards = [...section.expansion_strategy.cards];
                          newCards[index].facilities = e.target.value;
                          setSection({
                            ...section,
                            expansion_strategy: { ...section.expansion_strategy, cards: newCards }
                          });
                        }}
                        placeholder="10"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Border Color</Label>
                      <Input
                        value={card.borderColor}
                        onChange={(e) => {
                          const newCards = [...section.expansion_strategy.cards];
                          newCards[index].borderColor = e.target.value;
                          setSection({
                            ...section,
                            expansion_strategy: { ...section.expansion_strategy, cards: newCards }
                          });
                        }}
                        placeholder="border-blue-500"
                      />
                    </div>
                    <div>
                      <Label>Background Color</Label>
                      <Input
                        value={card.bgColor}
                        onChange={(e) => {
                          const newCards = [...section.expansion_strategy.cards];
                          newCards[index].bgColor = e.target.value;
                          setSection({
                            ...section,
                            expansion_strategy: { ...section.expansion_strategy, cards: newCards }
                          });
                        }}
                        placeholder="bg-blue-50"
                      />
                    </div>
                    <div>
                      <Label>Text Color</Label>
                      <Input
                        value={card.textColor}
                        onChange={(e) => {
                          const newCards = [...section.expansion_strategy.cards];
                          newCards[index].textColor = e.target.value;
                          setSection({
                            ...section,
                            expansion_strategy: { ...section.expansion_strategy, cards: newCards }
                          });
                        }}
                        placeholder="text-blue-600"
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          {/* Strategic Partners Section */}
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold">Strategic Partners</h3>
            <div>
              <Label>Heading</Label>
              <Input
                value={section.strategic_partners.heading}
                onChange={(e) =>
                  setSection({
                    ...section,
                    strategic_partners: { ...section.strategic_partners, heading: e.target.value }
                  })
                }
                placeholder="Strategic Partners"
              />
            </div>

            {/* Healthcare Systems */}
            <div className="space-y-4">
              <div>
                <Label>Healthcare Systems Title</Label>
                <Input
                  value={section.strategic_partners.healthcare_systems.title}
                  onChange={(e) =>
                    setSection({
                      ...section,
                      strategic_partners: {
                        ...section.strategic_partners,
                        healthcare_systems: {
                          ...section.strategic_partners.healthcare_systems,
                          title: e.target.value
                        }
                      }
                    })
                  }
                  placeholder="Healthcare Systems"
                />
              </div>

              {section.strategic_partners.healthcare_systems.partners.map((partner, index) => (
                <Collapsible key={index}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                    <div className="flex items-center gap-2">
                      <ChevronDown className="w-4 h-4" />
                      <span className="font-medium">{partner.name || `Partner ${index + 1}`}</span>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 p-4 border rounded-lg space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={partner.name}
                        onChange={(e) => {
                          const newPartners = [...section.strategic_partners.healthcare_systems.partners];
                          newPartners[index].name = e.target.value;
                          setSection({
                            ...section,
                            strategic_partners: {
                              ...section.strategic_partners,
                              healthcare_systems: {
                                ...section.strategic_partners.healthcare_systems,
                                partners: newPartners
                              }
                            }
                          });
                        }}
                        placeholder="Providence Health"
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input
                        value={partner.description}
                        onChange={(e) => {
                          const newPartners = [...section.strategic_partners.healthcare_systems.partners];
                          newPartners[index].description = e.target.value;
                          setSection({
                            ...section,
                            strategic_partners: {
                              ...section.strategic_partners,
                              healthcare_systems: {
                                ...section.strategic_partners.healthcare_systems,
                                partners: newPartners
                              }
                            }
                          });
                        }}
                        placeholder="51 hospitals, 900+ clinics"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Background Color</Label>
                        <Input
                          value={partner.bgColor}
                          onChange={(e) => {
                            const newPartners = [...section.strategic_partners.healthcare_systems.partners];
                            newPartners[index].bgColor = e.target.value;
                            setSection({
                              ...section,
                              strategic_partners: {
                                ...section.strategic_partners,
                                healthcare_systems: {
                                  ...section.strategic_partners.healthcare_systems,
                                  partners: newPartners
                                }
                              }
                            });
                          }}
                          placeholder="bg-blue-50"
                        />
                      </div>
                      <div>
                        <Label>Icon BG Color</Label>
                        <Input
                          value={partner.iconBgColor}
                          onChange={(e) => {
                            const newPartners = [...section.strategic_partners.healthcare_systems.partners];
                            newPartners[index].iconBgColor = e.target.value;
                            setSection({
                              ...section,
                              strategic_partners: {
                                ...section.strategic_partners,
                                healthcare_systems: {
                                  ...section.strategic_partners.healthcare_systems,
                                  partners: newPartners
                                }
                              }
                            });
                          }}
                          placeholder="bg-blue-600"
                        />
                      </div>
                      <div>
                        <Label>Icon (Font Awesome)</Label>
                        <Input
                          value={partner.icon}
                          onChange={(e) => {
                            const newPartners = [...section.strategic_partners.healthcare_systems.partners];
                            newPartners[index].icon = e.target.value;
                            setSection({
                              ...section,
                              strategic_partners: {
                                ...section.strategic_partners,
                                healthcare_systems: {
                                  ...section.strategic_partners.healthcare_systems,
                                  partners: newPartners
                                }
                              }
                            });
                          }}
                          placeholder="fa-hospital"
                        />
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>

            {/* Senior Living Chains */}
            <div className="space-y-4">
              <div>
                <Label>Senior Living Chains Title</Label>
                <Input
                  value={section.strategic_partners.senior_living_chains.title}
                  onChange={(e) =>
                    setSection({
                      ...section,
                      strategic_partners: {
                        ...section.strategic_partners,
                        senior_living_chains: {
                          ...section.strategic_partners.senior_living_chains,
                          title: e.target.value
                        }
                      }
                    })
                  }
                  placeholder="Senior Living Chains"
                />
              </div>

              {section.strategic_partners.senior_living_chains.chains.map((chain, index) => (
                <Collapsible key={index}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                    <div className="flex items-center gap-2">
                      <ChevronDown className="w-4 h-4" />
                      <span className="font-medium">{chain.name || `Chain ${index + 1}`}</span>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 p-4 border rounded-lg space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={chain.name}
                        onChange={(e) => {
                          const newChains = [...section.strategic_partners.senior_living_chains.chains];
                          newChains[index].name = e.target.value;
                          setSection({
                            ...section,
                            strategic_partners: {
                              ...section.strategic_partners,
                              senior_living_chains: {
                                ...section.strategic_partners.senior_living_chains,
                                chains: newChains
                              }
                            }
                          });
                        }}
                        placeholder="Brookdale Senior Living"
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input
                        value={chain.description}
                        onChange={(e) => {
                          const newChains = [...section.strategic_partners.senior_living_chains.chains];
                          newChains[index].description = e.target.value;
                          setSection({
                            ...section,
                            strategic_partners: {
                              ...section.strategic_partners,
                              senior_living_chains: {
                                ...section.strategic_partners.senior_living_chains,
                                chains: newChains
                              }
                            }
                          });
                        }}
                        placeholder="700+ communities nationwide"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Background Color</Label>
                        <Input
                          value={chain.bgColor}
                          onChange={(e) => {
                            const newChains = [...section.strategic_partners.senior_living_chains.chains];
                            newChains[index].bgColor = e.target.value;
                            setSection({
                              ...section,
                              strategic_partners: {
                                ...section.strategic_partners,
                                senior_living_chains: {
                                  ...section.strategic_partners.senior_living_chains,
                                  chains: newChains
                                }
                              }
                            });
                          }}
                          placeholder="bg-gray-50"
                        />
                      </div>
                      <div>
                        <Label>Icon BG Color</Label>
                        <Input
                          value={chain.iconBgColor}
                          onChange={(e) => {
                            const newChains = [...section.strategic_partners.senior_living_chains.chains];
                            newChains[index].iconBgColor = e.target.value;
                            setSection({
                              ...section,
                              strategic_partners: {
                                ...section.strategic_partners,
                                senior_living_chains: {
                                  ...section.strategic_partners.senior_living_chains,
                                  chains: newChains
                                }
                              }
                            });
                          }}
                          placeholder="bg-orange-100"
                        />
                      </div>
                      <div>
                        <Label>Icon (Font Awesome)</Label>
                        <Input
                          value={chain.icon}
                          onChange={(e) => {
                            const newChains = [...section.strategic_partners.senior_living_chains.chains];
                            newChains[index].icon = e.target.value;
                            setSection({
                              ...section,
                              strategic_partners: {
                                ...section.strategic_partners,
                                senior_living_chains: {
                                  ...section.strategic_partners.senior_living_chains,
                                  chains: newChains
                                }
                              }
                            });
                          }}
                          placeholder="fa-home"
                        />
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>

            {/* Partnership Benefits */}
            <div className="space-y-4">
              <div>
                <Label>Partnership Benefits Title</Label>
                <Input
                  value={section.strategic_partners.partnership_benefits.title}
                  onChange={(e) =>
                    setSection({
                      ...section,
                      strategic_partners: {
                        ...section.strategic_partners,
                        partnership_benefits: {
                          ...section.strategic_partners.partnership_benefits,
                          title: e.target.value
                        }
                      }
                    })
                  }
                  placeholder="Partnership Benefits"
                />
              </div>
              <div>
                <Label>Gradient</Label>
                <Input
                  value={section.strategic_partners.partnership_benefits.gradient}
                  onChange={(e) =>
                    setSection({
                      ...section,
                      strategic_partners: {
                        ...section.strategic_partners,
                        partnership_benefits: {
                          ...section.strategic_partners.partnership_benefits,
                          gradient: e.target.value
                        }
                      }
                    })
                  }
                  placeholder="from-blue-600 to-purple-600"
                />
              </div>
              <div>
                <Label>Benefits (one per line)</Label>
                <Textarea
                  value={section.strategic_partners.partnership_benefits.benefits.join('\n')}
                  onChange={(e) =>
                    setSection({
                      ...section,
                      strategic_partners: {
                        ...section.strategic_partners,
                        partnership_benefits: {
                          ...section.strategic_partners.partnership_benefits,
                          benefits: e.target.value.split('\n').filter(b => b.trim())
                        }
                      }
                    })
                  }
                  placeholder="Enter benefits, one per line"
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Market Timeline Section */}
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold">Market Penetration Timeline</h3>
            <div>
              <Label>Heading</Label>
              <Input
                value={section.market_timeline.heading}
                onChange={(e) =>
                  setSection({
                    ...section,
                    market_timeline: { ...section.market_timeline, heading: e.target.value }
                  })
                }
                placeholder="Market Penetration Timeline"
              />
            </div>

            {section.market_timeline.cards.map((card, index) => (
              <Collapsible key={index}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                  <div className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4" />
                    <span className="font-medium">{card.year || `Timeline ${index + 1}`}</span>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 p-4 border rounded-lg space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Year Range</Label>
                      <Input
                        value={card.year}
                        onChange={(e) => {
                          const newCards = [...section.market_timeline.cards];
                          newCards[index].year = e.target.value;
                          setSection({
                            ...section,
                            market_timeline: { ...section.market_timeline, cards: newCards }
                          });
                        }}
                        placeholder="Year 1-2"
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input
                        value={card.description}
                        onChange={(e) => {
                          const newCards = [...section.market_timeline.cards];
                          newCards[index].description = e.target.value;
                          setSection({
                            ...section,
                            market_timeline: { ...section.market_timeline, cards: newCards }
                          });
                        }}
                        placeholder="Oregon Pilot & Regional Expansion"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Facilities</Label>
                      <Input
                        value={card.facilities}
                        onChange={(e) => {
                          const newCards = [...section.market_timeline.cards];
                          newCards[index].facilities = e.target.value;
                          setSection({
                            ...section,
                            market_timeline: { ...section.market_timeline, cards: newCards }
                          });
                        }}
                        placeholder="50-100"
                      />
                    </div>
                    <div>
                      <Label>Revenue</Label>
                      <Input
                        value={card.revenue}
                        onChange={(e) => {
                          const newCards = [...section.market_timeline.cards];
                          newCards[index].revenue = e.target.value;
                          setSection({
                            ...section,
                            market_timeline: { ...section.market_timeline, cards: newCards }
                          });
                        }}
                        placeholder="$2-5M"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Background Color</Label>
                      <Input
                        value={card.bgColor}
                        onChange={(e) => {
                          const newCards = [...section.market_timeline.cards];
                          newCards[index].bgColor = e.target.value;
                          setSection({
                            ...section,
                            market_timeline: { ...section.market_timeline, cards: newCards }
                          });
                        }}
                        placeholder="bg-blue-50"
                      />
                    </div>
                    <div>
                      <Label>Text Color</Label>
                      <Input
                        value={card.textColor}
                        onChange={(e) => {
                          const newCards = [...section.market_timeline.cards];
                          newCards[index].textColor = e.target.value;
                          setSection({
                            ...section,
                            market_timeline: { ...section.market_timeline, cards: newCards }
                          });
                        }}
                        placeholder="text-blue-600"
                      />
                    </div>
                    <div>
                      <Label>Dot Color</Label>
                      <Input
                        value={card.dotColor}
                        onChange={(e) => {
                          const newCards = [...section.market_timeline.cards];
                          newCards[index].dotColor = e.target.value;
                          setSection({
                            ...section,
                            market_timeline: { ...section.market_timeline, cards: newCards }
                          });
                        }}
                        placeholder="bg-blue-500"
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NationalPartnershipOpportunitiesManager;
