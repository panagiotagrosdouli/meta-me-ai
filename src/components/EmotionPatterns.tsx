import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, Calendar } from "lucide-react";

const mockPatterns = [
  {
    emotion: "Ήρεμος",
    percentage: 85,
    trend: "up",
    color: "emotion-calm",
    insight: "Αυξημένη ηρεμία τις τελευταίες μέρες"
  },
  {
    emotion: "Στοχαστικός", 
    percentage: 70,
    trend: "up",
    color: "emotion-reflection",
    insight: "Περισσότερη αυτοανάλυση"
  },
  {
    emotion: "Ενεργητικός",
    percentage: 60,
    trend: "stable",
    color: "emotion-energy", 
    insight: "Σταθερά επίπεδα ενέργειας"
  },
  {
    emotion: "Αγχωμένος",
    percentage: 30,
    trend: "down",
    color: "emotion-stress",
    insight: "Μειωμένο άγχος - καλή πρόοδος!"
  }
];

const weeklyMood = [
  { day: "Δευ", value: 7 },
  { day: "Τρι", value: 8 },
  { day: "Τετ", value: 6 },
  { day: "Πεμ", value: 9 },
  { day: "Παρ", value: 8 },
  { day: "Σαβ", value: 9 },
  { day: "Κυρ", value: 7 }
];

export const EmotionPatterns = () => {
  return (
    <div className="space-y-6">
      {/* Weekly Mood Chart */}
      <Card className="shadow-soft border-border/50 bg-gradient-to-br from-card to-secondary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-light">
            <BarChart3 className="w-5 h-5 text-primary" />
            Εβδομαδιαία Διάθεση
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-32 gap-2">
            {weeklyMood.map((day, index) => (
              <div key={day.day} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-gradient-primary rounded-t-lg transition-smooth hover:opacity-80 animate-gentle-float"
                  style={{ 
                    height: `${(day.value / 10) * 100}%`,
                    animationDelay: `${index * 0.1}s`
                  }}
                />
                <span className="text-xs text-muted-foreground mt-2 font-medium">
                  {day.day}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-4">
            <span>Χαμηλή</span>
            <span>Υψηλή</span>
          </div>
        </CardContent>
      </Card>

      {/* Emotion Patterns */}
      <Card className="shadow-soft border-border/50 bg-gradient-to-br from-card to-accent/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-light">
            <TrendingUp className="w-5 h-5 text-primary" />
            Συναισθηματικά Μοτίβα
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Ανάλυση των τελευταίων 7 ημερών
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockPatterns.map((pattern, index) => (
            <div 
              key={pattern.emotion} 
              className="space-y-2 animate-gentle-float"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">{pattern.emotion}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {pattern.percentage}%
                  </span>
                  <div className={`w-3 h-3 rounded-full bg-${pattern.color}`} />
                </div>
              </div>
              
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full bg-${pattern.color} rounded-full transition-smooth shadow-inner`}
                  style={{ width: `${pattern.percentage}%` }}
                />
              </div>
              
              <p className="text-xs text-muted-foreground italic">
                {pattern.insight}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Insights Card */}
      <Card className="shadow-medium border-border/50 bg-gradient-reflection animate-breathe">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-light">
            <Calendar className="w-5 h-5 text-primary" />
            MetaSelf Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-background/60 rounded-lg border border-border/30">
            <p className="text-sm text-foreground leading-relaxed">
              💭 <strong>Παρατήρηση:</strong> Τα Σαββατοκύριακα νιώθεις πιο ήρεμος. 
              Ίσως χρειάζεσαι περισσότερο χρόνο για τον εαυτό σου;
            </p>
          </div>
          
          <div className="p-3 bg-background/60 rounded-lg border border-border/30">
            <p className="text-sm text-foreground leading-relaxed">
              🌱 <strong>Πρόταση:</strong> Οι στοχαστικές σου στιγμές αυξάνονται. 
              Αυτό είναι σημάδι ανάπτυξης - συνέχισε έτσι!
            </p>
          </div>
          
          <div className="p-3 bg-background/60 rounded-lg border border-border/30">
            <p className="text-sm text-foreground leading-relaxed">
              ⚡ <strong>Μοτίβο:</strong> Κάθε Πέμπτη έχεις υψηλά επίπεδα ενέργειας. 
              Τι συμβαίνει αυτή την ημέρα;
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};