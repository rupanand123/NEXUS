import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { db, collection, addDoc, serverTimestamp, handleFirestoreError, OperationType } from '../lib/firebase';
import { InquiryStatus } from '../types';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Cloud Transformation',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const services = [
    'Cloud Transformation',
    'Cybersecurity',
    'App Modernization',
    'AI & Data Analytics',
    'DevOps & CI/CD',
    'Managed IT'
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const path = 'inquiries';
    try {
      await addDoc(collection(db, path), {
        ...formData,
        status: InquiryStatus.NEW,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({ name: '', email: '', service: 'Cloud Transformation', message: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <section className="py-32 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <h2 className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.4em] mb-4">Engagement</h2>
            <h3 className="text-4xl md:text-6xl font-light mb-10 font-serif">Project <span className="italic">Inquiry.</span></h3>
            <p className="text-white/40 text-lg mb-12 font-light leading-relaxed max-w-md">
              Share your vision with our technical architects. We respond to qualified inquiries within one business cycle.
            </p>

            <div className="space-y-12">
              {[
                { label: 'Protocols', value: 'hello@nexus.solutions' },
                { label: 'Operations', value: 'Andhra Pradesh, India' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-2">{item.label}</div>
                  <div className="text-white/80 font-light text-xl italic font-serif">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-12 lg:p-16 relative">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="text-white w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-serif mb-4 italic">Protocol Initiated.</h4>
                  <p className="text-white/40 text-sm font-light mb-10">
                    Your inquiry has been logged in our secure processing queue.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-[10px] uppercase tracking-widest text-white/60 hover:text-white underline underline-offset-8"
                  >
                    Log New Record
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-10"
                >
                  <div className="space-y-2 border-b border-white/10 pb-4">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Identity</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter legal name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/5 py-1 font-light"
                    />
                  </div>

                  <div className="space-y-2 border-b border-white/10 pb-4">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Email Protocol</label>
                    <input
                      required
                      type="email"
                      placeholder="business@vanguard.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/5 py-1 font-light"
                    />
                  </div>

                  <div className="space-y-2 border-b border-white/10 pb-4">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Specialization</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-transparent border-none outline-none text-white py-1 font-light appearance-none"
                    >
                      {services.map((service) => (
                        <option key={service} value={service} className="bg-[#050505]">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2 border-b border-white/10 pb-4">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Brief</label>
                    <textarea
                      required
                      placeholder="Describe the architectural requirements..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/5 py-1 font-light resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-[10px] uppercase tracking-widest">
                      <AlertCircle size={14} />
                      {errorMessage}
                    </div>
                  )}

                  <button
                    disabled={status === 'submitting'}
                    type="submit"
                    className="w-full bg-white text-black text-xs font-bold uppercase tracking-[0.2em] py-5 hover:bg-white/90 disabled:bg-gray-500 transition-all flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Logging...
                      </>
                    ) : (
                      <>
                        Initiate Consultation
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
