import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ChevronDown, ChevronUp, Save, Plus, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { FileUploader } from "@/components/admin/FileUploader";

interface CellData {
  text: string;
  bg: string;
  textColor: string;
  icon: 'check' | 'x' | null;
}

interface RowData {
  technology: string;
  cells: CellData[];
}

interface SectionData {
  title: string;
  subtitle: string;
  listen_button: {
    text: string;
    url: string;
    enabled: boolean;
  };
  read_button: {
    text: string;
    url: string;
    enabled: boolean;
  };
  watch_button: {
    text: string;
    url: string;
    enabled: boolean;
  };
  columns: string[];
  rows: RowData[];
}

const bgColorOptions = [
  { value: 'bg-white', label: 'White' },
  { value: 'bg-green-50', label: 'Green' },
  { value: 'bg-red-50', label: 'Red' },
  { value: 'bg-orange-50', label: 'Orange' },
  { value: 'bg-gray-50', label: 'Gray' },
];

const textColorOptions = [
  { value: 'text-gray-900', label: 'Black' },
  { value: 'text-green-700', label: 'Green' },
  { value: 'text-red-700', label: 'Red' },
  { value: 'text-orange-700', label: 'Orange' },
  { value: 'text-gray-700', label: 'Gray' },
];

const iconOptions = [
  { value: 'null', label: 'None' },
  { value: 'check', label: 'Check ✓' },
  { value: 'x', label: 'X ✗' },
];

