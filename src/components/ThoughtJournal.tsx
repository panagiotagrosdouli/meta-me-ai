import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Save, Clock } from "lucide-react";

interface JournalEntry {
  id: string;
  content: string;
  timestamp: Date;
  mood?: string;
  tags: string[];
}

export const ThoughtJournal = () => {
  const [currentEntry, setCurrentEntry] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      content: "Σήμερα ένιωσα πιο συνδεδεμένος με τον εαυτό μου. Η συνομιλία με το MetaSelf με βοήθησε να καταλάβω κάτι σημαντικό...",
      timestamp: new Date(Date.now() - 86400000), // Yesterday
      mood: "reflection",
      tags: ["αυτογνωσία", "συναισθήματα"]
    }
  ]);

  const saveEntry = () => {
    if (!currentEntry.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      content: currentEntry,
      timestamp: new Date(),
      tags: extractTags(currentEntry)
    };

    setEntries(prev => [newEntry, ...prev]);
    setCurrentEntry("");
  };

  const extractTags = (content: string): string[] => {
    // Simple tag extraction based on common Greek emotional/psychological terms
    const keywords = [
      "άγχος", "χαρά", "λύπη", "φόβος", "αγάπη", "θυμός",
      "στόχος", "όνειρο", "σχέση", "δουλειά", "οικογένεια",
      "αυτογνωσία", "συναισθήματα", "σκέψεις", "μέλλον"
    ];
    
    return keywords.filter(keyword => 
      content.toLowerCase().includes(keyword)
    ).slice(0, 3);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Σήμερα";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Χθες";
    } else {
      return date.toLocaleDateString("el-GR");
    }
  };

  return (
    <div className="space-y-6">
      {/* New Entry Card */}
      <Card className="shadow-soft border-border/50 bg-gradient-to-br from-card to-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-light">
            <BookOpen className="w-5 h-5 text-primary" />
            Ημερολόγιο Σκέψεων
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder="Τι σε απασχολεί σήμερα; Γράψε ελεύθερα τις σκέψεις σου..."
            className="min-h-[120px] border-border/50 focus:border-primary transition-smooth bg-background/80"
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {currentEntry.length} χαρακτήρες
            </span>
            <Button
              onClick={saveEntry}
              disabled={!currentEntry.trim()}
              className="bg-gradient-primary text-white shadow-soft hover:shadow-medium transition-smooth"
            >
              <Save className="w-4 h-4 mr-2" />
              Αποθήκευση
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Previous Entries */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          Προηγούμενες Καταγραφές
        </h3>
        
        {entries.map((entry) => (
          <Card key={entry.id} className="shadow-soft border-border/50 hover:shadow-medium transition-smooth animate-gentle-float">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-medium text-primary">
                  {formatDate(entry.timestamp)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {entry.timestamp.toLocaleTimeString("el-GR", { 
                    hour: "2-digit", 
                    minute: "2-digit" 
                  })}
                </span>
              </div>
              
              <p className="text-sm leading-relaxed text-foreground mb-3">
                {entry.content}
              </p>
              
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {entry.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="text-xs bg-primary-soft/20 text-primary hover:bg-primary-soft/30 transition-smooth"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};