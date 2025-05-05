
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Send, Loader2, Download, MessageSquare } from "lucide-react";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  // Демо-изображения
  const demoImages = [
    "https://images.unsplash.com/photo-1637581525432-a1a242bc1144",
    "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4",
    "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead",
    "https://images.unsplash.com/photo-1694822449914-1f58855d7acb"
  ];

  // Примеры промптов
  const examples = [
    "Космический корабль над марсианской колонией",
    "Русалка в глубинах океана", 
    "Футуристический город с летающими машинами",
    "Средневековый замок в горах на рассвете"
  ];

  const handleSubmit = () => {
    if (!prompt || isLoading) return;
    
    setIsLoading(true);
    
    // Имитация API-запроса
    setTimeout(() => {
      // Выбираем 2-4 случайных изображения
      const shuffledImages = [...demoImages].sort(() => 0.5 - Math.random());
      const count = Math.floor(Math.random() * 3) + 2;
      const selected = shuffledImages.slice(0, count);
      
      // Добавляем случайный параметр, чтобы избежать кэширования
      const timestamp = new Date().getTime();
      const results = selected.map(img => `${img}?random=${timestamp}`);
      
      setImages(results);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
            <Sparkles className="mr-2 text-indigo-500" />
            НейроХудожник
          </h1>
          <p className="text-gray-600">
            Генерация изображений с помощью ИИ
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Создать изображение</CardTitle>
                <CardDescription>Опишите что хотите увидеть</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Например: горная долина на закате"
                  className="min-h-[120px]"
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !prompt.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  {isLoading ? (
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
                  className="text-indigo-600 hover:underline flex items-center"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Telegram канал
                </a>
              </CardFooter>
            </Card>

            {/* Результаты */}
            {images.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Результаты</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative rounded-lg overflow-hidden aspect-square">
                        <img 
                          src={img} 
                          alt={`Результат ${idx+1}`} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button 
                            variant="outline"
                            className="bg-white text-black hover:bg-white/90 border-none"
                            onClick={() => window.open(img, '_blank')}
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

          {/* Правая колонка */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Примеры запросов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {examples.map((example, idx) => (
                    <Button 
                      key={idx}
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
                  {demoImages.map((img, idx) => (
                    <div key={idx} className="rounded-md overflow-hidden aspect-square">
                      <img 
                        src={img} 
                        alt={`Пример ${idx+1}`} 
                        className="w-full h-full object-cover" 
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
