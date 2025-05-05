
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Send, Loader2, Download, Rocket, MessageSquare } from "lucide-react";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Имитация запроса к API
    setTimeout(() => {
      // В реальном приложении здесь будет запрос к API нейросети
      setGeneratedImage("https://images.unsplash.com/photo-1637581525432-a1a242bc1144?q=80&w=800&auto=format");
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

        <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-[1fr_auto] items-start">
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

            {generatedImage && (
              <Card className="mt-6 shadow-md">
                <CardHeader>
                  <CardTitle>Результат</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src={generatedImage} 
                      alt="Сгенерированное изображение" 
                      className="max-w-full h-auto"
                    />
                    <Button 
                      size="sm" 
                      className="absolute bottom-2 right-2 bg-white/80 text-black hover:bg-white"
                      onClick={() => window.open(generatedImage, '_blank')}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Скачать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Примеры запросов</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {["Космический корабль над марсианской колонией", 
                  "Русалка в глубинах океана", 
                  "Футуристический город с летающими машинами"
                ].map((example, i) => (
                  <li key={i}>
                    <Button 
                      variant="ghost" 
                      className="text-left justify-start w-full hover:bg-purple-50"
                      onClick={() => setPrompt(example)}
                    >
                      <Send className="mr-2 h-4 w-4 text-purple-500" />
                      {example}
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <footer className="mt-20 text-center text-gray-500 text-sm">
          <p>© 2025 НейроХудожник. Для связи: <a href="https://t.me/Vocoders" className="text-blue-600 hover:underline">t.me/Vocoders</a></p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
