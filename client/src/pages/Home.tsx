import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, ArrowRight, Music, Volume2, VolumeX } from "lucide-react";
import { useCreateResponse } from "@/hooks/use-response";
import { Scene } from "@/components/Scene";
import { PixelGrid } from "@/components/PixelGrid";
import { TypewriterText } from "@/components/TypewriterText";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState(true); // Auto-play policies usually require user interaction first
  
  const { mutate: submitResponse } = useCreateResponse();
  const { toast } = useToast();
  
  // Audio ref (optional background music)
  // In a real scenario, you'd add an <audio> element. 
  // For this generated code, we'll keep the UI but the logic is stubbed.

  const handleNext = () => {
    setIsAnimationComplete(false);
    setCurrentScene((prev) => prev + 1);
  };

  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
    // Extra celebration when pixel art is done
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FF69B4', '#FF1493', '#FFB6C1'],
      shapes: ['circle'],
      scalar: 0.7
    });
  };

  const handleYesClick = () => {
    // 1. Submit to backend
    submitResponse({ accepted: true });
    
    // 2. Trigger Massive Fireworks
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 150 * (timeLeft / duration);
      
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FF69B4', '#FF1493', '#FF0000', '#FFD700']
      });
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FF69B4', '#FF1493', '#FF0000', '#FFD700']
      });
      
      // Center bursts
      if (Math.random() > 0.7) {
        confetti({
          ...defaults,
          particleCount: 80,
          origin: { x: 0.5, y: 0.5 },
          scalar: 2,
          shapes: ['heart'],
          colors: ['#FF69B4', '#FF1493']
        });
      }
    }, 250);

    // 3. Move to final state
    handleNext();
    
    toast({
      title: "¡La amo!",
      description: "Gracias por todos los dias hacerme el niño más feliz del mundo.",
      className: "bg-primary text-white border-none"
    });
  };

  const moveNoButton = () => {
    const x = Math.random() * 200 - 100; // -100 to 100
    const y = Math.random() * 200 - 100;
    setNoButtonPosition({ x, y });
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center font-display">
      
      {/* Background Decor - Floating Hearts */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 100,
              scale: Math.random() * 0.5 + 0.5,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: -100,
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 20
            }}
          >
            <Heart size={Math.random() * 50 + 20} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-4xl h-[80vh]">
        <AnimatePresence mode="wait">
          
          {/* SCENE 0: Intro / Bear */}
          {currentScene === 0 && (
            <Scene key="scene-0" isActive={currentScene === 0}>
              <div className="space-y-12">
                <TypewriterText 
                  text="¿Sabía que es la persona más especial en este mundo para mí?" 
                  className="mb-8"
                />
                
                <div className="h-64 flex items-center justify-center">
                  <PixelGrid type="bear" onComplete={handleAnimationComplete} />
                </div>

                <div className="h-16 flex items-center justify-center">
                  {isAnimationComplete && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Button 
                        size="lg" 
                        onClick={handleNext}
                        className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-hand"
                      >
                        Siguiente <ArrowRight className="ml-2 w-6 h-6" />
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </Scene>
          )}

          {/* SCENE 1: Years / Heart */}
          {currentScene === 1 && (
            <Scene key="scene-1" isActive={currentScene === 1}>
              <div className="space-y-12">
                <TypewriterText 
                  text="3 años con usted mi bebè y cada día me enamoro más, es perfecta..." 
                  className="mb-8"
                />
                
                <div className="h-64 flex items-center justify-center">
                  <div className="heart-beat">
                    <PixelGrid type="heart" onComplete={handleAnimationComplete} />
                  </div>
                </div>

                <div className="h-16 flex items-center justify-center">
                  {isAnimationComplete && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Button 
                        size="lg" 
                        onClick={handleNext}
                        className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-hand"
                      >
                        Siguiente <ArrowRight className="ml-2 w-6 h-6" />
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </Scene>
          )}

          {/* SCENE 2: Question Prep / Tree */}
          {currentScene === 2 && (
            <Scene key="scene-2" isActive={currentScene === 2}>
              <div className="space-y-12">
                <TypewriterText 
                  text="En todo este tiempo hemos vivido cosas preciosas" 
                  className="mb-8"
                />
                
                <div className="h-64 flex items-center justify-center">
                  <PixelGrid type="tree" onComplete={handleAnimationComplete} />
                </div>

                <div className="h-16 flex items-center justify-center">
                  {isAnimationComplete && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Button 
                        size="lg" 
                        onClick={handleNext}
                        className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-hand"
                      >
                        Siguiente <ArrowRight className="ml-2 w-6 h-6" />
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </Scene>
          )}

          {/* SCENE 3: Birds */}
          {currentScene === 3 && (
            <Scene key="scene-3" isActive={currentScene === 3}>
              <div className="space-y-12">
                <TypewriterText 
                  text="Gracias por tanto, por estar en los momentos bonitos asi como en los tristes, por ser siempre mi apoyo y mi novia de ensueño" 
                  className="mb-8"
                />
                
                <div className="h-64 flex items-center justify-center relative w-full">
                  {/* Floating hearts around birds */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="absolute top-10 left-1/4 text-primary fill-primary w-6 h-6" />
                    <Heart className="absolute bottom-10 right-1/4 text-primary fill-primary w-8 h-8" />
                  </motion.div>
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                      x: [0, 10, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <PixelGrid type="bird" onComplete={handleAnimationComplete} />
                  </motion.div>
                </div>

                <div className="h-16 flex items-center justify-center">
                  {isAnimationComplete && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Button 
                        size="lg" 
                        onClick={handleNext}
                        className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-hand"
                      >
                        Siguiente <ArrowRight className="ml-2 w-6 h-6" />
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </Scene>
          )}

          {/* SCENE 4: Penguins */}
          {currentScene === 4 && (
            <Scene key="scene-4" isActive={currentScene === 4}>
              <div className="space-y-12">
                <TypewriterText 
                  text="Siempre quiero que sea esa niña quien esté aquí conmigo, por eso quiero preguntarle algo" 
                  className="mb-8"
                />
                
                <div className="h-64 flex items-center justify-center relative">
                  <motion.div
                    animate={{ 
                      x: [-20, 20, -20],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center gap-4"
                  >
                    <PixelGrid type="penguin" onComplete={handleAnimationComplete} />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Heart className="text-primary fill-primary w-10 h-10" />
                    </motion.div>
                  </motion.div>
                </div>

                <div className="h-16 flex items-center justify-center">
                  {isAnimationComplete && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Button 
                        size="lg" 
                        onClick={handleNext}
                        className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-hand"
                      >
                        Siguiente <ArrowRight className="ml-2 w-6 h-6" />
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </Scene>
          )}

          {/* SCENE 5: The Proposal */}
          {currentScene === 5 && (
            <Scene key="scene-5" isActive={currentScene === 5}>
              <div className="space-y-16">
                <motion.h1 
                  className="font-hand text-4xl md:text-6xl font-bold text-primary glow-text leading-tight"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  ¿Quiere ser mi San Valentín mi vida?
                </motion.h1>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleYesClick}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-2xl md:text-3xl px-12 py-6 rounded-2xl shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 font-hand heart-beat"
                  >
                    ¡CHI QUIERO! 💖
                  </motion.button>

                  <motion.button
                    animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                    onHoverStart={moveNoButton}
                    onClick={moveNoButton}
                    className="bg-white text-gray-400 font-medium text-lg px-8 py-4 rounded-xl shadow-md hover:bg-gray-50 transition-colors duration-200 font-hand cursor-not-allowed"
                  >
                    No...
                  </motion.button>
                </div>
              </div>
            </Scene>
          )}

          {/* SCENE 6: Success / TE AMO */}
          {currentScene === 6 && (
            <Scene key="scene-4" isActive={currentScene === 4}>
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                  <Heart className="w-64 h-64 text-primary fill-primary animate-pulse relative z-10" />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <span className="text-white font-pixel text-4xl font-bold">TE AMO</span>
                  </div>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="text-2xl font-hand text-foreground/80"
                >
                  Eres el amor de mi vida
                </motion.p>
              </div>
            </Scene>
          )}
        </AnimatePresence>
      </div>

      {/* Footer / Controls */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMuted(!isMuted)}
          className="rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-gray-500" /> : <Volume2 className="w-4 h-4 text-primary" />}
        </Button>
      </div>
    </div>
  );
}
