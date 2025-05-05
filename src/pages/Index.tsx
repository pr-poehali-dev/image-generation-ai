import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Send, Loader2, Download, Rocket, MessageSquare, History } from "lucide-react";
import GeneratedGallery from "@/components/GeneratedGallery";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const sampleImages = [
    "https://images.unsplash.com/photo-1637581525432-a1a242bc1144?q=80&w=800&auto=format",
    "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=800&auto=format",
    "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=800&auto=format",
    "https://images.unsplash.com/photo-1694822449914-1f58855d7acb?q=80&w=800&auto=format"
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const numberOfImages = Math.floor(Math.random() * 3) + 2;
      const randomImages = [];
      
      for (let i = 0; i < numberOfImages; i++) {
        const randomIndex = Math.floor(Math.random() * sampleImages.length);
        randomImages.push(sampleImages[randomIndex]);
      }
      
      setGeneratedImages(randomImages);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-10">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
            <Sparkles className="text-purple-600" />
            НейроХудожник
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Создавайте уникальные изображения по текстовому описанию 
            с помощью нашей продвинутой нейросети
          </p>
        </header>

        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-[1fr_auto] items-start">
          <div>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Опишите желаемое изображение</CardTitle>
                <CardDescription>
                  Чем детальнее описание, тем лучше результат
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Например: горная долина на закате, в небе летят птицы, воздушные шары над лесом"
                  className="min-h-32 text-base"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating || !prompt.trim()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Генерация...
                    </>
                  ) : (
                    <>
                      <Rocket className="mr-2 h-4 w-4" />
                      Сгенерировать
                    </>
                  )}
                </Button>

                <a 
                  href="https://t.me/Vocoders" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Telegram
                </a>
              </CardFooter>
            </Card>

            <GeneratedGallery images={generatedImages} />
          </div>

          <div className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Примеры запросов</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["Космический корабль над марсианской колонией", 
                    "Русалка в глубинах океана", 
                    "Футуристический город с летающими машинами",
                    "Средневековый замок в горах на рассвете"
                  ].map((example, i) => (
                    <li key={i}>
                      <Button 
                        variant="ghost" 
                        className="text-left justify-start w-full hover:bg-purple-50"
                        onClick={() => setPrompt(example)}
                      >
                        <Send className="mr-2 h-4 w-4 text-purple-500 shrink-0" />
                        <span className="truncate">{example}</span>
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="mr-2 h-4 w-4" />
                  Недавние генерации
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {sampleImages.slice(0, 4).map((img, i) => (
                    <div key={i} className="aspect-square rounded-md overflow-hidden">
                      <img 
                        src={img} 
                        alt={`Пример ${i+1}`} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="mt-20 text-center text-gray-500 text-sm">
          <p> 2025 НейроХудожник. Для связи: <a href="https://t.me/Vocoders" className="text-blue-600 hover:underline">t.me/Vocoders</a></p>
        </footer>
      </div>
    </div>
  );
};

export default Index;