
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface GeneratedGalleryProps {
  images: string[];
}

const GeneratedGallery = ({ images }: GeneratedGalleryProps) => {
  if (!images.length) return null;

  return (
    <Card className="mt-6 shadow-md">
      <CardHeader>
        <CardTitle>Результаты генерации</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg group">
              <img 
                src={image} 
                alt={`Сгенерированное изображение ${index + 1}`} 
                className="w-full h-auto object-cover aspect-square"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button 
                  className="bg-white/80 text-black hover:bg-white"
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
  );
};

export default GeneratedGallery;
