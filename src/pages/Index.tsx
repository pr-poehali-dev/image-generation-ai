
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Send, Loader2, Download, MessageSquare } from "lucide-react";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  // Примеры для демонстрации
  const demoImages = [
    "https://images.unsplash.com/photo-1637581525432-a1a242bc1144?q=80&w=800&auto=format",
    "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=800&auto=format",
    "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=800&auto=format",
    "https://images.unsplash.com/photo-1694822449914-1f58855d7acb?q=80&w=800&auto=format"
  ];

  const examplePrompts = [
    "Космический корабль над марсианской колонией",
    "Русалка в глубинах океана с коралловыми рифами", 
    "Футуристический город с летающими машинами",
    "Средневековый замок в горах на рассвете"
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Имитируем запрос к API
    setTimeout(() => {
      // Генерируем случайное количество изображений (от 2 до 4)
      const count = Math.floor(Math.random() * 3) + 2;
      const generatedImages = [];
      
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * demoImages.length);
        generatedImages.push(demoImages[randomIndex]);
      }
      
      setResults(generatedImages);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Шапка */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Sparkles className="text-indigo-600" />
            НейроХудожник
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-xl mx-auto">
            Создавайте уникальные изображения по текстовому описанию с помощью нейросети
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Левая колонка - ввод запроса */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Опишите желаемое изображение</CardTitle>
                <CardDescription>Детальное описание повышает качество результата</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Например: горная долина на закате, в небе летят птицы"
                  className="min-h-[120px]"
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Генерация...
                    </>
                  ) : (
                    "Сгенерировать"
                  )}
                </Button>
                
                <a 
                  href="https://t.me/Vocoders" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Telegram канал
                </a>
              </CardFooter>
            </Card>

            {/* Результаты генерации */}
            {results.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Результаты генерации</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {results.map((image, index) => (
                      <div key={index} className="relative overflow-hidden rounded-lg group">
                        <img 
                          src={image} 
                          alt={`Результат ${index + 1}`}
                          className="w-full h-auto object-cover aspect-square" 
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button 
                            className="bg-white text-black hover:bg-white/90"
                            onClick={() => window.open(image, '_blank')}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Скачать
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Правая колонка - примеры */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Примеры запросов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {examplePrompts.map((example, i) => (
                    <Button 
                      key={i}
                      variant="ghost" 
                      className="w-full justify-start text-left"
                      onClick={() => setPrompt(example)}
                    >
                      <Send className="mr-2 h-4 w-4 text-indigo-500" />
                      <span className="truncate">{example}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Примеры работ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {demoImages.map((img, i) => (
                    <div key={i} className="aspect-square rounded-md overflow-hidden">
                      <img 
                        src={img} 
                        alt={`Пример ${i+1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-500">
          <p>© 2025 НейроХудожник | <a href="https://t.me/Vocoders" className="text-indigo-600 hover:underline">t.me/Vocoders</a></p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
