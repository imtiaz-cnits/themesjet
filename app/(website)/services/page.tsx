"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Upload, Check, Wrench, Sparkles, Bug, ChevronDown,
    Loader2, X, FileText, Monitor, Smartphone, Code,
    MessageSquare, PenTool, Rocket, Layers, Search, Settings, Zap
} from "lucide-react";
import { toast } from "sonner";
import { submitServiceRequest } from "@/actions/services";

// Layout Imports
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// UploadThing Hook
import { useUploadThing } from "@/lib/uploadthing";

// IMPORT COUNTRIES (If you didn't create the separate file, paste the array here instead)
import { countries } from "@/lib/countries";

// --- CUSTOM COUNTRY SELECT COMPONENT (WITH SEARCH) ---
interface CountrySelectProps {
    value: typeof countries[0];
    onChange: (value: typeof countries[0]) => void;
}

function CountrySelect({ value, onChange }: CountrySelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState(""); // Search State
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null); // Ref for search input

    // Filter countries based on search
    const filteredCountries = countries.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.includes(search)
    );

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    return (
        <div className={`relative ${isOpen ? 'z-50' : 'z-0'}`} ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-2 px-3 py-3 rounded-lg text-left transition-all duration-200 h-full
                    bg-card/80 backdrop-blur-sm border min-w-[110px] justify-between
                    ${isOpen ? 'border-primary ring-1 ring-primary/20' : 'border-border hover:border-primary/50'}
                `}
            >
                <span className="text-lg leading-none">{value.flag}</span>
                <span className="text-foreground font-medium text-sm">{value.code}</span>
                <ChevronDown
                    size={14}
                    className={`text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 mt-2 w-72 bg-card border border-border rounded-xl shadow-2xl overflow-hidden origin-top-left left-0"
                    >
                        {/* SEARCH INPUT */}
                        <div className="p-2 sticky top-0 bg-card z-10 border-b border-border">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Search country or code..."
                                    className="w-full bg-secondary rounded-md py-2 pl-8 pr-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary/20"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* COUNTRY LIST */}
                        <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-border">
                            {filteredCountries.length > 0 ? (
                                filteredCountries.map((country) => (
                                    <button
                                        key={country.iso}
                                        onClick={() => {
                                            onChange(country);
                                            setIsOpen(false);
                                            setSearch(""); // Reset search on select
                                        }}
                                        className={`
                                            w-full flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors hover:bg-secondary
                                            ${value.iso === country.iso ? 'bg-primary/10 text-primary font-bold' : 'text-foreground'}
                                        `}
                                    >
                                        <span className="text-lg">{country.flag}</span>
                                        <span className="flex-1 text-left truncate">{country.name}</span>
                                        <span className="text-muted-foreground text-xs font-mono">{country.code}</span>
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-3 text-xs text-muted-foreground text-center">
                                    No countries found.
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// --- CUSTOM SELECT COMPONENT ---
interface CustomSelectProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

function CustomSelect({ label, options, value, onChange }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`relative ${isOpen ? 'z-50' : 'z-0'}`} ref={containerRef}>
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">{label}</label>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200
                    bg-background border
                    ${isOpen ? 'border-primary ring-1 ring-primary/20' : 'border-border hover:border-primary/50'}
                `}
            >
                <span className="text-foreground font-medium text-sm">{value}</span>
                <ChevronDown
                    size={16}
                    className={`text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden origin-top"
                    >
                        <div className="py-1 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-border">
                            {options.map((option) => (
                                <div
                                    key={option}
                                    onClick={() => {
                                        onChange(option);
                                        setIsOpen(false);
                                    }}
                                    className={`
                                        px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center justify-between
                                        ${value === option
                                        ? 'bg-primary/10 text-primary font-bold'
                                        : 'text-foreground hover:bg-secondary'
                                    }
                                    `}
                                >
                                    {option}
                                    {value === option && <Check size={14} />}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// --- MAIN PAGE COMPONENT ---
export default function ServicesPage() {
    const [selectedType, setSelectedType] = useState("customization");
    const [budget, setBudget] = useState(1000);
    const [deadline, setDeadline] = useState("Flexible");
    const [visibility, setVisibility] = useState("Private (Invite Only)");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // Set default country (Bangladesh or US)
    const [country, setCountry] = useState(countries.find(c => c.iso === "BD") || countries[0]);
    const [company, setCompany] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [attachment, setAttachment] = useState<{ name: string; url: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { startUpload, isUploading } = useUploadThing("projectAttachment", {
        onClientUploadComplete: (res) => {
            if (res && res.length > 0) {
                setAttachment({
                    name: res[0].name,
                    url: res[0].url
                });
                toast.success("File attached successfully!");
            }
        },
        onUploadError: (error: Error) => {
            toast.error(`Upload failed: ${error.message}`);
        },
    });

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            startUpload(Array.from(e.target.files));
        }
    };

    const removeAttachment = (e: React.MouseEvent) => {
        e.stopPropagation();
        setAttachment(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !description.trim() || !name.trim() || !email.trim() || !company.trim()) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        const formData = {
            projectType: selectedType,
            budget,
            deadline,
            visibility,
            title,
            description,
            attachmentUrl: attachment?.url || null,
            attachmentName: attachment?.name || null,
            name,
            email,
            phone: phone ? `${country.code} ${phone}` : "",
            company
        };

        try {
            const result = await submitServiceRequest(formData);

            if (result.success) {
                toast.success("Request sent successfully! We will review it shortly.");
                setTitle("");
                setDescription("");
                setName("");
                setEmail("");
                setPhone("");
                setCompany("");
                setAttachment(null);
                setBudget(1000);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                toast.error("Failed to submit request. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen text-foreground font-body transition-colors duration-300 flex flex-col relative">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-10" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-10" />
            </div>

            <TopBar />
            <Navbar />

            <section className="pt-40 pb-20 relative overflow-hidden">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            <Sparkles size={12} /> Our Expertise
                        </span>
                        <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 tracking-tight text-foreground leading-tight">
                            We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Digital Products</span> <br className="hidden md:block" /> For Your Success
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                            From pixel-perfect themes to complex web applications, we provide end-to-end development services to help your business grow.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
                        {[
                            { icon: <Monitor className="w-6 h-6" />, title: "Web Development", desc: "Custom websites built with Next.js, React, and Node." },
                            { icon: <Smartphone className="w-6 h-6" />, title: "Mobile Apps", desc: "Cross-platform mobile applications using React Native." },
                            { icon: <Layers className="w-6 h-6" />, title: "UI/UX Design", desc: "User-centric design that converts visitors into customers." }
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="bg-card/50 border border-border p-6 rounded-2xl backdrop-blur-sm hover:border-primary/30 transition-colors">
                                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-foreground mb-4">{item.icon}</div>
                                <h3 className="font-bold text-foreground text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-14 relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 relative">
                    <div className="text-center mb-20">
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">Streamlined Process</motion.h2>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-muted-foreground max-w-2xl mx-auto">From the first conversation to final delivery, we ensure a transparent and collaborative journey.</motion.p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        <div className="hidden md:block absolute top-[55px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10" />
                        {[
                            { icon: <Search size={24} />, step: "01", title: "Discovery", desc: "We dive deep into your requirements, goals, and target audience to build the right strategy." },
                            { icon: <PenTool size={24} />, step: "02", title: "Design", desc: "We create high-fidelity prototypes and visual designs for your approval before coding." },
                            { icon: <Code size={24} />, step: "03", title: "Development", desc: "Our experts build your solution using modern, scalable, and clean code standards." },
                            { icon: <Rocket size={24} />, step: "04", title: "Launch", desc: "We deploy your project, ensure it's bug-free, and provide post-launch support." }
                        ].map((item, index) => (
                            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative group pt-4">
                                <div className="hidden md:block absolute top-[48px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(var(--primary),0.6)] transition-all duration-300" />
                                <div className="bg-card/40 backdrop-blur-md border border-border/60 p-8 rounded-2xl h-full hover:bg-card/80 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 group-hover:bg-gradient-to-b group-hover:from-white/[0.03] group-hover:to-transparent">
                                    <div className="w-16 h-16 mx-auto md:mx-0 bg-gradient-to-br from-primary/20 to-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-primary/10 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                    <div className="absolute top-4 right-4 text-6xl font-black text-foreground/5 font-heading select-none group-hover:text-primary/10 transition-colors duration-300">{item.step}</div>
                                    <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="flex-grow pt-24 pb-16 relative z-10" id="start-project">
                <div className="max-w-4xl mx-auto px-6 mb-12">
                    <div className="text-center">
                        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">Start a Project</h2>
                        <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">Tell us about your project. We will analyze your needs and provide a detailed proposal and timeline.</p>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto px-6 mb-20">
                    <form className="space-y-12" onSubmit={handleSubmit}>
                        <section className="relative z-40">
                            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6">1. What do you need?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {["customization", "new", "bugfix"].map((type) => (
                                    <label key={type} className="cursor-pointer group relative">
                                        <input type="radio" name="project_type" value={type} checked={selectedType === type} onChange={() => setSelectedType(type)} className="sr-only" />
                                        <div className={`h-full p-6 rounded-xl border transition-all duration-200 backdrop-blur-sm ${selectedType === type ? "bg-primary/5 border-primary shadow-[0_0_20px_rgba(var(--primary),0.15)]" : "bg-card/80 border-border hover:border-primary/50 hover:bg-secondary/50"}`}>
                                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${type === 'customization' ? 'bg-blue-500/10 text-blue-500' : type === 'new' ? 'bg-purple-500/10 text-purple-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {type === 'customization' ? <Wrench size={24} /> : type === 'new' ? <Sparkles size={24} /> : <Bug size={24} />}
                                            </div>
                                            <h3 className="font-bold text-foreground mb-2 capitalize">{type === 'new' ? 'New Project' : type === 'bugfix' ? 'Bug Fix / Help' : 'Item Customization'}</h3>
                                            <p className="text-xs text-muted-foreground leading-relaxed">{type === 'customization' ? 'Modify a template I purchased (e.g. change colors, add logo, install on server).' : type === 'new' ? 'Build a website or dashboard from scratch using your preferred stack.' : 'Fix an issue with my current website or get expert consultation.'}</p>
                                            {selectedType === type && (<div className="absolute top-4 right-4 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground"><Check size={12} strokeWidth={4} /></div>)}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </section>

                        <section className="relative z-30">
                            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6">2. Budget & Scope</h2>
                            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-8 shadow-sm">
                                <div className="mb-10">
                                    <div className="flex justify-between mb-4">
                                        <label className="text-sm font-bold text-foreground">Estimated Budget (USD)</label>
                                        <span className="text-primary font-bold text-xl">${budget} - ${budget + 500}</span>
                                    </div>
                                    <input type="range" min="50" max="5000" step="50" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary" />
                                    <div className="flex justify-between text-xs text-muted-foreground mt-2 font-medium"><span>$50</span><span>$5,000+</span></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <CustomSelect label="Deadline" options={["Flexible", "Within 3 days", "Within 1 week", "Within 1 month", "Urgent (24h)"]} value={deadline} onChange={setDeadline} />
                                    <CustomSelect label="Project Visibility" options={["Private (Invite Only)", "Public Job Board", "Featured Project"]} value={visibility} onChange={setVisibility} />
                                </div>
                            </div>
                        </section>

                        <section className="relative z-20">
                            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6">3. Project Details</h2>
                            <div className="space-y-4">
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Project Title (e.g. Install Interbroad on AWS Server)" className="w-full bg-card/80 backdrop-blur-sm border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50" />
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-40 bg-card/80 backdrop-blur-sm border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50 resize-none" placeholder="Describe your requirements in detail..."></textarea>
                                <div onClick={() => !isUploading && fileInputRef.current?.click()} className={`border border-dashed border-border rounded-lg p-8 text-center transition-colors cursor-pointer group relative bg-card/50 backdrop-blur-sm ${isUploading ? "opacity-70 cursor-wait bg-secondary/30" : "hover:bg-secondary/50"}`}>
                                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} />
                                    {isUploading ? (<div className="flex flex-col items-center justify-center"><Loader2 className="animate-spin text-primary mb-3" size={32} /><p className="text-sm text-foreground font-bold">Uploading...</p></div>) : attachment ? (<div className="flex flex-col items-center justify-center"><div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-500/20"><FileText size={20} /></div><p className="text-sm text-foreground font-bold mb-1 truncate max-w-[200px]">{attachment.name}</p><button onClick={removeAttachment} className="text-xs text-red-500 hover:text-red-600 font-bold flex items-center gap-1 mt-2 px-3 py-1 bg-red-500/10 rounded-full"><X size={12} /> Remove</button></div>) : (<><div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"><Upload className="text-muted-foreground group-hover:text-foreground" size={20} /></div><p className="text-sm text-foreground font-medium">Attach files (Images, PDF, Specs)</p><p className="text-xs text-muted-foreground mt-1">Max 10MB</p></>)}
                                </div>
                            </div>
                        </section>

                        <section className="relative z-10">
                            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6">4. Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2"><label className="text-xs font-bold uppercase text-muted-foreground">Name <span className="text-red-500">*</span></label><input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-card/80 backdrop-blur-sm border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50" placeholder="John Doe" /></div>
                                <div className="space-y-2"><label className="text-xs font-bold uppercase text-muted-foreground">Email <span className="text-red-500">*</span></label><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-card/80 backdrop-blur-sm border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50" placeholder="john@company.com" /></div>

                                {/* PHONE INPUT WITH COUNTRY SELECTOR */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-muted-foreground">Phone Number</label>
                                    <div className="flex gap-3 h-[50px]">
                                        <CountrySelect value={country} onChange={setCountry} />
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="flex-1 w-full h-full bg-card/80 backdrop-blur-sm border border-border rounded-lg px-4 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50"
                                            placeholder="(555) 000-0000"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2"><label className="text-xs font-bold uppercase text-muted-foreground">Company Name <span className="text-red-500">*</span></label><input type="text" required value={company} onChange={(e) => setCompany(e.target.value)} className="w-full bg-card/80 backdrop-blur-sm border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50" placeholder="Acme Inc." /></div>
                            </div>
                        </section>

                        <div className="border-t border-border pt-8 flex flex-col items-center">
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSubmitting || isUploading} className="w-full md:w-auto px-12 py-4 bg-primary cursor-pointer text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/25 transition-all text-lg mb-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">{isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Sending...</> : "Send Project Brief"}</motion.button>
                            <p className="text-xs text-muted-foreground flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>No payment required yet. Freelancer will review and accept.</p>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    );
}