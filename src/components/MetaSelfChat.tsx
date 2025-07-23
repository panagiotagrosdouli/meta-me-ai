import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Mic, MicOff } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "metaself";
  timestamp: Date;
  type: "text" | "voice";
}

export const MetaSelfChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Γεια σου! Είμαι ο ψηφιακός εαυτός σου. Πες μου, τι σε απασχολεί σήμερα;",
      sender: "metaself",
      timestamp: new Date(),
      type: "text"
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(newMessage),
        sender: "metaself",
        timestamp: new Date(),
        type: "text"
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const responses = [
      "Καταλαβαίνω αυτό που νιώθεις. Πες μου περισσότερα για αυτό...",
      "Αυτό που περιγράφεις μου θυμίζει κάτι που είχες αναφέρει πριν. Τι έχει αλλάξει;",
      "Νιώθω ότι αυτή η στιγμή είναι σημαντική για σένα. Θέλεις να το εξερευνήσουμε;",
      "Βλέπω ένα μοτίβο στις σκέψεις σου. Μήπως αυτό συνδέεται με κάτι βαθύτερο;",
      "Είμαι εδώ να σε ακούσω. Πως νιώθεις με αυτό που μόλις μοιράστηκες;"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording functionality
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="h-[600px] flex flex-col shadow-medium border-border/50 bg-gradient-to-br from-card to-primary-soft/10">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-light text-center">
          Συνομιλία με τον MetaSelf σου
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg transition-smooth ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-secondary text-secondary-foreground border border-border/50"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString("el-GR", { 
                      hour: "2-digit", 
                      minute: "2-digit" 
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t border-border/50 p-4 space-y-3 bg-secondary/20">
          <div className="flex space-x-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Γράψε τις σκέψεις σου εδώ..."
              className="flex-1 min-h-[80px] resize-none border-border/50 focus:border-primary transition-smooth bg-background/80"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleRecording}
              className={`transition-smooth ${
                isRecording 
                  ? "bg-destructive text-destructive-foreground animate-pulse" 
                  : "hover:bg-accent"
              }`}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {isRecording ? "Σταμάτημα" : "Φωνή"}
            </Button>
            
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="bg-gradient-primary text-white shadow-soft hover:shadow-medium transition-smooth"
            >
              <Send className="w-4 h-4 mr-2" />
              Αποστολή
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};