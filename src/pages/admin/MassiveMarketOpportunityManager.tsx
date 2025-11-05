import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Upload, LinkIcon, Image } from 'lucide-react';
import { toast } from 'sonner';

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  button_text?: string;
  button_url?: string;
  button_enabled?: boolean;
  audio_url?: string;
  audio_duration?: string;
  items?: Array<{
    label: string;
    value: string;
  }>;
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
  metadata: {
    cards: CardData[];
  };
}

const MassiveMarketOpportunityManager = () => {
  const [section, setSection] = useState<SectionData>({
    title: 'Massive Market Opportunity',
    subtitle: 'The global fall detection market represents a multi-billion dollar opportunity with strong growth trajectory',
    listen_button: { text: 'Listen More', url: '', enabled: false },
    read_button: { text: 'Read More', url: '', enabled: false },
    watch_button: { text: 'Watch More', url: '', enabled: false },
    metadata: {
      cards: [
        { id: '1', title: '$417.2M', subtitle: '2024 Market Size', description: 'Current global fall detection market value', button_text: 'Learn More', button_url: '', button_enabled: false, audio_url: '', audio_duration: '' },
        { id: '2', title: '$1.04B', subtitle: '2033 Projection', description: 'Projected market value in 9 years', button_text: 'Learn More', button_url: '', button_enabled: false, audio_url: '', audio_duration: '' },
        { id: '3', title: '10.7%', subtitle: 'Annual Growth', description: 'Compound annual growth rate (CAGR)', button_text: 'Learn More', button_url: '', button_enabled: false, audio_url: '', audio_duration: '' },
        { id: '4', title: 'US Market Demographics', subtitle: '54M Seniors, 30K Facilities', description: '95M Baby Boomers, $374B Annual Healthcare Spending', button_text: 'Learn More', button_url: '', button_enabled: false, audio_url: '', audio_duration: '' },
        { id: '5', title: 'Investment Opportunity', subtitle: '$2.1B+ Addressable Market', description: '5-10% Target Penetration, $105M+ Projected Revenue', button_text: 'Learn More', button_url: '', button_enabled: false, audio_url: '', audio_duration: '' },
      ]
    }
  });
  const [loading, setLoading] = useState(false);
  const [uploadingButton, setUploadingButton] = useState<string | null>(null);
  const [mediaLibrary, setMediaLibrary] = useState<any[]>([]);

  useEffect(() => {
    fetchSection();
    fetchMediaLibrary();
  }, []);

  const fetchMediaLibrary = async () => {
    try {
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMediaLibrary(data || []);
    } catch (error) {
      console.error('Error fetching media library:', error);
    }
  };

  const fetchSection = async () => {
    try {
      const { data, error } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_key', 'massive_market_opportunity')
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setSection(data.content as unknown as SectionData);
      }
    } catch (error) {
      console.error('Error fetching section:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('section_content')
        .upsert({
          section_key: 'massive_market_opportunity',
          content: section as any
        }, {
          onConflict: 'section_key'
        });

      if (error) throw error;
      toast.success('Section saved successfully!');
    } catch (error) {
      console.error('Error saving section:', error);
      toast.error('Failed to save section');
    } finally {
      setLoading(false);
    }
  };

  const handleButtonFileUpload = async (buttonType: 'listen' | 'read' | 'watch', file: File) => {
    setUploadingButton(buttonType);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${buttonType}-${Date.now()}.${fileExt}`;
      const filePath = `sections/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(filePath);

      if (buttonType === 'listen') {
        setSection(prev => ({
          ...prev,
          listen_button: { ...prev.listen_button!, url: publicUrl }
        }));
      } else if (buttonType === 'read') {
        setSection(prev => ({
          ...prev,
          read_button: { ...prev.read_button!, url: publicUrl }
        }));
      } else {
        setSection(prev => ({
          ...prev,
          watch_button: { ...prev.watch_button!, url: publicUrl }
        }));
      }

      toast.success('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploadingButton(null);
    }
  };

  const handleCardFileUpload = async (cardId: string, file: File) => {
    setUploadingButton(cardId);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `card-audio-${cardId}-${Date.now()}.${fileExt}`;
      const filePath = `audio/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(filePath);

      setSection(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          cards: prev.metadata.cards.map(card =>
            card.id === cardId ? { ...card, audio_url: publicUrl } : card
          )
        }
      }));

      toast.success('Audio uploaded successfully!');
    } catch (error) {
      console.error('Error uploading audio:', error);
      toast.error('Failed to upload audio');
    } finally {
      setUploadingButton(null);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Massive Market Opportunity Section Manager</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted/50 rounded-lg border border-primary/20">
            <Label className="text-sm font-semibold text-muted-foreground">Section Tag (Unique Identifier)</Label>
            <p className="text-lg font-mono font-bold text-primary mt-1">massive-market-opportunity</p>
            <p className="text-xs text-muted-foreground mt-2">
              This unique tag identifies this section. It's used for HTML anchors and internal references. 
              Contact administrator to change.
            </p>
          </div>
          
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={section.title}
              onChange={(e) => setSection({ ...section, title: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Textarea
              id="subtitle"
              value={section.subtitle}
              onChange={(e) => setSection({ ...section, subtitle: e.target.value })}
            />
          </div>

          {/* Action Buttons Configuration */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-2 font-semibold">
              <ChevronDown className="w-4 h-4" />
              Listen Button
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4 pl-6">
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
                  value={section.listen_button?.text || ''}
                  onChange={(e) =>
                    setSection({
                      ...section,
                      listen_button: { ...section.listen_button!, text: e.target.value }
                    })
                  }
                />
              </div>
              <Tabs defaultValue="url">
                <TabsList>
                  <TabsTrigger value="url">URL</TabsTrigger>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="library">Library</TabsTrigger>
                </TabsList>
                <TabsContent value="url">
                  <Input
                    placeholder="Enter URL"
                    value={section.listen_button?.url || ''}
                    onChange={(e) =>
                      setSection({
                        ...section,
                        listen_button: { ...section.listen_button!, url: e.target.value }
                      })
                    }
                  />
                </TabsContent>
                <TabsContent value="upload">
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="audio/*,video/*,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleButtonFileUpload('listen', file);
                      }}
                      disabled={uploadingButton === 'listen'}
                    />
                    {uploadingButton === 'listen' && <span>Uploading...</span>}
                  </div>
                </TabsContent>
                <TabsContent value="library">
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {mediaLibrary.map((item) => (
                      <div
                        key={item.id}
                        className="border rounded p-2 cursor-pointer hover:bg-accent"
                        onClick={() =>
                          setSection({
                            ...section,
                            listen_button: { ...section.listen_button!, url: item.file_url }
                          })
                        }
                      >
                        <p className="text-sm truncate">{item.file_name}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-2 font-semibold">
              <ChevronDown className="w-4 h-4" />
              Read Button
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4 pl-6">
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
                  value={section.read_button?.text || ''}
                  onChange={(e) =>
                    setSection({
                      ...section,
                      read_button: { ...section.read_button!, text: e.target.value }
                    })
                  }
                />
              </div>
              <Tabs defaultValue="url">
                <TabsList>
                  <TabsTrigger value="url">URL</TabsTrigger>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="library">Library</TabsTrigger>
                </TabsList>
                <TabsContent value="url">
                  <Input
                    placeholder="Enter URL"
                    value={section.read_button?.url || ''}
                    onChange={(e) =>
                      setSection({
                        ...section,
                        read_button: { ...section.read_button!, url: e.target.value }
                      })
                    }
                  />
                </TabsContent>
                <TabsContent value="upload">
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="audio/*,video/*,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleButtonFileUpload('read', file);
                      }}
                      disabled={uploadingButton === 'read'}
                    />
                    {uploadingButton === 'read' && <span>Uploading...</span>}
                  </div>
                </TabsContent>
                <TabsContent value="library">
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {mediaLibrary.map((item) => (
                      <div
                        key={item.id}
                        className="border rounded p-2 cursor-pointer hover:bg-accent"
                        onClick={() =>
                          setSection({
                            ...section,
                            read_button: { ...section.read_button!, url: item.file_url }
                          })
                        }
                      >
                        <p className="text-sm truncate">{item.file_name}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-2 font-semibold">
              <ChevronDown className="w-4 h-4" />
              Watch Button
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4 pl-6">
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
                  value={section.watch_button?.text || ''}
                  onChange={(e) =>
                    setSection({
                      ...section,
                      watch_button: { ...section.watch_button!, text: e.target.value }
                    })
                  }
                />
              </div>
              <Tabs defaultValue="url">
                <TabsList>
                  <TabsTrigger value="url">URL</TabsTrigger>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="library">Library</TabsTrigger>
                </TabsList>
                <TabsContent value="url">
                  <Input
                    placeholder="Enter URL"
                    value={section.watch_button?.url || ''}
                    onChange={(e) =>
                      setSection({
                        ...section,
                        watch_button: { ...section.watch_button!, url: e.target.value }
                      })
                    }
                  />
                </TabsContent>
                <TabsContent value="upload">
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="audio/*,video/*,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleButtonFileUpload('watch', file);
                      }}
                      disabled={uploadingButton === 'watch'}
                    />
                    {uploadingButton === 'watch' && <span>Uploading...</span>}
                  </div>
                </TabsContent>
                <TabsContent value="library">
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {mediaLibrary.map((item) => (
                      <div
                        key={item.id}
                        className="border rounded p-2 cursor-pointer hover:bg-accent"
                        onClick={() =>
                          setSection({
                            ...section,
                            watch_button: { ...section.watch_button!, url: item.file_url }
                          })
                        }
                      >
                        <p className="text-sm truncate">{item.file_name}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CollapsibleContent>
          </Collapsible>

          {/* Cards Configuration */}
          <div className="space-y-4">
            <h3 className="font-semibold">Cards</h3>
            {section.metadata.cards.map((card, index) => (
              <Collapsible key={card.id}>
                <CollapsibleTrigger className="flex items-center gap-2 font-semibold">
                  <ChevronDown className="w-4 h-4" />
                  Card {index + 1}: {card.title}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-4 pl-6">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={card.title}
                      onChange={(e) =>
                        setSection({
                          ...section,
                          metadata: {
                            ...section.metadata,
                            cards: section.metadata.cards.map((c) =>
                              c.id === card.id ? { ...c, title: e.target.value } : c
                            )
                          }
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Input
                      value={card.subtitle}
                      onChange={(e) =>
                        setSection({
                          ...section,
                          metadata: {
                            ...section.metadata,
                            cards: section.metadata.cards.map((c) =>
                              c.id === card.id ? { ...c, subtitle: e.target.value } : c
                            )
                          }
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={card.description}
                      onChange={(e) =>
                        setSection({
                          ...section,
                          metadata: {
                            ...section.metadata,
                            cards: section.metadata.cards.map((c) =>
                              c.id === card.id ? { ...c, description: e.target.value } : c
                            )
                          }
                        })
                      }
                    />
                  </div>
                  
                  {/* Items section for cards 4 and 5 (US Market Demographics and Investment Opportunity) */}
                  {index >= 3 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Data Items (for card layout)</Label>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const currentItems = card.items || [];
                            setSection({
                              ...section,
                              metadata: {
                                ...section.metadata,
                                cards: section.metadata.cards.map((c) =>
                                  c.id === card.id 
                                    ? { ...c, items: [...currentItems, { label: '', value: '' }] } 
                                    : c
                                )
                              }
                            });
                          }}
                        >
                          Add Item
                        </Button>
                      </div>
                      
                      {(card.items || []).map((item, itemIdx) => (
                        <div key={itemIdx} className="flex gap-2 items-start border p-3 rounded">
                          <div className="flex-1 space-y-2">
                            <Input
                              placeholder="Label (e.g., Addressable Market Size)"
                              value={item.label}
                              onChange={(e) => {
                                const newItems = [...(card.items || [])];
                                newItems[itemIdx] = { ...newItems[itemIdx], label: e.target.value };
                                setSection({
                                  ...section,
                                  metadata: {
                                    ...section.metadata,
                                    cards: section.metadata.cards.map((c) =>
                                      c.id === card.id ? { ...c, items: newItems } : c
                                    )
                                  }
                                });
                              }}
                            />
                            <Input
                              placeholder="Value (e.g., $2.1B+)"
                              value={item.value}
                              onChange={(e) => {
                                const newItems = [...(card.items || [])];
                                newItems[itemIdx] = { ...newItems[itemIdx], value: e.target.value };
                                setSection({
                                  ...section,
                                  metadata: {
                                    ...section.metadata,
                                    cards: section.metadata.cards.map((c) =>
                                      c.id === card.id ? { ...c, items: newItems } : c
                                    )
                                  }
                                });
                              }}
                            />
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              const newItems = (card.items || []).filter((_, i) => i !== itemIdx);
                              setSection({
                                ...section,
                                metadata: {
                                  ...section.metadata,
                                  cards: section.metadata.cards.map((c) =>
                                    c.id === card.id ? { ...c, items: newItems } : c
                                  )
                                }
                              });
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`button-enabled-${card.id}`}
                      checked={card.button_enabled}
                      onCheckedChange={(checked) =>
                        setSection({
                          ...section,
                          metadata: {
                            ...section.metadata,
                            cards: section.metadata.cards.map((c) =>
                              c.id === card.id ? { ...c, button_enabled: checked as boolean } : c
                            )
                          }
                        })
                      }
                    />
                    <Label htmlFor={`button-enabled-${card.id}`}>Enable Learn More Button</Label>
                  </div>
                  {card.button_enabled && (
                    <>
                      <div>
                        <Label>Button Text</Label>
                        <Input
                          value={card.button_text || ''}
                          onChange={(e) =>
                            setSection({
                              ...section,
                              metadata: {
                                ...section.metadata,
                                cards: section.metadata.cards.map((c) =>
                                  c.id === card.id ? { ...c, button_text: e.target.value } : c
                                )
                              }
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Button URL</Label>
                        <Input
                          value={card.button_url || ''}
                          onChange={(e) =>
                            setSection({
                              ...section,
                              metadata: {
                                ...section.metadata,
                                cards: section.metadata.cards.map((c) =>
                                  c.id === card.id ? { ...c, button_url: e.target.value } : c
                                )
                              }
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Audio File</Label>
                        <Input
                          type="file"
                          accept="audio/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleCardFileUpload(card.id, file);
                          }}
                          disabled={uploadingButton === card.id}
                        />
                        {uploadingButton === card.id && <span className="text-sm">Uploading...</span>}
                        {card.audio_url && <p className="text-sm text-muted-foreground mt-1">Current: {card.audio_url}</p>}
                      </div>
                      <div>
                        <Label>Audio Duration (e.g., "3 min")</Label>
                        <Input
                          value={card.audio_duration || ''}
                          onChange={(e) =>
                            setSection({
                              ...section,
                              metadata: {
                                ...section.metadata,
                                cards: section.metadata.cards.map((c) =>
                                  c.id === card.id ? { ...c, audio_duration: e.target.value } : c
                                )
                              }
                            })
                          }
                        />
                      </div>
                    </>
                  )}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          <Button onClick={handleSave} disabled={loading} className="w-full">
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MassiveMarketOpportunityManager;
