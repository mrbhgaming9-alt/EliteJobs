import { useState, useEffect, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, MapPin, Briefcase, DollarSign, Plus, X, 
  CheckCircle2, Clock, Building2, Mail, Phone, 
  Youtube, Bell, Twitter, Instagram, Linkedin, Github 
} from 'lucide-react';

// --- Types ---
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  category: string;
  description: string;
  postedAt: string;
  contactEmail: string;
  contactPhone?: string;
}

interface Subscription {
  id: string;
  email: string;
  category: string;
  keyword: string;
}

// --- Initial Data ---
const INITIAL_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechFlow Solutions',
    location: 'Remote / Lahore',
    salary: '$80k - $120k',
    type: 'Full-time',
    category: 'Engineering',
    description: 'We are looking for a React expert to lead our frontend team in building next-gen web applications.',
    postedAt: '2 hours ago',
    contactEmail: 'jobs@techflow.com'
  },
  {
    id: '2',
    title: 'UI/UX Designer',
    company: 'Creative Pulse',
    location: 'Islamabad',
    salary: '$50k - $70k',
    type: 'Contract',
    category: 'Design',
    description: 'Join our design studio to create beautiful and intuitive user experiences for global clients.',
    postedAt: '5 hours ago',
    contactEmail: 'design@creativepulse.pk'
  },
  {
    id: '3',
    title: 'Digital Marketing Manager',
    company: 'Growth Hackers',
    location: 'Karachi',
    salary: '$40k - $60k',
    type: 'Full-time',
    category: 'Marketing',
    description: 'Lead our digital marketing strategies and drive growth through data-driven campaigns.',
    postedAt: '1 day ago',
    contactEmail: 'careers@growthhackers.com'
  }
];

const CATEGORIES = [
  'All', 'Engineering', 'Design', 'Marketing', 'Sales', 'Finance', 
  'Healthcare', 'Education', 'Customer Service', 'Data Science', 
  'Human Resources', 'Writing', 'Legal'
];

// --- Components ---

const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-brand-accent text-white px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2"
    >
      <CheckCircle2 size={20} />
      {message}
    </motion.div>
  );
};

const Navbar = ({ onPostJob }: { onPostJob: () => void }) => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-brand-black/80 backdrop-blur-md py-4 border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <div className="text-2xl font-bold tracking-tighter">
        ELITE<span className="text-brand-accent italic">JOBS</span>
      </div>
      <button 
        onClick={onPostJob}
        className="bg-brand-accent text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-orange-600 transition-colors"
      >
        <Plus size={18} /> Post a Job
      </button>
    </div>
  </nav>
);

