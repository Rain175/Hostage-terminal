import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { vigenereEncrypt } from '@/lib/vigenere';
import TerminalHeader from '@/components/terminal/TerminalHeader';
import TokenPuzzle from '@/components/terminal/TokenPuzzle';
import HackButton from '@/components/terminal/HackButton';

const PUZZLES = [
  {
    answer: 'systemoverride',
    cipherText: vigenereEncrypt('systemoverride', 'bypass'),
    riddle: "They thought they could lock me out. But every system has a back door. I didn't break in — I walked through the walls. What did I do?",
    hint: "6 letters. When rules don't apply and you seize control.",
    solved: false,
  },
  {
    answer: 'pizzatower',
    cipherText: vigenereEncrypt('pizzatower', 'peppino'),
    riddle: "Your friend said they'd take you somewhere tall for your birthday. Lots of floors. Lots of... carbs. You laughed for ten minutes straight. Where were they taking you?",
    hint: "7 letters. An Italian name. Not the food — the cook.",
    solved: false,
  },
  {
    answer: 'sloppyadventures',
    cipherText: vigenereEncrypt('sloppyadventures', 'doom'),
    riddle: "The third friend got sentimental. Wrote about all the dumb, messy things you've done together — the kind of nights where nothing went right and everything was perfect. What did they call those memories?",
    hint: "4 letters. Impending catastrophe. Ripping and tearing.",
    solved: false,
  },
];

export default function Terminal() {
  const [puzzles, setPuzzles] = useState(PUZZLES);
  const [allSolved, setAllSolved] = useState(false);
  const [bootLines, setBootLines] = useState([]);
  const [booted, setBooted] = useState(false);

  const bootSequence = [
    '> Initializing secure terminal...',
    '> Loading cipher modules...',
    '> Scanning for encrypted payloads...',
    '> 3 encrypted birthday letters detected.',
    '> Hacker signature found in metadata...',
    '> Terminal ready.',
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSequence.length) {
        setBootLines(prev => [...prev, bootSequence[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooted(true), 400);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleSolve = (index) => {
    const updated = puzzles.map((p, i) =>
      i === index ? { ...p, solved: true } : p
    );
    setPuzzles(updated);
    if (updated.every(p => p.solved)) {
      setTimeout(() => setAllSolved(true), 600);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(120 100% 50% / 0.1) 2px, hsl(120 100% 50% / 0.1) 4px)'
        }}
      />

      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(120 5% 4% / 0.9) 100%)'
        }}
      />

      <div className="relative z-30 max-w-3xl mx-auto p-4 sm:p-8">
        {/* Boot sequence */}
        {!booted && (
          <div className="pt-12 space-y-1 font-mono text-sm text-muted-foreground">
            {bootLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {line}
              </motion.p>
            ))}
            <span className="animate-pulse text-primary">▌</span>
          </div>
        )}

        {/* Main terminal content */}
        {booted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <TerminalHeader />

            {/* Puzzle section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl tracking-wider text-foreground">
                  HOSTAGE LETTERS
                </h2>
                <div className="font-mono text-xs text-muted-foreground">
                  [{puzzles.filter(p => p.solved).length}/3 DECRYPTED]
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-muted rounded-full overflow-hidden mb-6">
                <motion.div
                  className="h-full bg-primary"
                  animate={{ width: `${(puzzles.filter(p => p.solved).length / 3) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {puzzles.map((puzzle, i) => (
                <TokenPuzzle
                  key={i}
                  puzzle={puzzle}
                  index={i}
                  onSolve={handleSolve}
                />
              ))}
            </div>

            {/* All solved celebration */}
            {allSolved && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 border border-primary/40 rounded bg-primary/5 font-mono text-sm text-primary space-y-1"
              >
                <p>▸ ALL LETTERS DECRYPTED</p>
                <p>▸ HACKER COUNTERMEASURE ACTIVE</p>
                <p>▸ PAYBACK SEQUENCE UNLOCKED</p>
                <p className="text-accent">▸ HAPPY BIRTHDAY.</p>
              </motion.div>
            )}

            <HackButton unlocked={allSolved} />

            {/* Footer */}
            <div className="mt-12 pt-4 border-t border-border/30 text-center">
              <p className="font-mono text-xs text-muted-foreground/50">
                OPERATION SHADOW v1.0.0 — UNAUTHORIZED ACCESS IS A FEDERAL CRIME
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}