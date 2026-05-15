import { motion } from 'motion/react';
import { 
  Cloud, 
  ShieldCheck, 
  Smartphone, 
  BarChart3, 
  Cpu, 
  Globe,
  Database,
  Lock
} from 'lucide-react';

const services = [
  {
    title: 'Cloud Transformation',
    description: 'Scalable cloud architecture and multi-cloud management for modern enterprises.',
    icon: Cloud,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    title: 'Cybersecurity',
    description: 'Advanced threat detection, zero-trust implementation, and routine security audits.',
    icon: ShieldCheck,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    title: 'App Modernization',
    description: 'Transforming legacy systems into high-performance cloud-native applications.',
    icon: Smartphone,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    title: 'AI & Data Analytics',
    description: 'Harnessing the power of machine learning and data engineering to drive decisions.',
    icon: BarChart3,
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
  },
  {
    title: 'DevOps & CI/CD',
    description: 'Streamlining deployment pipelines for faster and more reliable release cycles.',
    icon: Cpu,
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
  },
  {
    title: 'Managed IT',
    description: '24/7 infrastructure monitoring and support with industry-leading SLAs.',
    icon: Globe,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#050505] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-24">
          <h2 className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.4em] mb-4">Architecture</h2>
          <h3 className="text-4xl md:text-6xl font-light mb-8 font-serif leading-tight">Intelligence & <span className="italic">Systems.</span></h3>
          <p className="text-xl text-white/40 font-light leading-relaxed">
            We operate at the intersection of architectural purity and raw performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5 border border-white/5">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="p-12 bg-[#050505] hover:bg-white/[0.02] transition-colors group relative overflow-hidden"
            >
              <div className="mb-8">
                <service.icon className={`w-6 h-6 text-white/20 group-hover:text-white transition-colors`} />
              </div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-white/80 group-hover:text-white">{service.title}</h4>
              <p className="text-sm text-white/40 font-light leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="w-8 h-px bg-white/10 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
