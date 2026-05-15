import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Code2, ShieldCheck, User } from 'lucide-react';
import { auth, signInWithPopup, googleProvider } from '../lib/firebase';
import { User as FirebaseUser } from 'firebase/auth';

interface NavigationProps {
  user: FirebaseUser | null;
  isAdminView: boolean;
  setIsAdminView: (view: boolean) => void;
}

export default function Navigation({ user, isAdminView, setIsAdminView }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsAdminView(false)}>
            <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
              <div className="w-4 h-4 bg-[#050505] rotate-45"></div>
            </div>
            <span className="text-xl font-semibold tracking-tighter uppercase">Nexus.it</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {!isAdminView && navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            {user ? (
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setIsAdminView(!isAdminView)}
                  className="text-[10px] uppercase tracking-widest px-6 py-2 border border-white/20 hover:bg-white hover:text-black transition-colors"
                >
                  {isAdminView ? 'Intelligence' : 'Architecture'}
                </button>
                <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden">
                  <img src={user.photoURL || ''} alt="" className="w-full h-full object-cover opacity-80" />
                </div>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="px-6 py-2 border border-white/20 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
              >
                Client Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {!isAdminView && navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-medium text-gray-400 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
              {user ? (
                <button
                  onClick={() => {
                    setIsAdminView(!isAdminView);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-lg font-medium text-white"
                >
                  {isAdminView ? 'View Landing' : 'Dashboard'}
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-lg font-medium text-white"
                >
                  Admin Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