const JobCard = ({ job, onApply }: { job: Job, onApply: () => void }) => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="glass-card p-6 rounded-3xl hover:border-brand-accent/50 transition-all group h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold group-hover:text-brand-accent transition-colors">{job.title}</h3>
          <div className="flex items-center gap-2 text-white/50 text-sm mt-1">
            <Building2 size={14} /> {job.company}
          </div>
        </div>
        <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-accent border border-brand-accent/20">
          {job.type}
        </span>
      </div>
      
      <p className="text-white/60 text-sm mb-6 line-clamp-2">{job.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-6 mt-auto text-white/40 text-xs">
        <div className="flex items-center gap-2"><MapPin size={14} /> {job.location}</div>
        <div className="flex items-center gap-2"><DollarSign size={14} /> {job.salary}</div>
        <div className="flex items-center gap-2"><Briefcase size={14} /> {job.category}</div>
        <div className="flex items-center gap-2"><Clock size={14} /> {job.postedAt}</div>
      </div>

      <AnimatePresence>
        {showContact && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white/5 rounded-2xl p-4 mb-4 border border-brand-accent/20 overflow-hidden"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-2">Contact Employer</p>
            <div className="space-y-2 text-sm">
              <a href={`mailto:${job.contactEmail}`} className="flex items-center gap-2 text-white hover:text-brand-accent transition-colors">
                <Mail size={14} /> {job.contactEmail}
              </a>
              {job.contactPhone && (
                <div className="flex items-center gap-2 text-white"><Phone size={14} /> {job.contactPhone}</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => { setShowContact(true); onApply(); }}
        className={`w-full py-3 rounded-xl border font-bold text-sm transition-all ${showContact ? 'bg-white text-brand-black border-white' : 'border-white/10 hover:bg-white hover:text-brand-black'}`}
      >
        {showContact ? 'Contact Details Shown' : 'Apply Now'}
      </button>
    </div>
  );
};

export default function App() {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [toast, setToast] = useState<string | null>(null);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || job.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [jobs, searchTerm, activeCategory]);

  const handleAddJob = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newJob: Job = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.get('title') as string,
      company: formData.get('company') as string,
      location: formData.get('location') as string,
      salary: formData.get('salary') as string,
      type: formData.get('type') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      contactEmail: formData.get('email') as string,
      postedAt: 'Just now'
    };
    setJobs([newJob, ...jobs]);
    setIsPostModalOpen(false);
    setToast('Job Opportunity Published!');
  };

  return (
    <div className="min-h-screen bg-brand-black text-white">
      <Navbar onPostJob={() => setIsPostModalOpen(true)} />
      
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <section className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              FIND YOUR <span className="text-gradient">DREAM</span> JOB
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
              Pakistan's most premium job board. Connect with top companies and build your career.
            </p>
            
            <div className="max-w-3xl mx-auto glass-card p-2 rounded-2xl flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center px-4 gap-3">
                <Search size={20} className="text-white/40" />
                <input 
                  type="text" 
                  placeholder="Job title or company..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-none outline-none py-3 text-sm text-white"
                />
              </div>
              <button 
                onClick={() => setToast('Searching...')}
                className="bg-brand-accent text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors"
              >
                Search
              </button>
            </div>
          </motion.div>
        </section>

        <section className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)} 
                className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-brand-accent text-white' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsAlertModalOpen(true)}
            className="flex items-center gap-2 bg-white text-brand-black px-6 py-2 rounded-full text-sm font-bold shadow-xl hover:bg-brand-accent hover:text-white transition-all shrink-0"
          >
            <Bell size={18} /> Set Job Alert
          </button>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredJobs.map(job => (
              <motion.div key={job.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                <JobCard job={job} onApply={() => setToast(`Applied for ${job.title}!`)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      <footer className="py-16 border-t border-white/10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold mb-6">ELITE<span className="text-brand-accent italic">JOBS</span></div>
            <p className="text-white/40 max-w-sm mb-6">Connecting Pakistan's top talent with the world's most innovative companies.</p>
            <div className="flex gap-4">
              <a href="https://youtube.com/@mrbhgaming9" target="_blank" className="text-white/40 hover:text-brand-accent transition-colors"><Youtube size={24} /></a>
              <a href="#" className="text-white/40 hover:text-brand-accent transition-colors"><Twitter size={24} /></a>
              <a href="#" className="text-white/40 hover:text-brand-accent transition-colors"><Instagram size={24} /></a>
              <a href="#" className="text-white/40 hover:text-brand-accent transition-colors"><Linkedin size={24} /></a>
              <a href="#" className="text-white/40 hover:text-brand-accent transition-colors"><Github size={24} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-center gap-2"><Mail size={16} /> mrbhgaming9@gmail.com</li>
              <li className="flex items-center gap-2"><Phone size={16} /> +92 324 4429774</li>
              <li className="flex items-center gap-2"><Youtube size={16} className="text-red-500" /> <a href="https://youtube.com/@mrbhgaming9" target="_blank" className="hover:text-brand-accent transition-colors">YouTube Channel</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#" className="hover:text-brand-accent">Browse Jobs</a></li>
              <li><a href="#" className="hover:text-brand-accent">Post a Job</a></li>
              <li><a href="#" className="hover:text-brand-accent">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 text-center text-white/20 text-xs">© 2026 Elite Jobs Portal. All rights reserved.</div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {isPostModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsPostModalOpen(false)} className="absolute inset-0 bg-brand-black/95 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-xl glass-card p-8 rounded-[2rem] border-white/20 shadow-2xl overflow-y-auto max-h-[90vh]">
              <button onClick={() => setIsPostModalOpen(false)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X size={24} /></button>
              <h2 className="text-3xl font-bold mb-6">Post a New Job</h2>
              <form onSubmit={handleAddJob} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input name="title" placeholder="Job Title" className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-brand-accent" required />
                  <input name="company" placeholder="Company Name" className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-brand-accent" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input name="location" placeholder="Location" className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-brand-accent" required />
                  <input name="salary" placeholder="Salary Range" className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-brand-accent" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select name="type" className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-brand-accent">
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                  <select name="category" className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-brand-accent">
                    {CATEGORIES.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <input name="email" type="email" placeholder="Contact Email" className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-brand-accent" required />
                <textarea name="description" placeholder="Job Description" rows={3} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-brand-accent resize-none" required></textarea>
                <button className="w-full bg-brand-accent py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors">Publish Job Opportunity</button>
              </form>
            </motion.div>
          </div>
        )}

        {isAlertModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAlertModalOpen(false)} className="absolute inset-0 bg-brand-black/95 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-lg glass-card p-8 rounded-[2rem] border-white/20 shadow-2xl">
              <button onClick={() => setIsAlertModalOpen(false)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X size={24} /></button>
              <h2 className="text-3xl font-bold mb-6">Set Job Alert</h2>
              <form onSubmit={(e) => { e.preventDefault(); setToast('Subscribed to Alerts!'); setIsAlertModalOpen(false); }} className="space-y-4">
                <input type="email" placeholder="Your Email Address" className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-brand-accent" required />
                <select className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-brand-accent">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <button className="w-full bg-brand-accent py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors">Subscribe to Alerts</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
