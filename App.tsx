import React, { useState, useEffect, useMemo, useRef } from 'react';
import { UserRole, EventTheme, Vendor, Booking } from './types';
import { HERO_SLIDES, MOCK_VENDORS, POPULAR_LOCATIONS } from './constants';
import { GoogleGenAI } from '@google/genai';

const THEME_CONFIG: Record<EventTheme, { image: string; primary: string; secondary: string; particle: string }> = {
  'Corporate': {
    image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070&auto=format&fit=crop',
    primary: '#3b82f6',
    secondary: '#1e3a8a',
    particle: '#60a5fa'
  },
  'Wedding': {
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
    primary: '#d4af37',
    secondary: '#4a0404',
    particle: '#fcd34d'
  },
  'Festival': {
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop',
    primary: '#ff9933',
    secondary: '#b91c1c',
    particle: '#fbbf24'
  },
  'Birthday': {
    image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=2031&auto=format&fit=crop',
    primary: '#ec4899',
    secondary: '#701a75',
    particle: '#f472b6'
  },
  'Anniversary': {
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
    primary: '#ef4444',
    secondary: '#7f1d1d',
    particle: '#f87171'
  },
  'Baby Shower': {
    image: 'https://images.unsplash.com/photo-1558223841-766286202157?q=80&w=2070&auto=format&fit=crop',
    primary: '#06b6d4',
    secondary: '#164e63',
    particle: '#67e8f9'
  },
  'Concert': {
    image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=2070&auto=format&fit=crop',
    primary: '#8b5cf6',
    secondary: '#4c1d95',
    particle: '#a78bfa'
  },
  'Workshop': {
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    primary: '#10b981',
    secondary: '#064e3b',
    particle: '#34d399'
  },
  'Graduation': {
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
    primary: '#6366f1',
    secondary: '#312e81',
    particle: '#818cf8'
  },
  'Engagement': {
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
    primary: '#fbbf24',
    secondary: '#92400e',
    particle: '#fcd34d'
  },
  'Holiday Party': {
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
    primary: '#f97316',
    secondary: '#7c2d12',
    particle: '#fb923c'
  },
  'Seminar': {
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
    primary: '#64748b',
    secondary: '#0f172a',
    particle: '#94a3b8'
  },
  'Kitty Party': {
    image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=2070&auto=format&fit=crop',
    primary: '#f472b6',
    secondary: '#9d174d',
    particle: '#f9a8d4'
  },
  'Housewarming': {
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop',
    primary: '#10b981',
    secondary: '#064e3b',
    particle: '#6ee7b7'
  },
  'Naming Ceremony': {
    image: 'https://images.unsplash.com/photo-1525268771113-32d9e9020a9b?q=80&w=2080&auto=format&fit=crop',
    primary: '#38bdf8',
    secondary: '#0c4a6e',
    particle: '#7dd3fc'
  },
  'Pooja': {
    image: 'https://images.unsplash.com/photo-1582234034440-101736720d2c?q=80&w=2070&auto=format&fit=crop',
    primary: '#f97316',
    secondary: '#7c2d12',
    particle: '#fbbf24'
  },
  'Surprise Party': {
    image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=2070&auto=format&fit=crop',
    primary: '#a855f7',
    secondary: '#581c87',
    particle: '#d8b4fe'
  },
  'Reunion': {
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop',
    primary: '#14b8a6',
    secondary: '#0f172a',
    particle: '#5eead4'
  }
};

