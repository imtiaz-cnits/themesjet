"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, X, ChevronRight } from "lucide-react"; // Added Menu, X, ChevronRight
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion"; // Added Framer Motion

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // State for Mobile Menu
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => setMounted(true), []);

    // Handle Scroll
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock Body Scroll when Mobile Menu is Open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen]);

    // LOGIC: Determine if we need "Light Mode" colors
    const isLightTransparent = mounted && theme === 'light' && !isScrolled && !isMobileMenuOpen;

    // --- Dynamic Color Variables ---
    const logoTextFill = isLightTransparent ? "#0B0F19" : "white";

    const navLinkClass = isLightTransparent
        ? "text-gray-600 hover:text-[#0B0F19]"
        : "text-gray-400 hover:text-white";

    const homeLinkClass = isLightTransparent
        ? "text-[#0B0F19] font-bold"
        : "text-white font-medium";

    const iconClass = isLightTransparent
        ? "text-[#0B0F19] hover:text-primary"
        : "text-gray-400 hover:text-white";

    const buttonClass = isLightTransparent
        ? "bg-[#0B0F19] text-white hover:bg-primary"
        : "bg-white text-[#0B0F19] hover:bg-primary hover:text-white";

    const navbarBgClass = isScrolled
        ? "bg-[#0B0F19]/80 backdrop-blur-xl border-white/10 py-4 top-0"
        : "bg-transparent border-transparent py-6 top-[0px] lg:top-[40px]";

    // Mobile Menu Links Data
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Services", href: "/services" },
        { name: "Community", href: "/about" },
    ];

    if (!mounted) return null;

    return (
        <>
            <nav className={`fixed w-full z-40 transition-all duration-300 border-b ${navbarBgClass}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group z-50 max-w-[200px]">
                        <svg className="h-10 w-auto" viewBox="0 0 3006 542" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="251" cy="271.5" r="250.5" fill="white"/>
                            <path d="M409.282 77.0894C465.678 123.087 501.691 193.126 501.691 271.577C501.691 410.115 389.384 522.422 250.846 522.422C220.546 522.422 191.5 517.049 164.61 507.206C247.217 352.865 308.006 245.757 409.282 77.0894ZM250.846 20.731C310.833 20.731 365.901 41.7885 409.064 76.9136L361.028 103.322L297.854 215.249L337.845 118.552C308.255 138.099 295.262 152.525 276.734 182.735C210.621 299.868 182.24 364.209 133.119 383.973L88.582 462.877C87.3117 461.799 86.0521 460.708 84.8037 459.605L112.308 391.961C82.2086 403.206 64.942 407.079 37.541 403.643C13.7421 365.286 3.17389e-05 320.036 0 271.577C0 133.038 112.308 20.731 250.846 20.731Z" fill="url(#navbar_logo_gradient)"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M424.936 365.21C430.483 378.713 424.822 394.248 411.923 400.917L281.174 468.521L261.211 429.272L378.902 368.42L343.497 282.236L383.915 265.356L424.936 365.21Z" fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M64.3169 217.296C58.7696 204.068 64.4312 188.85 77.3301 182.317L208.079 116.093L228.042 154.541L110.351 214.151L145.756 298.576L105.338 315.111L64.3169 217.296Z" fill="white"/>
                            <path d="M262.456 288.361L295.631 257.064L301.845 325.476L285.26 364.865L262.456 288.361Z" fill="white"/>

                            <g className="fill-foreground">
                                <path d="M2218.55 445.637C2167.8 445.637 2134.13 425.237 2117.55 384.439L2175.26 355.581C2181.9 376.81 2198.15 387.424 2224.02 387.424C2245.58 387.424 2257.69 380.956 2260.34 368.02C2261.34 361.054 2257.69 355.415 2249.4 351.103C2241.11 346.791 2230.82 342.811 2218.55 339.162C2206.28 335.514 2194.17 331.201 2182.23 326.226C2170.29 320.919 2160.84 312.295 2153.87 300.354C2146.9 288.413 2144.91 273.652 2147.9 256.072C2152.21 232.853 2163.99 214.942 2183.22 202.337C2202.79 189.401 2224.69 182.933 2248.9 182.933C2270.46 182.933 2289.37 187.577 2305.62 196.864C2321.87 206.152 2333.82 219.088 2341.44 235.673L2283.73 264.53C2277.76 247.946 2264.99 239.653 2245.42 239.653C2226.18 239.653 2215.07 246.785 2212.08 261.048C2210.76 268.677 2214.07 274.647 2222.03 278.959C2230.33 283.271 2240.61 287.086 2252.88 290.403C2265.49 293.72 2277.76 297.866 2289.7 302.841C2301.97 307.485 2311.59 315.778 2318.56 327.719C2325.52 339.328 2327.35 354.42 2324.03 372.995C2319.72 397.209 2307.94 415.452 2288.7 427.725C2269.8 439.666 2246.41 445.637 2218.55 445.637Z" fill={isMobileMenuOpen ? (theme === 'dark' ? "white" : "#0B0F19") : logoTextFill}/>
                                <path d="M1901.92 219.254C1930.11 195.04 1962.62 182.933 1999.44 182.933C2036.26 182.933 2065.28 195.703 2086.51 221.244C2107.74 246.453 2114.87 277.467 2107.9 314.285C2107.24 321.582 2104.92 330.372 2100.94 340.655H1912.87C1914.19 356.576 1920.33 368.351 1931.28 375.981C1942.22 383.61 1955.99 387.424 1972.57 387.424C1997.45 387.424 2017.85 378.966 2033.77 362.049L2079.05 398.37C2051.18 429.881 2014.03 445.637 1967.6 445.637C1926.47 445.637 1895.12 432.535 1873.56 406.331C1852.33 380.127 1844.87 347.786 1851.17 309.309C1856.81 273.155 1873.73 243.136 1901.92 219.254ZM1921.82 290.403H2048.2C2047.87 273.486 2042.73 261.048 2032.77 253.087C2023.16 244.795 2010.72 240.648 1995.46 240.648C1978.87 240.648 1964.11 244.96 1951.18 253.584C1938.57 262.209 1928.79 274.481 1921.82 290.403Z" fill={isMobileMenuOpen ? (theme === 'dark' ? "white" : "#0B0F19") : logoTextFill}/>
                                <path d="M1736.43 182.933C1764.63 182.933 1786.02 192.386 1800.62 211.293C1815.54 230.2 1820.35 254.911 1815.05 285.427L1787.68 438.671H1723.5L1749.37 289.905C1752.02 274.979 1750.36 263.37 1744.39 255.077C1738.75 246.785 1729.3 242.638 1716.03 242.638C1688.17 242.638 1669.93 258.394 1661.3 289.905L1635.43 438.671H1571.25L1597.12 289.905C1599.77 274.979 1598.12 263.37 1592.15 255.077C1586.51 246.785 1577.22 242.638 1564.28 242.638C1549.69 242.638 1537.25 247.282 1526.97 256.57C1517.02 265.857 1510.55 279.457 1507.56 297.368L1482.69 438.671H1418.5L1462.29 189.899H1526.47L1521.99 214.776C1541.23 193.547 1565.28 182.933 1594.14 182.933C1624.65 182.933 1645.71 195.372 1657.32 220.249C1677.56 195.372 1703.93 182.933 1736.43 182.933Z" fill={isMobileMenuOpen ? (theme === 'dark' ? "white" : "#0B0F19") : logoTextFill}/>
                                <path d="M1191.07 219.254C1219.27 195.04 1251.77 182.933 1288.59 182.933C1325.41 182.933 1354.43 195.703 1375.66 221.244C1396.89 246.453 1404.02 277.467 1397.06 314.285C1396.39 321.582 1394.07 330.372 1390.09 340.655H1202.02C1203.35 356.576 1209.48 368.351 1220.43 375.981C1231.37 383.61 1245.14 387.424 1261.72 387.424C1286.6 387.424 1307 378.966 1322.92 362.049L1368.2 398.37C1340.34 429.881 1303.19 445.637 1256.75 445.637C1215.62 445.637 1184.27 432.535 1162.71 406.331C1141.48 380.127 1134.02 347.786 1140.32 309.309C1145.96 273.155 1162.88 243.136 1191.07 219.254ZM1210.97 290.403H1337.35C1337.02 273.486 1331.88 261.048 1321.93 253.087C1312.31 244.795 1299.87 240.648 1284.61 240.648C1268.03 240.648 1253.27 244.96 1240.33 253.584C1227.73 262.209 1217.94 274.481 1210.97 290.403Z" fill={isMobileMenuOpen ? (theme === 'dark' ? "white" : "#0B0F19") : logoTextFill}/>
                                <path d="M1024.3 182.933C1052.16 182.933 1073.72 192.221 1088.98 210.796C1104.24 229.371 1109.05 254.414 1103.41 285.925L1076.54 438.671H1012.36L1037.73 293.886C1040.72 276.969 1038.4 264.199 1030.77 255.575C1023.47 246.95 1012.36 242.638 997.431 242.638C982.173 242.638 968.739 247.116 957.13 256.072C945.852 265.028 937.891 278.627 933.248 296.871L908.37 438.671H844.187L905.385 90.3896H969.568L947.179 217.264C966.417 194.377 992.124 182.933 1024.3 182.933Z" fill={isMobileMenuOpen ? (theme === 'dark' ? "white" : "#0B0F19") : logoTextFill}/>
                                <path d="M870.04 90.3906L858.596 156.067H764.56L714.806 438.672H646.145L695.899 156.067H602.361L613.804 90.3906H870.04Z" fill={isMobileMenuOpen ? (theme === 'dark' ? "white" : "#0B0F19") : logoTextFill} />
                                <path d="M2496.71 88.7301C2505.66 80.7694 2515.61 76.7891 2526.56 76.7891C2537.51 76.7891 2546.13 80.7694 2552.43 88.7301C2559.07 96.6909 2561.55 105.978 2559.9 116.593C2558.24 127.539 2552.93 136.826 2543.97 144.455C2535.02 152.084 2524.9 155.899 2513.62 155.899C2502.68 155.899 2494.05 152.084 2487.75 144.455C2481.45 136.494 2479.13 127.207 2480.79 116.593C2482.44 105.647 2487.75 96.3592 2496.71 88.7301ZM2431.03 439.499L2475.81 185.751H2539.99L2495.21 439.499C2488.58 478.308 2475.15 505.507 2454.91 521.097C2435.01 536.686 2406.49 543.32 2369.34 540.999L2380.28 479.303C2409.47 481.293 2426.39 468.025 2431.03 439.499Z" fill={isMobileMenuOpen ? (theme === 'dark' ? "white" : "#0B0F19") : logoTextFill}/>
                                <path d="M2963.11 2.33496C2964.87 -1.27508 2970.22 -0.532666 2970.92 3.41895L2985.93 87.4043L2974.67 151.234L3006 204.409H2965.28L2941.15 341.152C2934.52 379.96 2921.09 407.159 2900.85 422.749C2885.36 434.884 2862.23 440.285 2838.08 441.106V441.491H2681.13C2640 441.491 2608.66 428.389 2587.1 402.186C2565.87 375.982 2558.41 343.641 2564.71 305.164C2570.35 269.009 2587.26 238.991 2615.46 215.108C2643.65 190.895 2676.16 178.787 2712.98 178.787C2749.79 178.787 2778.82 191.558 2800.05 217.099C2821.28 242.308 2828.41 273.321 2821.44 310.14C2820.78 317.437 2818.46 326.227 2814.48 336.509H2626.4C2627.73 352.43 2633.87 364.206 2644.81 371.835C2655.76 379.464 2669.52 383.278 2686.11 383.278C2710.52 383.278 2689.1 382.72 2829.79 382.699L2829.79 382.697C2873.32 382.697 2872.33 369.678 2876.97 341.152L2901.14 204.175H2860.88L2910.66 150.242L2921.75 87.4043L2963.11 2.33496ZM2709 236.503C2692.41 236.503 2677.65 240.815 2664.71 249.438C2652.11 258.062 2642.32 270.336 2635.36 286.257H2761.74C2761.4 269.341 2756.26 256.902 2746.31 248.941C2736.69 240.649 2724.25 236.503 2709 236.503Z" fill={isMobileMenuOpen ? (theme === 'dark' ? "white" : "#0B0F19") : logoTextFill}/>
                            </g>
                            <defs>
                                <linearGradient id="navbar_logo_gradient" x1="250.846" y1="20.731" x2="250.846" y2="522.422" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#2A8EFF"/>
                                    <stop offset="1" stopColor="#A74EFF"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-10 text-base font-medium font-body transition-colors duration-300">
                        <Link href="/" className={`${homeLinkClass} transition-colors`}>Home</Link>
                        <Link href="/products" className={`${navLinkClass} transition-colors`}>Products</Link>
                        <Link href="/services" className={`${navLinkClass} transition-colors`}>Services</Link>
                        <Link href="/about" className={`${navLinkClass} transition-colors`}>Community</Link>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4 sm:gap-6 z-50">

                        {/* Hamburger Button (Visible on Mobile) */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`lg:hidden p-2 rounded-full transition-colors ${isMobileMenuOpen ? 'text-foreground bg-accent' : iconClass}`}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        <button className={`hidden md:flex ${iconClass} transition-colors`}>
                            <Search size={22} />
                        </button>

                        <button className={`relative ${iconClass} transition-colors`}>
                            <ShoppingBag size={22} />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold flex items-center justify-center rounded-full ring-2 ring-[#0B0F19]">2</span>
                        </button>

                        <div className={`h-6 w-px hidden sm:block ${isLightTransparent ? 'bg-black/10' : 'bg-white/10'}`}></div>

                        <Link
                            href="/services"
                            className={`hidden sm:flex items-center gap-2 px-6 py-2.5 font-bold text-sm rounded-full transition-all shadow-md font-heading ${buttonClass}`}
                        >
                            Hire Us
                        </Link>
                    </div>
                </div>
            </nav>

            {/* --- FULL SCREEN MOBILE MENU OVERLAY --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-30 bg-background/95 backdrop-blur-3xl pt-24 px-6 flex flex-col lg:hidden"
                    >
                        {/* Background Gradients */}
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] -z-10" />
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px] -z-10" />

                        <div className="flex flex-col gap-2 mt-8">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="group flex items-center justify-between py-5 border-b border-border text-2xl font-bold font-heading text-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                        <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-primary" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile Actions Footer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-auto mb-10 flex flex-col gap-4"
                        >
                            <Link
                                href="/services"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 font-heading text-lg"
                            >
                                Hire Us Today
                            </Link>

                            <div className="flex items-center justify-center gap-6 mt-4 text-muted-foreground">
                                <button className="flex items-center gap-2 hover:text-foreground transition-colors">
                                    <Search size={20} /> Search
                                </button>
                                <div className="h-4 w-px bg-border"></div>
                                <span className="text-sm">Themes Jet Agency © 2025</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}