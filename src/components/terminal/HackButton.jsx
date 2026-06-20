import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function HackButton({ unlocked }) {
  const handleClick = () => {
    if (unlocked) {
      window.location.href = 'https://youtube.com';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-8"
    >
      {unlocked ? (
        <motion.button
          onClick={handleClick}
          className="relative w-full group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-primary/20 rounded blur-lg group-hover:bg-primary/30 transition-all" />
          
          <div className="relative flex items-center justify-center gap-3 py-4 px-8 bg-primary/10 border-2 border-primary rounded font-display text-3xl text-primary tracking-[0.3em] hover:bg-primary/20 transition-all">
            <Zap className="w-6 h-6" />
            <span>HACK THEM BACK</span>
            <Zap className="w-6 h-6" />
          </div>
        </motion.button>
      ) : (
        <div className="relative w-full">
          <div className="flex items-center justify-center gap-3 py-4 px-8 bg-muted/30 border-2 border-border rounded font-display text-3xl text-muted-foreground tracking-[0.3em] cursor-not-allowed select-none">
            <Zap className="w-6 h-6" />
            <span>HACK THEM BACK</span>
            <Zap className="w-6 h-6" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background/90 px-4 py-1 rounded border border-border">
              <span className="font-mono text-xs text-muted-foreground">
                ▸ DECRYPT ALL 3 LETTERS
              </span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}