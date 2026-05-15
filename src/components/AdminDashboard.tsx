import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Users, 
  Clock, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  CheckCircle2, 
  History,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { db, collection, query, orderBy, onSnapshot, doc, updateDoc, handleFirestoreError, OperationType } from '../lib/firebase';
import { User } from 'firebase/auth';
import { Inquiry, InquiryStatus } from '../types';

interface AdminDashboardProps {
  user: User | null;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<InquiryStatus | 'all'>('all');

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    
    const path = 'inquiries';
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Inquiry[];
      setInquiries(docs);
      setLoading(false);
      setError(null);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, path);
      setError("You don't have permission to view this data. Please ensure you are an authorized admin.");
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const updateStatus = async (id: string, status: InquiryStatus) => {
    const path = 'inquiries';
    try {
      const docRef = doc(db, path, id);
      await updateDoc(docRef, { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `${path}/${id}`);
      alert("Failed to update status. Check permissions.");
    }
  };

  const filteredInquiries = inquiries.filter(i => filter === 'all' || i.status === filter);

  if (loading) {
    return (
      <div className="pt-32 px-4 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <Clock className="w-12 h-12 text-blue-500 animate-pulse mb-4" />
        <p className="text-gray-400">Loading inquiries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 px-4 max-w-7xl mx-auto">
        <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-6">{error}</p>
          <div className="bg-white/5 p-4 rounded-xl text-left font-mono text-sm inline-block">
            UID: <span className="text-blue-400">{user?.uid}</span>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Ask the administrator to add your UID to the <code className="bg-white/10 px-1 rounded">admins</code> collection in Firestore.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-20">
        <div>
          <h2 className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.4em] mb-4">Architecture</h2>
          <h1 className="text-4xl md:text-5xl font-light font-serif mb-2 italic">Inquiry Protocol.</h1>
          <p className="text-white/40 font-light">Managing technical assets and client communications.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative border-b border-white/20 pb-1">
            <Filter className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 w-3 h-3" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="pl-6 pr-4 bg-transparent outline-none text-[10px] uppercase tracking-widest font-bold appearance-none cursor-pointer"
            >
              <option value="all" className="bg-[#050505]">All Logs</option>
              <option value="new" className="bg-[#050505]">New Record</option>
              <option value="contacted" className="bg-[#050505]">In Dialogue</option>
              <option value="resolved" className="bg-[#050505]">Processed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5 border border-white/5">
        <AnimatePresence mode="popLayout">
          {filteredInquiries.map((inquiry) => (
            <motion.div
              layout
              key={inquiry.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#050505] p-10 flex flex-col h-full hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex justify-between items-start mb-8">
                <div className={`text-[10px] font-bold uppercase tracking-widest ${
                  inquiry.status === InquiryStatus.NEW ? 'text-blue-400' :
                  inquiry.status === InquiryStatus.CONTACTED ? 'text-orange-400' :
                  'text-emerald-400'
                }`}>
                  [{inquiry.status}]
                </div>
                <div className="text-[10px] text-white/20 uppercase tracking-widest">
                  {inquiry.createdAt?.toDate?.()?.toLocaleDateString() || 'LIVE'}
                </div>
              </div>

              <h3 className="text-2xl font-serif italic mb-1">{inquiry.name}</h3>
              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-8 pb-4 border-b border-white/5">
                {inquiry.email}
              </div>

              <div className="flex-grow mb-10">
                <div className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-4">Architecture Request</div>
                <div className="text-sm font-medium mb-6 text-white/80">{inquiry.service}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-4">Brief</div>
                <p className="text-sm text-white/50 font-light leading-relaxed italic line-clamp-4">"{inquiry.message}"</p>
              </div>

              <div className="flex flex-col gap-3 mt-auto">
                {inquiry.status !== InquiryStatus.CONTACTED && (
                  <button
                    onClick={() => updateStatus(inquiry.id!, InquiryStatus.CONTACTED)}
                    className="w-full border border-white/10 text-[10px] uppercase tracking-widest font-bold py-4 hover:bg-white hover:text-black transition-all"
                  >
                    Initiate Dialogue
                  </button>
                )}
                {inquiry.status !== InquiryStatus.RESOLVED && (
                  <button
                    onClick={() => updateStatus(inquiry.id!, InquiryStatus.RESOLVED)}
                    className="w-full bg-white text-black text-[10px] uppercase tracking-widest font-bold py-4 hover:bg-white/80 transition-all"
                  >
                    Mark Processed
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredInquiries.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>No inquiries found matching that filter.</p>
        </div>
      )}
    </div>
  );
}
