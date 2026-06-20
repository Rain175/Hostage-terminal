import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, ChevronDown, ChevronUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { vigenereDecrypt } from '@/lib/vigenere';

export default function TokenPuzzle({ puzzle, index, onSolve }) {
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const handleSubmit = () => {
    const cleaned = input.toLowerCase().replace(/[^a-z]/g, '');
    if (cleaned === puzzle.answer) {
      onSolve(index);
    } else {
      setError(true);
      setShakeKey(prev => prev + 1);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 }}
      className={`border rounded transition-all duration-500 ${
        puzzle.solved
          ? 'border-primary/60 bg-primary/5'
          : 'border-border bg-card/50 hover:border-primary/30'
      }`}
    >
      {/* Header */}
      <button
        onClick={() => !puzzle.solved && setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          {puzzle.solved ? (
            <Unlock className="w-5 h-5 text-primary" />
          ) : (
            <Lock className="w-5 h-5 text-muted-foreground" />
          )}
          <div>
            <span className="font-display text-xl tracking-wide">
              TOKEN {index + 1}
            </span>
            {puzzle.solved && (
              <span className="ml-3 text-sm text-primary font-mono">
                [DECRYPTED]
              </span>
            )}
          </div>
        </div>
        {!puzzle.solved && (
          expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && !puzzle.solved && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">
              <div className="border-t border-border pt-4" />

              {/* Riddle */}
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground font-mono tracking-widest uppercase">
                  // INTERCEPT LOG
                </span>
                <p className="font-body text-sm text-foreground/80 leading-relaxed italic">
                  "{puzzle.riddle}"
                </p>
              </div>

              {/* Cipher text */}
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground font-mono tracking-widest uppercase">
                  // ENCRYPTED TOKEN
                </span>
                <div className="bg-background/80 border border-border rounded p-3 font-mono text-lg tracking-[0.3em] text-accent break-all select-all">
                  {puzzle.cipherText}
                </div>
              </div>

              {/* Hint */}
              <div className="flex items-start gap-2 bg-accent/5 border border-accent/20 rounded p-3">
                <AlertTriangle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-xs text-accent/80 font-mono">
                  {puzzle.hint}
                </p>
              </div>

              {/* Input */}
              <motion.div
                key={shakeKey}
                animate={error ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter decrypted token..."
                  className={`font-mono bg-background border transition-colors ${
                    error ? 'border-destructive' : 'border-border'
                  }`}
                />
                <Button
                  onClick={handleSubmit}
                  variant="outline"
                  className="font-mono border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
                >
                  VERIFY
                </Button>
              </motion.div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-destructive font-mono"
                >
                  ▸ ACCESS DENIED — Invalid token
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Solved state */}
      {puzzle.solved && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 text-primary text-sm font-mono">
            <CheckCircle className="w-4 h-4" />
            <span>Token verified: <span className="tracking-widest">{puzzle.answer}</span></span>
          </div>
        </div>
      )}
    </motion.div>
  );
}