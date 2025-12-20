"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Check, ChevronLeft, Wrench, Sparkles, Bug, ChevronDown } from "lucide-react";
import Link from "next/link";

// Layout Imports
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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

    // Close dropdown when clicking outside
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
        <div className="relative" ref={containerRef}>
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">{label}</label>

            {/* Trigger Button */}
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

            {/* Dropdown Menu */}
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
    // State for form interactions
    const [selectedType, setSelectedType] = useState("customization");
    const [budget, setBudget] = useState(1000);

    // Dropdown States
    const [deadline, setDeadline] = useState("Flexible");
    const [visibility, setVisibility] = useState("Private (Invite Only)");

    return (
        <main className="min-h-screen  text-foreground font-body transition-colors duration-300 flex flex-col">

            {/* --- GLOBAL BACKGROUND GRADIENTS --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-10" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-10" />
            </div>

            <TopBar />
            <Navbar />

            <div className="flex-grow pt-32 pb-16">

                {/* Header Section */}
                <div className="max-w-4xl mx-auto px-6 mb-12">

                    <div className="text-center">
                        <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                            Start a Project
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
                            Fill in the details below. Your funds will be held in secure escrow until the work is completed to your satisfaction.
                        </p>
                    </div>
                </div>

                {/* Form Container */}
                <div className="max-w-4xl mx-auto px-6">
                    <form className="space-y-12">

                        {/* SECTION 1: Project Type */}
                        <section>
                            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6">
                                1. What do you need?
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                <label className="cursor-pointer group relative">
                                    <input
                                        type="radio"
                                        name="project_type"
                                        value="customization"
                                        checked={selectedType === "customization"}
                                        onChange={() => setSelectedType("customization")}
                                        className="sr-only"
                                    />
                                    <div className={`
                                        h-full p-6 rounded-xl border transition-all duration-200
                                        ${selectedType === "customization"
                                        ? "bg-primary/5 border-primary shadow-[0_0_20px_rgba(var(--primary),0.15)]"
                                        : "bg-card border-border hover:border-primary/50 hover:bg-secondary/50"
                                    }
                                    `}>
                                        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 mb-4">
                                            <Wrench size={24} />
                                        </div>
                                        <h3 className="font-bold text-foreground mb-2">Item Customization</h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Modify a template I purchased (e.g. change colors, add logo, install on server).
                                        </p>
                                        <div className={`absolute top-4 right-4 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground transition-all duration-300 ${selectedType === "customization" ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                    </div>
                                </label>

                                <label className="cursor-pointer group relative">
                                    <input
                                        type="radio"
                                        name="project_type"
                                        value="new"
                                        checked={selectedType === "new"}
                                        onChange={() => setSelectedType("new")}
                                        className="sr-only"
                                    />
                                    <div className={`
                                        h-full p-6 rounded-xl border transition-all duration-200
                                        ${selectedType === "new"
                                        ? "bg-primary/5 border-primary shadow-[0_0_20px_rgba(var(--primary),0.15)]"
                                        : "bg-card border-border hover:border-primary/50 hover:bg-secondary/50"
                                    }
                                    `}>
                                        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500 mb-4">
                                            <Sparkles size={24} />
                                        </div>
                                        <h3 className="font-bold text-foreground mb-2">New Project</h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Build a website or dashboard from scratch using your preferred stack.
                                        </p>
                                        <div className={`absolute top-4 right-4 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground transition-all duration-300 ${selectedType === "new" ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                    </div>
                                </label>

                                <label className="cursor-pointer group relative">
                                    <input
                                        type="radio"
                                        name="project_type"
                                        value="bugfix"
                                        checked={selectedType === "bugfix"}
                                        onChange={() => setSelectedType("bugfix")}
                                        className="sr-only"
                                    />
                                    <div className={`
                                        h-full p-6 rounded-xl border transition-all duration-200
                                        ${selectedType === "bugfix"
                                        ? "bg-primary/5 border-primary shadow-[0_0_20px_rgba(var(--primary),0.15)]"
                                        : "bg-card border-border hover:border-primary/50 hover:bg-secondary/50"
                                    }
                                    `}>
                                        <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 mb-4">
                                            <Bug size={24} />
                                        </div>
                                        <h3 className="font-bold text-foreground mb-2">Bug Fix / Help</h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Fix an issue with my current website or get expert consultation.
                                        </p>
                                        <div className={`absolute top-4 right-4 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground transition-all duration-300 ${selectedType === "bugfix" ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                    </div>
                                </label>

                            </div>
                        </section>

                        {/* SECTION 2: Budget & Scope */}
                        <section>
                            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6">
                                2. Budget & Scope
                            </h2>
                            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">

                                {/* Budget Slider */}
                                <div className="mb-10">
                                    <div className="flex justify-between mb-4">
                                        <label className="text-sm font-bold text-foreground">Estimated Budget (USD)</label>
                                        <span className="text-primary font-bold text-xl">${budget} - ${budget + 500}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="50"
                                        max="5000"
                                        step="50"
                                        value={budget}
                                        onChange={(e) => setBudget(Number(e.target.value))}
                                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex justify-between text-xs text-muted-foreground mt-2 font-medium">
                                        <span>$50</span>
                                        <span>$5,000+</span>
                                    </div>
                                </div>

                                {/* Custom Dropdowns */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <CustomSelect
                                        label="Deadline"
                                        options={["Flexible", "Within 3 days", "Within 1 week", "Within 1 month", "Urgent (24h)"]}
                                        value={deadline}
                                        onChange={setDeadline}
                                    />
                                    <CustomSelect
                                        label="Project Visibility"
                                        options={["Private (Invite Only)", "Public Job Board", "Featured Project"]}
                                        value={visibility}
                                        onChange={setVisibility}
                                    />
                                </div>

                            </div>
                        </section>

                        {/* SECTION 3: Project Details */}
                        <section>
                            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6">
                                3. Project Details
                            </h2>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Project Title (e.g. Install DashLite on AWS Server)"
                                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50"
                                />

                                <textarea
                                    className="w-full h-40 bg-card border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50 resize-none"
                                    placeholder="Describe your requirements in detail..."
                                ></textarea>

                                {/* File Upload */}
                                <div className="border border-dashed border-border rounded-lg p-8 text-center hover:bg-secondary/50 transition-colors cursor-pointer group">
                                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                        <Upload className="text-muted-foreground group-hover:text-foreground" size={20} />
                                    </div>
                                    <p className="text-sm text-foreground font-medium">Attach files (Images, PDF, Specs)</p>
                                    <p className="text-xs text-muted-foreground mt-1">Max 10MB</p>
                                </div>
                            </div>
                        </section>

                        {/* Submit Area */}
                        <div className="border-t border-border pt-8 flex flex-col items-center">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full md:w-auto px-12 py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/25 transition-all text-lg mb-4"
                            >
                                Send Project Brief
                            </motion.button>
                            <p className="text-xs text-muted-foreground flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                No payment required yet. Freelancer will review and accept.
                            </p>
                        </div>

                    </form>
                </div>

            </div>

            <Footer />
        </main>
    );
}