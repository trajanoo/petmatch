'use client'

import { Heart, X, MessageCircle, DollarSign, MapPin, Info } from "lucide-react";
import { Card } from "../components/Card";
import { Badge } from "lucide-react";
import { ImageWithFallback }from "../components/ImageWithFallback";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import BottomNavigation from "../components/BottomNavigation";
import { redirect } from "next/navigation";

interface Pet {
  id: number;
  name: string;
  breed: string;
  age: string;
  location: string;
  image: string;
  tags: string[];
  description: string;
}

export default function DiscoverScreen() {
  const [pets] = useState<Pet[]>([
    {
      id: 1,
      name: "Thor",
      breed: "Husky Siberiano",
      age: "4 anos",
      location: "Rio de Janeiro, RJ",
      image: "https://images.unsplash.com/photo-1568572933382-74d440642117",
      tags: ["Energético", "Companheiro"],
      description: "Thor é muito brincalhão e adora atividades ao ar livre!"
    },
    {
      id: 2,
      name: "Mia",
      breed: "Gato Persa",
      age: "1 ano",
      location: "São Paulo, SP",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006",
      tags: ["Calma", "Carinhosa"],
      description: "Mia é uma gatinha dócil que adora fazer companhia."
    },
    {
      id: 3,
      name: "Duke",
      breed: "Pit Bull",
      age: "3 anos",
      location: "Belo Horizonte, MG",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6",
      tags: ["Protetor", "Leal"],
      description: "Duke é um cão extremamente leal e carinhoso com a família."
    },
    {
      id: 4,
      name: "Luna",
      breed: "Golden Retriever",
      age: "2 anos",
      location: "Curitiba, PR",
      image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24",
      tags: ["Amigável", "Inteligente"],
      description: "Luna ama brincar e é ótima com crianças!"
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const currentPet = pets[currentIndex];

  const handleSwipe = (swipeDirection: 'left' | 'right') => {
    setDirection(swipeDirection);
    setTimeout(() => {
      if (currentIndex < pets.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      setDirection(null);
    }, 300);
  };

  const variants = {
    enter: {
      scale: 0.9,
      opacity: 0
    },
    center: {
      scale: 1,
      opacity: 1,
      rotate: 0
    },
    exitLeft: {
      x: -300,
      rotate: -20,
      opacity: 0,
      transition: { duration: 0.3 }
    },
    exitRight: {
      x: 300,
      rotate: 20,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="flex flex-col pt-10 items-center min-h-screen bg-gradient-to-b from-orange-50 to-white pb-32">

      {/* Card Stack Container */}
      <div className="flex px-6 relative h-[650px] w-[400px] justify-center items-center">
        <AnimatePresence mode="wait">
          {currentPet && (
            <motion.div
              key={currentPet.id}
              variants={variants}
              initial="enter"
              animate="center"
              exit={direction === 'left' ? 'exitLeft' : direction === 'right' ? 'exitRight' : 'center'}
              className="absolute inset-0"
            >
              <Card className="rounded-3xl border-0 shadow-2xl overflow-hidden h-full bg-white">
                {/* Pet Image */}
                <div className="relative h-96">
                  <ImageWithFallback 
                    src={currentPet.image}
                    alt={currentPet.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Info Badge */}
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center">
                    <Info className="w-5 h-5 text-[#EE6724]" />
                  </button>

                  {/* Pet Name and Location on Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-white mb-2">{currentPet.name}</h2>
                    <div className="flex items-center gap-2 text-white mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{currentPet.location}</span>
                    </div>
                  </div>
                </div>

                {/* Pet Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-800 mb-1">{currentPet.breed}</p>
                      <p className="text-gray-500">{currentPet.age}</p>
                    </div>
                    <div className="flex gap-2">
                      {currentPet.tags.map((tag, index) => (
                        <Badge key={index} className="bg-orange-100 text-[#EE6724] rounded-full border-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {currentPet.description}
                  </p>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-orange-50 text-[#EE6724] hover:bg-orange-100 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>Contato</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-orange-50 text-[#EE6724] hover:bg-orange-100 transition-colors">
                      <DollarSign className="w-5 h-5" />
                      <span>Apadrinhar</span>
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background Cards for Depth Effect */}
        <div className="absolute inset-0 -z-10 translate-y-4 opacity-50">
          <Card className="rounded-3xl border-0 shadow-xl h-full bg-white" />
        </div>
        <div className="absolute inset-0 -z-20 translate-y-8 opacity-30">
          <Card className="rounded-3xl border-0 shadow-xl h-full bg-white" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-28 left-0 right-0 px-6">
        <div className="max-w-md mx-auto flex items-center justify-center gap-6">
          {/* Skip Button */}
          <button 
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            <X className="w-8 h-8 text-gray-400" />
          </button>

          {/* Interest/Like Button */}
          <button 
            onClick={() => handleSwipe('right')}
            className="w-20 h-20 rounded-full bg-[#EE6724] shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Heart className="w-10 h-10 text-white" fill="white" />
          </button>

          {/* Info Button */}
          <button className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
            <Info className="w-8 h-8 text-[#EE6724]" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {pets.map((_, index) => (
            <div 
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-8 bg-[#EE6724]' 
                  : 'w-1.5 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Counter */}
      <div className="fixed top-6 right-6 bg-white rounded-full px-4 py-2 shadow-lg">
        <p className="text-gray-600">
          <span className="text-[#EE6724]">{currentIndex + 1}</span> / {pets.length}
        </p>
      </div>

        <BottomNavigation activeScreen="discover" onNavigate={(screen) => {
          redirect(`/${screen}`)
        }}
        />
    </div>
  );
}
