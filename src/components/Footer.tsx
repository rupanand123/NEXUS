import { Code2, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest text-white/30 font-bold">
            <span>&copy; {new Date().getFullYear()} Nexus IT Systems</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-white transition-colors">Architecture Lab</a>
          </div>

          <div className="flex items-center gap-10">
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-zinc-800 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 opacity-50" />
                  </div>
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Trusted by 140+ CTOs</span>
            </div>
            
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            
            <div className="flex gap-6">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-white/30 hover:text-white transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
