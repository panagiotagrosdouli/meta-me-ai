import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmotionMirror } from "@/components/EmotionMirror";
import { MetaSelfChat } from "@/components/MetaSelfChat";
import { ThoughtJournal } from "@/components/ThoughtJournal";
import { EmotionPatterns } from "@/components/EmotionPatterns";
import { Brain, MessageCircle, BookOpen, BarChart3 } from "lucide-react";
import heroImage from "@/assets/meta-me-hero.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("emotion");

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Hero Section */}
      <div 
        className="relative h-[50vh] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm" />
        <div className="relative text-center text-white z-10 px-4">
          <div className="animate-breathe">
            <Brain className="w-16 h-16 mx-auto mb-4 text-white/90" />
          </div>
          <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-wide">
            META-ME
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Η εφαρμογή που καταλαβαίνει <strong>ΠΟΙΟΣ</strong> είσαι — πριν καν το συνειδητοποιήσεις εσύ.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-16 relative z-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-background/90 backdrop-blur-sm shadow-medium border border-border/50">
            <TabsTrigger 
              value="emotion" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth"
            >
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Emotion Mirror</span>
            </TabsTrigger>
            <TabsTrigger 
              value="chat"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">MetaSelf</span>
            </TabsTrigger>
            <TabsTrigger 
              value="journal"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Ημερολόγιο</span>
            </TabsTrigger>
            <TabsTrigger 
              value="patterns"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Μοτίβα</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="emotion" className="mt-0">
            <EmotionMirror />
          </TabsContent>

          <TabsContent value="chat" className="mt-0">
            <MetaSelfChat />
          </TabsContent>

          <TabsContent value="journal" className="mt-0">
            <ThoughtJournal />
          </TabsContent>

          <TabsContent value="patterns" className="mt-0">
            <EmotionPatterns />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            🔒 Πλήρως ιδιωτικό • 🧠 Τοπικό AI • 💭 Δικός σου ψηφιακός εαυτός
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
