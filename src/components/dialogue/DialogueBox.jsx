import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypewriterText from './TypewriterText';
import { ChevronRight, SkipForward } from 'lucide-react';

const DIALOGUE_LINES = [
  { speaker: "???", text: "Happy birthday." },
  { speaker: "???", text: "Your friends wrote you letters. Sweet ones, actually. Almost made me feel bad." },
  { speaker: "???", text: "Almost." },
  { speaker: "???", text: "I intercepted them. Encrypted every last word. Your birthday presents are locked behind three ciphers now." },
  { speaker: "???", text: "Old ciphers. Elegant ones. Without the keywords, they're impossible to break." },
  { speaker: "???", text: "The terminal's waiting. Three tokens. Three encrypted letters from people who care about you." },
  { speaker: "???", text: "You want them back? Crack the ciphers." },
  { speaker: "???", text: "I won't make it easy. You'll get no keywords from me." },
  { speaker: "???", text: "But... let's say I'm feeling generous. There might be clues buried in the noise." },
  { speaker: "???", text: "Or maybe not. Maybe I'm just wasting your time." },
  { speaker: "???", text: "Tick tock. It's your birthday after all." },
  { speaker: "???", text: "Don't disappoint me." },
];

export default function DialogueBox({ onComplete }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [lineComplete, setLineComplete] = useState(false);

  const handleLineComplete = useCallback(() => {
    setLineComplete(true);
  }, []);

  const advanceLine = () => {
    if (!lineComplete) {
      setLineComplete(true);
      return;
    }
    if (lineIndex < DIALOGUE_LINES.length - 1) {
      setLineIndex(prev => prev + 1);
      setLineComplete(false);
    } else {
      onComplete();
    }
  };

  const currentLine = DIALOGUE_LINES[lineIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-background flex flex-col items-center justify-center p-4"
    >
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(120 100% 50% / 0.1) 2px, hsl(120 100% 50% / 0.1) 4px)'
        }}
      />

      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, hsl(120 5% 4% / 0.8) 100%)'
        }}
      />

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={onComplete}
        className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 text-sm font-mono text-muted-foreground hover:text-foreground border border-border hover:border-primary/50 rounded transition-all duration-300 group"
      >
        <span className="group-hover:text-primary transition-colors">SKIP</span>
        <SkipForward className="w-4 h-4 group-hover:text-primary transition-colors" />
      </motion.button>

      {/* Mystery figure silhouette hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ duration: 3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-display text-primary select-none pointer-events-none"
      >
        ?
      </motion.div>

      {/* Dialogue container */}
      <div className="relative z-30 w-full max-w-2xl">
        {/* Speaker name */}
        <AnimatePresence mode="wait">
          <motion.div
            key={lineIndex}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-3"
          >
            <span className="font-display text-2xl text-accent tracking-wider">
              {currentLine.speaker}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Text box */}
        <motion.div
          className="relative border border-border bg-card/80 backdrop-blur-sm rounded p-6 min-h-[120px] cursor-pointer"
          onClick={advanceLine}
          whileHover={{ borderColor: 'hsl(120 100% 50% / 0.4)' }}
        >
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" />

          <div className="font-body text-lg leading-relaxed text-foreground">
            {lineComplete ? (
              <span>{currentLine.text}</span>
            ) : (
              <TypewriterText
                key={lineIndex}
                text={currentLine.text}
                onComplete={handleLineComplete}
              />
            )}
          </div>

          {/* Continue indicator */}
          {lineComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-3 right-4 flex items-center gap-1 text-sm text-muted-foreground"
            >
              <span className="font-mono text-xs">CONTINUE</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                <ChevronRight className="w-4 h-4 text-primary" />
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1 mt-6">
          {DIALOGUE_LINES.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === lineIndex ? 'bg-primary w-4' : i < lineIndex ? 'bg-primary/40' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}