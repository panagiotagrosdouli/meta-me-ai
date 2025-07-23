import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const emotions = [
  { name: "Ήρεμος", value: "calm", emoji: "😌", color: "emotion-calm" },
  { name: "Χαρούμενος", value: "joy", emoji: "😊", color: "emotion-joy" },
  { name: "Στοχαστικός", value: "reflection", emoji: "🤔", color: "emotion-reflection" },
  { name: "Ενεργητικός", value: "energy", emoji: "⚡", color: "emotion-energy" },
  { name: "Αγχωμένος", value: "stress", emoji: "😰", color: "emotion-stress" },
];

export const EmotionMirror = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(5);

  return (
    <Card className="shadow-soft border-border/50 bg-gradient-to-br from-card to-secondary/30">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-light text-foreground">
          Πώς νιώθεις σήμερα;
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Επέλεξε την συναισθηματική σου κατάσταση
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {emotions.map((emotion) => (
            <Button
              key={emotion.value}
              variant={selectedEmotion === emotion.value ? "default" : "outline"}
              onClick={() => setSelectedEmotion(emotion.value)}
              className={`h-16 flex-col space-y-1 transition-smooth hover:shadow-soft ${
                selectedEmotion === emotion.value
                  ? `bg-${emotion.color} border-${emotion.color} text-white shadow-medium`
                  : "hover:border-primary/50"
              }`}
            >
              <span className="text-lg">{emotion.emoji}</span>
              <span className="text-xs font-normal">{emotion.name}</span>
            </Button>
          ))}
        </div>

        {selectedEmotion && (
          <div className="space-y-4 animate-gentle-float">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Ένταση συναισθήματος (1-10)
              </label>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">1</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-sm text-muted-foreground">10</span>
              </div>
              <div className="text-center mt-1">
                <span className="text-lg font-semibold text-primary">{intensity}</span>
              </div>
            </div>

            <Button 
              onClick={() => {
                // TODO: Save emotion to local storage or AI context
                console.log("Saving emotion:", selectedEmotion, "intensity:", intensity);
              }}
              className="w-full bg-gradient-primary border-0 text-white shadow-medium hover:shadow-soft transition-smooth"
            >
              Αποθήκευση Συναισθήματος
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};