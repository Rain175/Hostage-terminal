import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DialogueBox from '@/components/dialogue/DialogueBox';
import Terminal from '@/pages/Terminal';

export default function Home() {
  const [dialogueComplete, setDialogueComplete] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!dialogueComplete ? (
        <motion.div
          key="dialogue"
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          <DialogueBox onComplete={() => setDialogueComplete(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="terminal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Terminal />
        </motion.div>
      )}
    </AnimatePresence>
  );
}