import { motion } from 'framer-motion';
import { Shield, Wifi } from 'lucide-react';

export default function TerminalHeader() {
  return (
    <div className="border-b border-border pb-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <div className="w-3 h-3 rounded-full bg-accent" />
          <div className="w-3 h-3 rounded-full bg-primary" />
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3" />
            <span>ENCRYPTED</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>SECURE CHANNEL</span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <pre className="text-destructive font-mono text-xs sm:text-sm leading-tight select-none overflow-hidden">
{`  ██╗  ██╗ ██████╗ ███████╗████████╗ █████╗  ██████╗ ███████╗
  ██║  ██║██╔═══██╗██╔════╝╚══██╔══╝██╔══██╗██╔════╝ ██╔════╝
  ███████║██║   ██║███████╗   ██║   ███████║██║  ███╗█████╗  
  ██╔══██║██║   ██║╚════██║   ██║   ██╔══██║██║   ██║██╔══╝  
  ██║  ██║╚██████╔╝███████║   ██║   ██║  ██║╚██████╔╝███████╗
  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝`}
        </pre>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 space-y-1 font-mono text-xs text-muted-foreground"
      >
        <p>▸ Connection established via proxy chain [4 hops]</p>
        <p>▸ Firewall bypass: <span className="text-primary">ACTIVE</span></p>
        <p>▸ Intercepted birthday letters: <span className="text-accent">3 ENCRYPTED</span></p>
        <p>▸ Status: <span className="text-destructive animate-pulse">HELD HOSTAGE</span></p>
      </motion.div>
    </div>
  );
}