/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Cloud, 
  ShieldCheck, 
  Cpu, 
  MessageSquare, 
  ChevronRight, 
  Github, 
  Twitter, 
  Linkedin, 
  Menu, 
  X,
  Server,
  Lock,
  Zap,
  Globe,
  Database
} from 'lucide-react';
import { auth, signInWithPopup, googleProvider } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdminView, setIsAdminView] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-white selection:text-black">
      <Navigation 
        user={user} 
        isAdminView={isAdminView} 
        setIsAdminView={setIsAdminView} 
      />

      <main>
        <AnimatePresence mode="wait">
          {isAdminView ? (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AdminDashboard user={user} />
            </motion.div>
          ) : (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero />
              <Services />
              <div id="contact">
                <ContactForm />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