const TEAM_ROLES = [
  { id: 'dj', title: 'DJ artist', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=500&auto=format&fit=crop', category: 'Concert', lineHeight: 'h-24' },
  { id: 'planner', title: 'Planner', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=500&auto=format&fit=crop', category: 'Venues', lineHeight: 'h-16' },
  { id: 'decor', title: 'Decorater', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=500&auto=format&fit=crop', category: 'Decoration', lineHeight: 'h-20' },
  { id: 'choreographer', title: 'Choreographer', image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=500&auto=format&fit=crop', category: 'Festival', lineHeight: 'h-12' },
  { id: 'caterer', title: 'Caterer', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=500&auto=format&fit=crop', category: 'Catering', lineHeight: 'h-28' },
  { id: 'photo', title: 'Photographer', image: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=500&auto=format&fit=crop', category: 'Photography', lineHeight: 'h-14' },
  { id: 'artist', title: 'Artist', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=500&auto=format&fit=crop', category: 'Decoration', lineHeight: 'h-22' },
  { id: 'florist', title: 'Florist', image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=500&auto=format&fit=crop', category: 'Decoration', lineHeight: 'h-18' },
];

const INSPIRATIONS = [
  {
    category: 'ENGAGEMENT',
    title: 'Couple effortlessly slaying in their pre wedding ceremony',
    description: 'A celebration of whole life which brings out all good wishes and blessings.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop',
    size: 'large'
  },
  {
    category: 'INVITATIONS',
    title: 'Say Hola! to your save the dates cards',
    description: 'Memorable day wants all your attention to the basic rules like an invitation.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop',
    size: 'large'
  }
];

const ThemeBackground: React.FC<{ theme: EventTheme }> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 transition-all duration-1000">
        <img src={config.image} alt={theme} className="w-full h-full object-cover opacity-30 scale-105 blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, ${config.primary}22 0%, transparent 80%)` }} />
      </div>
    </div>
  );
};

const DeveloperCredit: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`pt-8 border-t border-white/5 max-w-xs mx-auto text-center ${className}`}>
    <div className="text-white/50 text-[11px] font-bold uppercase tracking-[0.2em] brand-heading">
      Developed by <span className="text-[#00BCD4]">Yashasvi S. Rajput</span>
    </div>
    <a href="mailto:ryashasvi77@gmail.com" className="block text-white/30 text-[10px] lowercase tracking-widest mt-2 hover:text-[#00BCD4] transition-colors">
      ryashasvi77@gmail.com
    </a>
  </div>
);

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.GUEST);
  const [budget, setBudget] = useState<number>(2000000);
  const [theme, setTheme] = useState<EventTheme>('Wedding');
  const [location, setLocation] = useState<string>('Mumbai');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All Vendors');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPlan, setAiPlan] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Vendor Onboarding
  const [isVendorOnboarding, setIsVendorOnboarding] = useState(false);
  const [currentVendorProfile, setCurrentVendorProfile] = useState<Partial<Vendor> | null>(null);
  const [onboardingData, setOnboardingData] = useState({
    name: '',
    type: 'Venue' as Vendor['type'],
    price: 0,
    location: 'Mumbai',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1474&auto=format&fit=crop',
    themeExpertise: [] as EventTheme[]
  });

  const homeRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const inspirationRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePlanEvent = async () => {
    setIsGenerating(true);
    setAiPlan('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create an event plan for a ${theme} in ${location}. Budget: ₹${budget}. Provide 5 specific phases.`,
      });
      setAiPlan(response.text || 'Planning error.');
    } catch (e) {
      setAiPlan('AI Planner is resting. Try again soon.');
    } finally {
      setIsGenerating(false);
    }
  };

  const createBooking = (vendor: Vendor) => {
    alert(`Booking initiated with ${vendor.name}.`);
  };

  const handleVendorOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentVendorProfile({ ...onboardingData, id: 'v_new', rating: 5.0, gallery: [] });
    setRole(UserRole.VENDOR);
    setIsVendorOnboarding(false);
  };

  const filteredVendors = useMemo(() => {
    return MOCK_VENDORS.filter(v => {
      const matchesCategory = activeCategory === 'All Vendors' || v.type === activeCategory.replace('s', '');
      const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const renderGuestView = () => (
    <div className="relative h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
          <source src="https://www.luxurymywedding.com/videos/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <div className="relative z-10 space-y-12 px-6 max-w-7xl mx-auto flex flex-col items-center">
        <h1 className="text-8xl md:text-[12rem] font-black leading-[0.85] uppercase brand-heading text-white">PLAN MY EVENT</h1>
        <p className="indian-title italic text-4xl text-white/60">Crafting the world's most exquisite celebrations.</p>
        <div className="flex flex-col md:flex-row gap-10 justify-center pt-12">
          <button onClick={() => setRole(UserRole.CUSTOMER)} className="px-16 py-8 bg-white text-black font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 transition-all brand-heading">I am planning</button>
          <button onClick={() => setIsVendorOnboarding(true)} className="px-16 py-8 bg-transparent border border-white/20 text-white font-black uppercase tracking-[0.4em] rounded-full hover:bg-white hover:text-black transition-all brand-heading">I am a vendor</button>
        </div>
        <DeveloperCredit className="mt-20 border-t-0" />
      </div>
      {isVendorOnboarding && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-3xl">
          <div className="absolute inset-0 bg-black/95" onClick={() => setIsVendorOnboarding(false)} />
          <form onSubmit={handleVendorOnboarding} className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[40px] p-12">
            <h2 className="text-4xl font-black uppercase italic brand-heading text-white mb-8">Vendor Partner</h2>
            <div className="space-y-6">
              <input required type="text" placeholder="Brand Name" value={onboardingData.name} onChange={e => setOnboardingData({...onboardingData, name: e.target.value})} className="w-full bg-transparent border-b border-white/10 py-4 outline-none text-white brand-heading" />
              <select value={onboardingData.type} onChange={e => setOnboardingData({...onboardingData, type: e.target.value as any})} className="w-full bg-black border-b border-white/10 py-4 text-white">
                <option value="Venue">Venue</option>
                <option value="Catering">Catering</option>
                <option value="Decor">Decor</option>
                <option value="Photography">Photography</option>
              </select>
              <button type="submit" className="w-full py-6 bg-white text-black font-black uppercase rounded-full">Register</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );

  const renderCustomerDashboard = () => (
    <div className="min-h-screen relative text-white bg-[#050505] flex flex-col font-['Inter']">
      <ThemeBackground theme={theme} />
      <nav className="fixed top-0 w-full z-[100] bg-black/60 backdrop-blur-3xl px-12 py-8 flex justify-between items-center border-b border-white/5">
        <h2 className="text-3xl font-black brand-heading">PME</h2>
        <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-widest text-white/40">
          <button onClick={() => scrollToSection(homeRef)} className="hover:text-white">Home</button>
          <button onClick={() => scrollToSection(teamRef)} className="hover:text-white">Team</button>
          <button onClick={() => scrollToSection(servicesRef)} className="hover:text-white">Collection</button>
          <button onClick={() => scrollToSection(experienceRef)} className="hover:text-white">Experience</button>
          <button onClick={() => scrollToSection(inspirationRef)} className="hover:text-white">Inspiration</button>
          <button onClick={() => setRole(UserRole.GUEST)} className="bg-white/5 border border-white/10 px-6 py-2 rounded-full text-white hover:bg-white hover:text-black transition-all">Out</button>
        </div>
      </nav>

      <main className="relative z-10 w-full pt-48">
        <section ref={homeRef} className="max-w-7xl mx-auto px-6 mb-32">
          <div className="text-center mb-24">
            <h1 className="text-7xl md:text-9xl font-black brand-heading uppercase leading-tight">Your {theme}<br/>Redefined</h1>
            <p className="text-2xl indian-title italic text-white/40 mt-8">Effortless orchestration meets timeless elegance.</p>
          </div>
          <div className="bg-[#0a0a0a]/80 backdrop-blur-3xl rounded-[60px] p-6 grid grid-cols-1 md:grid-cols-4 gap-6 border border-white/10">
            <div className="px-8 py-4 border-r border-white/5">
              <label className="text-[9px] font-black uppercase text-white/30 block mb-2">Theme</label>
              <select value={theme} onChange={e => setTheme(e.target.value as any)} className="bg-transparent text-xl font-black italic text-white outline-none w-full brand-heading">
                {Object.keys(THEME_CONFIG).map(t => <option key={t} value={t} className="bg-black">{t}</option>)}
              </select>
            </div>
            <div className="px-8 py-4 border-r border-white/5">
              <label className="text-[9px] font-black uppercase text-white/30 block mb-2">City</label>
              <select value={location} onChange={e => setLocation(e.target.value)} className="bg-transparent text-xl font-black italic text-white outline-none w-full brand-heading">
                {POPULAR_LOCATIONS.map(l => <option key={l} value={l} className="bg-black">{l}</option>)}
              </select>
            </div>
            <div className="px-8 py-4 border-r border-white/5">
              <label className="text-[9px] font-black uppercase text-white/30 block mb-2">Budget (₹)</label>
              <input type="number" value={budget} onChange={e => setBudget(Number(e.target.value))} className="bg-transparent text-xl font-black italic text-white outline-none w-full brand-heading" />
            </div>
            <button onClick={() => setIsAiModalOpen(true)} className="bg-white text-black rounded-[50px] font-black uppercase text-[11px] tracking-widest hover:scale-105 transition-all">AI Blueprint ✨</button>
          </div>
        </section>

        {/* TEAM SECTION WITH LINE EFFECT */}
        <section ref={teamRef} className="py-48 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center mb-32">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter brand-heading text-[#00BCD4] mb-4">
              Find Your Best {theme} Team
            </h2>
            <p className="indian-title italic text-2xl text-white/50 tracking-wide">
              Every love story is beautiful, but yours is our favourite.
            </p>
            <div className="w-24 h-px bg-[#00BCD4]/30 mx-auto mt-8 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#00BCD4] text-xs">◆</div>
            </div>
          </div>
          
          <div className="flex justify-between items-end gap-2 max-w-[1600px] mx-auto px-10 overflow-x-auto no-scrollbar pb-10">
            {TEAM_ROLES.map((role) => (
              <div 
                key={role.id} 
                className="flex flex-col items-center group cursor-pointer flex-shrink-0"
                onClick={() => { setActiveCategory(role.category); scrollToSection(servicesRef); }}
              >
                {/* Line Effect Top */}
                <div className="flex flex-col items-center mb-2">
                  <span className="text-[14px] font-medium text-[#00BCD4] mb-3 brand-heading opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap">
                    {role.title}
                  </span>
                  <div className="w-3 h-3 rounded-full bg-[#00BCD4] shadow-[0_0_15px_#00BCD4]" />
                  <div className={`w-px ${role.lineHeight} bg-gradient-to-b from-[#00BCD4] to-transparent opacity-40`} />
                </div>

                {/* Role Portrait */}
                <div className="w-48 h-80 relative overflow-hidden transition-all duration-700 rounded-3xl group-hover:scale-105">
                  <img 
                    src={role.image} 
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                    alt={role.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 w-full text-center px-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/80 group-hover:text-white">
                      {role.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={servicesRef} className="py-32 px-6 bg-black/40">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-6xl font-black brand-heading uppercase italic mb-16">The Collection</h2>
            <div className="flex gap-4 mb-16 overflow-x-auto no-scrollbar pb-4 border-b border-white/5">
              {['All Vendors', 'Venues', 'Catering', 'Photography', 'Decoration'].map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-white text-black' : 'text-white/30 border border-white/5'}`}>{cat}</button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredVendors.map(v => (
                <div key={v.id} className="group bg-[#0a0a0a] rounded-[40px] overflow-hidden border border-white/5">
                  <div className="h-80 overflow-hidden"><img src={v.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={v.name} /></div>
                  <div className="p-10">
                    <h4 className="text-2xl font-black brand-heading italic">{v.name}</h4>
                    <p className="text-white/30 text-sm mt-2">{v.location}</p>
                    <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/5">
                      <span className="text-2xl font-black brand-heading">₹{v.price.toLocaleString()}</span>
                      <button onClick={() => createBooking(v)} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={experienceRef} className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center mb-24">
            <h2 className="text-7xl font-black brand-heading uppercase italic">The Experience</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-7xl mx-auto">
            <div className="group space-y-6">
              <div className="aspect-[4/5] rounded-[50px] overflow-hidden border border-white/5"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt="Design" /></div>
              <h4 className="text-3xl font-black brand-heading uppercase italic">Bespoke Design</h4>
              <p className="text-white/30 italic indian-title">Articulating your heritage through immersive spatial engineering.</p>
            </div>
            <div className="group space-y-6 md:translate-y-12">
              <div className="aspect-[4/5] rounded-[50px] overflow-hidden border border-white/5"><img src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt="Tech" /></div>
              <h4 className="text-3xl font-black brand-heading uppercase italic">Sensory Tech</h4>
              <p className="text-white/30 italic indian-title">State-of-the-art acoustics and 3D projection mapping for the elite stage.</p>
            </div>
            <div className="group space-y-6">
              <div className="aspect-[4/5] rounded-[50px] overflow-hidden border border-white/5"><img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt="Precision" /></div>
              <h4 className="text-3xl font-black brand-heading uppercase italic">Precision</h4>
              <p className="text-white/30 italic indian-title">Command-center logistics ensuring flawless execution down to the second.</p>
            </div>
          </div>
        </section>

        <section ref={inspirationRef} className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {INSPIRATIONS.map((item, idx) => (
              <div key={idx} className="group relative h-[600px] rounded-[60px] overflow-hidden border border-white/10">
                <img src={item.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-0 p-16 w-full text-center">
                  <h3 className="text-4xl font-black brand-heading italic mb-6">{item.title}</h3>
                  <button className="px-10 py-4 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Explore</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {isAiModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={() => setIsAiModalOpen(false)} />
          <div className="relative w-full max-w-4xl bg-[#080808] border border-white/10 rounded-[60px] p-16 h-[80vh] flex flex-col">
            <div className="flex justify-between mb-10">
              <h3 className="text-4xl font-black brand-heading uppercase italic">AI Blueprint</h3>
              <button onClick={() => setIsAiModalOpen(false)} className="text-2xl">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {isGenerating ? <div className="animate-pulse text-white/40">Architecting vision...</div> : <div className="text-xl italic text-white/50 leading-relaxed whitespace-pre-line">{aiPlan || "Ready to plan your event."}</div>}
              {!aiPlan && !isGenerating && <button onClick={handlePlanEvent} className="mt-10 px-12 py-5 bg-white text-black font-black uppercase rounded-full">Generate Plan</button>}
            </div>
          </div>
        </div>
      )}
      
      <footer className="py-20 text-center border-t border-white/5 bg-black/40 space-y-6">
        <div className="text-white/10 text-[10px] font-black uppercase tracking-[1em] brand-heading">
          Plan My Event • Shubh Arambh • Curated Excellence
        </div>
        <DeveloperCredit />
      </footer>
    </div>
  );

  const renderVendorDashboard = () => (
    <div className="min-h-screen bg-black text-white flex flex-col font-['Inter']">
      <nav className="border-b border-white/5 px-12 py-8 flex justify-between items-center bg-black/60 backdrop-blur-3xl">
        <h2 className="text-3xl font-black brand-heading">Vendor HQ</h2>
        <button onClick={() => setRole(UserRole.GUEST)} className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">Sign Out</button>
      </nav>
      <main className="flex-1 max-w-7xl mx-auto px-6 py-24 w-full grid grid-cols-1 lg:grid-cols-12 gap-16">
        <aside className="lg:col-span-4 bg-[#0a0a0a] rounded-[50px] p-12 border border-white/5 text-center">
          <div className="w-40 h-40 rounded-[40px] overflow-hidden mx-auto mb-8 border border-white/10">
            <img src={currentVendorProfile?.imageUrl} className="w-full h-full object-cover" alt="Brand" />
          </div>
          <h3 className="text-3xl font-black brand-heading italic uppercase">{currentVendorProfile?.name}</h3>
          <p className="text-[#00BCD4] text-[10px] font-black mt-2 tracking-widest uppercase">{currentVendorProfile?.type}</p>
        </aside>
        <section className="lg:col-span-8 bg-[#0a0a0a] rounded-[50px] p-12 border border-white/5">
          <h4 className="text-4xl font-black brand-heading uppercase italic">Leads & Enquiries</h4>
          <div className="mt-16 text-center py-20 border-t border-dashed border-white/10">
            <p className="text-white/20 font-black uppercase tracking-widest text-xs">Waiting for active broadcasts...</p>
          </div>
        </section>
      </main>
      <footer className="py-12 text-center border-t border-white/5 bg-[#050505] space-y-4">
        <div className="text-white/10 text-[8px] font-black uppercase tracking-[0.8em] brand-heading">
          PME Partner Network
        </div>
        <DeveloperCredit />
      </footer>
    </div>
  );

  return (
    <>
      {role === UserRole.GUEST && renderGuestView()}
      {role === UserRole.CUSTOMER && renderCustomerDashboard()}
      {role === UserRole.VENDOR && renderVendorDashboard()}
    </>
  );
};

export default App;