const TechnologyComparisonManager = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState({
    listen: false,
    read: false,
    watch: false,
    columns: true,
    rows: true,
  });

  const [sectionData, setSectionData] = useState<SectionData>({
    title: "Technology Comparison Matrix",
    subtitle: "",
    listen_button: {
      text: "Listen More",
      url: "",
      enabled: false,
    },
    read_button: {
      text: "Read More",
      url: "",
      enabled: false,
    },
    watch_button: {
      text: "Watch More",
      url: "",
      enabled: false,
    },
    columns: [
      "Captures Images?",
      "Bathroom Safe?",
      "Wearable Required?",
      "User Compliance Issue?",
      "Installation Complexity"
    ],
    rows: [
      {
        technology: "Camera AI\n(SafelyYou)",
        cells: [
          { text: "Yes (deleted after non-fall events)", bg: "bg-red-50", textColor: "text-red-700", icon: "x" },
          { text: "No (privacy laws prohibit)", bg: "bg-red-50", textColor: "text-red-700", icon: "x" },
          { text: "No", bg: "bg-green-50", textColor: "text-green-700", icon: "check" },
          { text: "N/A", bg: "bg-gray-50", textColor: "text-gray-700", icon: null },
          { text: "Moderate (camera mounting)", bg: "bg-orange-50", textColor: "text-orange-700", icon: null }
        ]
      }
    ]
  });

  useEffect(() => {
    fetchSectionData();
  }, []);

  const fetchSectionData = async () => {
    try {
      const { data, error } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_key', 'technology-comparison')
        .single();

      if (error) throw error;
      if (data?.content) {
        setSectionData(data.content as unknown as SectionData);
      }
    } catch (error) {
      console.error('Error fetching section data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('section_content')
        .upsert({
          section_key: 'technology-comparison',
          content: sectionData as any,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'section_key'
        });

      if (error) throw error;

      toast.success('Technology Comparison Matrix updated successfully');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const addColumn = () => {
    setSectionData({
      ...sectionData,
      columns: [...sectionData.columns, "New Column"],
      rows: sectionData.rows.map(row => ({
        ...row,
        cells: [...row.cells, { text: "", bg: "bg-white", textColor: "text-gray-900", icon: null }]
      }))
    });
  };

  const removeColumn = (columnIndex: number) => {
    setSectionData({
      ...sectionData,
      columns: sectionData.columns.filter((_, i) => i !== columnIndex),
      rows: sectionData.rows.map(row => ({
        ...row,
        cells: row.cells.filter((_, i) => i !== columnIndex)
      }))
    });
  };

  const updateColumn = (index: number, value: string) => {
    const newColumns = [...sectionData.columns];
    newColumns[index] = value;
    setSectionData({ ...sectionData, columns: newColumns });
  };

  const addRow = () => {
    const newCells = sectionData.columns.map(() => ({
      text: "",
      bg: "bg-white",
      textColor: "text-gray-900",
      icon: null as 'check' | 'x' | null
    }));
    setSectionData({
      ...sectionData,
      rows: [...sectionData.rows, { technology: "New Technology", cells: newCells }]
    });
  };

  const removeRow = (rowIndex: number) => {
    setSectionData({
      ...sectionData,
      rows: sectionData.rows.filter((_, i) => i !== rowIndex)
    });
  };

  const updateRowTechnology = (rowIndex: number, value: string) => {
    const newRows = [...sectionData.rows];
    newRows[rowIndex].technology = value;
    setSectionData({ ...sectionData, rows: newRows });
  };

  const updateCell = (rowIndex: number, cellIndex: number, field: keyof CellData, value: any) => {
    const newRows = [...sectionData.rows];
    newRows[rowIndex].cells[cellIndex] = {
      ...newRows[rowIndex].cells[cellIndex],
      [field]: value === 'null' ? null : value
    };
    setSectionData({ ...sectionData, rows: newRows });
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Technology Comparison Matrix Manager</h1>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Section Tag
            <Badge variant="secondary">technology-comparison</Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            This identifier is used for HTML anchors and internal references
          </p>
        </CardHeader>
      </Card>

      {/* Title and Subtitle */}
      <Card>
        <CardHeader>
          <CardTitle>Section Header</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={sectionData.title}
              onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Textarea
              value={sectionData.subtitle}
              onChange={(e) => setSectionData({ ...sectionData, subtitle: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Listen Button */}
      <Collapsible
        open={openSections.listen}
        onOpenChange={(open) => setOpenSections({ ...openSections, listen: open })}
      >
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <span>Listen Button</span>
                {openSections.listen ? <ChevronUp /> : <ChevronDown />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={sectionData.listen_button.enabled}
                  onCheckedChange={(checked) =>
                    setSectionData({
                      ...sectionData,
                      listen_button: { ...sectionData.listen_button, enabled: !!checked }
                    })
                  }
                />
                <Label>Enable Listen Button</Label>
              </div>
              <div>
                <Label>Button Text</Label>
                <Input
                  value={sectionData.listen_button.text}
                  onChange={(e) =>
                    setSectionData({
                      ...sectionData,
                      listen_button: { ...sectionData.listen_button, text: e.target.value }
                    })
                  }
                />
              </div>
              <Tabs defaultValue="url">
                <TabsList>
                  <TabsTrigger value="url">URL</TabsTrigger>
                  <TabsTrigger value="upload">Upload Audio</TabsTrigger>
                </TabsList>
                <TabsContent value="url">
                  <Input
                    placeholder="Enter audio URL"
                    value={sectionData.listen_button.url}
                    onChange={(e) =>
                      setSectionData({
                        ...sectionData,
                        listen_button: { ...sectionData.listen_button, url: e.target.value }
                      })
                    }
                  />
                </TabsContent>
                <TabsContent value="upload">
                  <FileUploader
                    label="Upload Audio File"
                    value={sectionData.listen_button.url}
                    onChange={(url) =>
                      setSectionData({
                        ...sectionData,
                        listen_button: { ...sectionData.listen_button, url }
                      })
                    }
                    accept="audio/*"
                    bucketName="media-library"
                    fileType="pdf"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Read Button */}
      <Collapsible
        open={openSections.read}
        onOpenChange={(open) => setOpenSections({ ...openSections, read: open })}
      >
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <span>Read Button</span>
                {openSections.read ? <ChevronUp /> : <ChevronDown />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={sectionData.read_button.enabled}
                  onCheckedChange={(checked) =>
                    setSectionData({
                      ...sectionData,
                      read_button: { ...sectionData.read_button, enabled: !!checked }
                    })
                  }
                />
                <Label>Enable Read Button</Label>
              </div>
              <div>
                <Label>Button Text</Label>
                <Input
                  value={sectionData.read_button.text}
                  onChange={(e) =>
                    setSectionData({
                      ...sectionData,
                      read_button: { ...sectionData.read_button, text: e.target.value }
                    })
                  }
                />
              </div>
              <Tabs defaultValue="url">
                <TabsList>
                  <TabsTrigger value="url">URL</TabsTrigger>
                  <TabsTrigger value="upload">Upload File</TabsTrigger>
                </TabsList>
                <TabsContent value="url">
                  <Input
                    placeholder="Enter document URL"
                    value={sectionData.read_button.url}
                    onChange={(e) =>
                      setSectionData({
                        ...sectionData,
                        read_button: { ...sectionData.read_button, url: e.target.value }
                      })
                    }
                  />
                </TabsContent>
                <TabsContent value="upload">
                  <FileUploader
                    label="Upload PDF"
                    value={sectionData.read_button.url}
                    onChange={(url) =>
                      setSectionData({
                        ...sectionData,
                        read_button: { ...sectionData.read_button, url }
                      })
                    }
                    accept=".pdf"
                    bucketName="media-library"
                    fileType="pdf"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Watch Button */}
      <Collapsible
        open={openSections.watch}
        onOpenChange={(open) => setOpenSections({ ...openSections, watch: open })}
      >
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <span>Watch Button</span>
                {openSections.watch ? <ChevronUp /> : <ChevronDown />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={sectionData.watch_button.enabled}
                  onCheckedChange={(checked) =>
                    setSectionData({
                      ...sectionData,
                      watch_button: { ...sectionData.watch_button, enabled: !!checked }
                    })
                  }
                />
                <Label>Enable Watch Button</Label>
              </div>
              <div>
                <Label>Button Text</Label>
                <Input
                  value={sectionData.watch_button.text}
                  onChange={(e) =>
                    setSectionData({
                      ...sectionData,
                      watch_button: { ...sectionData.watch_button, text: e.target.value }
                    })
                  }
                />
              </div>
              <Tabs defaultValue="url">
                <TabsList>
                  <TabsTrigger value="url">URL</TabsTrigger>
                  <TabsTrigger value="upload">Upload Video</TabsTrigger>
                </TabsList>
                <TabsContent value="url">
                  <Input
                    placeholder="Enter video URL"
                    value={sectionData.watch_button.url}
                    onChange={(e) =>
                      setSectionData({
                        ...sectionData,
                        watch_button: { ...sectionData.watch_button, url: e.target.value }
                      })
                    }
                  />
                </TabsContent>
                <TabsContent value="upload">
                  <FileUploader
                    label="Upload Video"
                    value={sectionData.watch_button.url}
                    onChange={(url) =>
                      setSectionData({
                        ...sectionData,
                        watch_button: { ...sectionData.watch_button, url }
                      })
                    }
                    accept="video/*"
                    bucketName="media-library"
                    fileType="pdf"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Columns Management */}
      <Collapsible
        open={openSections.columns}
        onOpenChange={(open) => setOpenSections({ ...openSections, columns: open })}
      >
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <span>Table Columns ({sectionData.columns.length})</span>
                {openSections.columns ? <ChevronUp /> : <ChevronDown />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              {sectionData.columns.map((column, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={column}
                    onChange={(e) => updateColumn(index, e.target.value)}
                    placeholder="Column header"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeColumn(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={addColumn} variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Column
              </Button>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Rows Management */}
      <Collapsible
        open={openSections.rows}
        onOpenChange={(open) => setOpenSections({ ...openSections, rows: open })}
      >
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <span>Table Rows ({sectionData.rows.length})</span>
                {openSections.rows ? <ChevronUp /> : <ChevronDown />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6">
              {sectionData.rows.map((row, rowIndex) => (
                <Card key={rowIndex} className="border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Row {rowIndex + 1}</CardTitle>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeRow(rowIndex)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Row
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Technology Name</Label>
                      <Textarea
                        value={row.technology}
                        onChange={(e) => updateRowTechnology(rowIndex, e.target.value)}
                        placeholder="Technology name (use \n for line breaks)"
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      {row.cells.map((cell, cellIndex) => (
                        <Card key={cellIndex} className="bg-muted/30">
                          <CardHeader>
                            <CardTitle className="text-sm">{sectionData.columns[cellIndex]}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <Label>Cell Text</Label>
                              <Input
                                value={cell.text}
                                onChange={(e) => updateCell(rowIndex, cellIndex, 'text', e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <Label>Background</Label>
                                <Select
                                  value={cell.bg}
                                  onValueChange={(value) => updateCell(rowIndex, cellIndex, 'bg', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {bgColorOptions.map(option => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Text Color</Label>
                                <Select
                                  value={cell.textColor}
                                  onValueChange={(value) => updateCell(rowIndex, cellIndex, 'textColor', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {textColorOptions.map(option => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Icon</Label>
                                <Select
                                  value={cell.icon === null ? 'null' : cell.icon}
                                  onValueChange={(value) => updateCell(rowIndex, cellIndex, 'icon', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {iconOptions.map(option => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button onClick={addRow} variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Row
              </Button>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>
    </div>
  );
};

export default TechnologyComparisonManager;
