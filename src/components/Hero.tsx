import { motion } from 'motion/react';
import { ChevronRight, Sparkles, Globe, Shield } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-white/5">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full bg-[#1A1A1A] blur-[120px] opacity-40 z-0" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-[#0F0F0F] blur-[100px] opacity-30 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-left max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 px-3 py-1 border border-white/10 w-fit rounded-full"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">Global IT Consultancy</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[60px] md:text-[80px] lg:text-[100px] leading-[0.9] font-light mb-10 font-serif tracking-tight"
          >
            Engineering the <br/>
            <span className="italic">Next Frontier</span> <br/>
            of Performance.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-white/50 max-w-xl font-light leading-relaxed mb-12"
          >
            Specializing in high-concurrency cloud architecture, resilient database systems, and secure enterprise deployments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto bg-white text-black px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-all flex items-center justify-center"
            >
              Initiate Consultation
            </a>
            <button className="w-full sm:w-auto px-10 py-5 border border-white/20 text-[10px] uppercase tracking-widest text-white/60 hover:text-white hover:border-white/40 transition-all">
              Intelligence Brief
            </button>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 py-12 border-t border-white/5"
        >
          {[
            { label: 'Intelligence', value: '420+' },
            { label: 'Avg Latency', value: '18ms' },
            { label: 'Experts', value: '45+' },
            { label: 'Uptime SLA', value: '99.9%' },
          ].map((stat) => (
            <div key={stat.label} className="text-left">
              <div className="text-3xl font-serif mb-1">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/30">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
