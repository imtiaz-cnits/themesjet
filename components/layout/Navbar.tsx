"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    // We keep 'theme' to adjust colors based on Light/Dark mode,
    // but we removed 'setTheme' since the switcher is no longer here.
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // LOGIC: Determine if we need "Light Mode" colors (Dark text/logo)
    // We only use dark text if:
    // 1. The theme is 'light'
    // 2. AND we haven't scrolled down yet (background is transparent)
    const isLightTransparent = mounted && theme === 'light' && !isScrolled;

    // --- Dynamic Color Variables ---

    // Logo Text: Black in light mode transparent, otherwise White
    const logoTextFill = isLightTransparent ? "#0B0F19" : "white";

    // Nav Links: Dark in light mode transparent, otherwise Light Gray/White
    const navLinkClass = isLightTransparent
        ? "text-gray-600 hover:text-[#0B0F19]"
        : "text-gray-400 hover:text-white";

    // Active "Home" Link: Explicitly Black in light mode, White otherwise
    const homeLinkClass = isLightTransparent
        ? "text-[#0B0F19] font-bold"
        : "text-white font-medium";

    // Icons: Dark in light mode transparent, otherwise Gray/White
    const iconClass = isLightTransparent
        ? "text-[#0B0F19] hover:text-primary"
        : "text-gray-400 hover:text-white";

    // Button: Black BG in light mode (for contrast), otherwise White BG
    const buttonClass = isLightTransparent
        ? "bg-[#0B0F19] text-white hover:bg-primary"
        : "bg-white text-[#0B0F19] hover:bg-primary hover:text-white";

    // Navbar Background
    const navbarBgClass = isScrolled
        ? "bg-[#0B0F19]/80 backdrop-blur-xl border-white/10 py-4 top-0"
        : "bg-transparent border-transparent py-6 top-[40px]";

    if (!mounted) return null; // Avoid hydration mismatch on initial load

    return (
        <nav className={`fixed w-full z-40 transition-all duration-300 border-b ${navbarBgClass}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <svg
                        className="h-10 w-auto"
                        viewBox="0 0 844 153"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Icon Body (Gradient) - Always stays same */}
                        <path d="M114.914 21.6459C130.748 34.5607 140.86 54.2248 140.86 76.2513C140.86 115.149 109.328 146.681 70.4307 146.681C61.9239 146.681 53.7692 145.173 46.2197 142.41C69.4131 99.0757 86.4792 69.0021 114.914 21.6459ZM70.4307 5.82068C87.2729 5.82075 102.734 11.7334 114.853 21.5951L101.366 29.0101L83.6289 60.4359L94.8574 33.2855C86.5495 38.7738 82.9013 42.8249 77.6992 51.307C59.1366 84.1946 51.1677 102.26 37.376 107.809L24.8711 129.962C24.5145 129.659 24.161 129.353 23.8105 129.043L31.5332 110.052C23.082 113.209 18.2339 114.294 10.54 113.329C3.85869 102.56 6.05804e-05 89.8566 0 76.2513C0 37.3537 31.5331 5.82068 70.4307 5.82068Z" fill="url(#paint0_linear_622_61)"/>

                        {/* Icon White Details */}
                        <path fillRule="evenodd" clipRule="evenodd" d="M119.31 102.541C120.868 106.332 119.278 110.694 115.656 112.566L78.9458 131.547L73.3407 120.527L106.385 103.442L96.4441 79.2439L107.792 74.5047L119.31 102.541Z" fill="white"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.0583 61.0105C16.5007 57.2966 18.0904 53.0238 21.712 51.1895L58.4225 32.5957L64.0276 43.3908L30.9833 60.1276L40.9242 83.8318L29.5758 88.4743L18.0583 61.0105Z" fill="white"/>
                        <path d="M73.69 80.9637L83.0046 72.1762L84.7493 91.3845L80.0927 102.444L73.69 80.9637Z" fill="white"/>

                        {/* TEXT PATHS: Dynamically colored via logoTextFill variable */}
                        <path d="M622.906 125.122C608.657 125.122 599.204 119.395 594.548 107.939L610.753 99.8371C612.615 105.797 617.179 108.778 624.443 108.778C630.496 108.778 633.896 106.962 634.641 103.33C634.92 101.374 633.896 99.7905 631.567 98.5798C629.239 97.3691 626.352 96.2516 622.906 95.2271C619.46 94.2027 616.061 92.992 612.708 91.595C609.356 90.1049 606.701 87.6835 604.746 84.3308C602.79 80.9781 602.231 76.8337 603.069 71.8978C604.28 65.3786 607.586 60.3495 612.988 56.8106C618.483 53.1784 624.629 51.3624 631.428 51.3624C637.481 51.3624 642.79 52.6662 647.353 55.2739C651.917 57.8816 655.269 61.5137 657.411 66.1702L641.207 74.2726C639.53 69.6161 635.945 67.2878 630.45 67.2878C625.048 67.2878 621.928 69.2901 621.09 73.2948C620.718 75.4368 621.649 77.1131 623.884 78.3238C626.212 79.5345 629.099 80.6055 632.545 81.5369C636.084 82.4682 639.53 83.6323 642.883 85.0293C646.329 86.3331 649.03 88.6614 650.985 92.0141C652.941 95.2737 653.453 99.5111 652.522 104.726C651.311 111.525 648.005 116.647 642.604 120.093C637.295 123.446 630.729 125.122 622.906 125.122Z" fill={logoTextFill}/>
                        <path d="M534.006 61.5602C541.922 54.7617 551.049 51.3624 561.386 51.3624C571.724 51.3624 579.873 54.9479 585.833 62.119C591.793 69.197 593.796 77.9047 591.84 88.2423C591.654 90.2912 591.002 92.7591 589.884 95.6462H537.079C537.452 100.116 539.174 103.423 542.248 105.565C545.321 107.707 549.186 108.778 553.843 108.778C560.827 108.778 566.555 106.403 571.025 101.653L583.738 111.851C575.915 120.698 565.484 125.122 552.446 125.122C540.897 125.122 532.096 121.443 526.043 114.086C520.083 106.729 517.987 97.6485 519.757 86.8453C521.34 76.694 526.09 68.2657 534.006 61.5602ZM539.594 81.5369H575.076C574.983 76.7872 573.54 73.2948 570.746 71.0596C568.045 68.7313 564.553 67.5672 560.269 67.5672C555.612 67.5672 551.468 68.7779 547.836 71.1993C544.297 73.6207 541.549 77.0666 539.594 81.5369Z" fill={logoTextFill}/>
                        <path d="M487.541 51.3624C495.458 51.3624 501.464 54.0166 505.562 59.3251C509.753 64.6336 511.104 71.5718 509.613 80.1399L501.93 123.166H483.909L491.173 81.3972C491.919 77.2063 491.453 73.9467 489.776 71.6184C488.193 69.2901 485.539 68.126 481.814 68.126C473.991 68.126 468.869 72.5497 466.447 81.3972L459.183 123.166H441.162L448.426 81.3972C449.171 77.2063 448.706 73.9467 447.029 71.6184C445.446 69.2901 442.838 68.126 439.206 68.126C435.109 68.126 431.616 69.4298 428.729 72.0375C425.935 74.6452 424.119 78.4635 423.281 83.4926L416.296 123.166H398.275L410.569 53.3181H428.589L427.332 60.303C432.734 54.3426 439.486 51.3624 447.588 51.3624C456.156 51.3624 462.07 54.8548 465.33 61.8396C471.011 54.8548 478.415 51.3624 487.541 51.3624Z" fill={logoTextFill}/>
                        <path d="M334.42 61.5602C342.336 54.7617 351.463 51.3624 361.8 51.3624C372.138 51.3624 380.287 54.9479 386.247 62.119C392.208 69.197 394.21 77.9047 392.254 88.2423C392.068 90.2912 391.416 92.7591 390.298 95.6462H337.493C337.866 100.116 339.589 103.423 342.662 105.565C345.735 107.707 349.6 108.778 354.257 108.778C361.241 108.778 366.969 106.403 371.439 101.653L384.152 111.851C376.329 120.698 365.898 125.122 352.86 125.122C341.311 125.122 332.511 121.443 326.457 114.086C320.497 106.729 318.401 97.6485 320.171 86.8453C321.754 76.694 326.504 68.2657 334.42 61.5602ZM340.008 81.5369H375.491C375.397 76.7872 373.954 73.2948 371.16 71.0596C368.459 68.7313 364.967 67.5672 360.683 67.5672C356.026 67.5672 351.882 68.7779 348.25 71.1993C344.711 73.6207 341.963 77.0666 340.008 81.5369Z" fill={logoTextFill}/>
                        <path d="M287.594 51.3625C295.417 51.3625 301.471 53.9702 305.755 59.1855C310.039 64.4008 311.389 71.4322 309.806 80.2797L302.262 123.167H284.241L291.366 82.5148C292.204 77.7652 291.552 74.1796 289.41 71.7582C287.361 69.3368 284.241 68.1261 280.05 68.1261C275.766 68.1261 271.995 69.3834 268.735 71.8979C265.569 74.4124 263.333 78.2308 262.03 83.353L255.045 123.167H237.024L254.207 25.3789H272.227L265.941 61.0016C271.343 54.5755 278.56 51.3625 287.594 51.3625Z" fill={logoTextFill}/>
                        <path d="M244.283 25.3792L241.07 43.8191H214.667L200.697 123.167H181.419L195.389 43.8191H169.126L172.339 25.3792H244.283Z" fill={logoTextFill}/>
                        <path d="M701.005 24.913C703.52 22.6778 706.313 21.5602 709.387 21.5602C712.46 21.5602 714.882 22.6778 716.651 24.913C718.514 27.1481 719.212 29.7558 718.746 32.736C718.281 35.8093 716.791 38.417 714.276 40.559C711.762 42.701 708.921 43.772 705.755 43.772C702.681 43.772 700.26 42.701 698.49 40.559C696.721 38.3238 696.069 35.7162 696.535 32.736C697 29.6626 698.49 27.055 701.005 24.913ZM682.565 123.399L695.138 52.1538H713.159L700.586 123.399C698.723 134.295 694.951 141.932 689.27 146.309C683.683 150.686 675.673 152.549 665.243 151.897L668.316 134.575C676.512 135.134 681.261 131.408 682.565 123.399Z" fill={logoTextFill}/>
                        <path d="M831.959 0.655394C832.452 -0.358093 833.954 -0.149384 834.152 0.960081L838.366 24.5411L835.203 42.463L844 57.3927H832.568L825.793 95.7863C823.93 106.682 820.158 114.319 814.477 118.696C810.128 122.103 803.634 123.618 796.852 123.849V123.958H752.787C741.239 123.958 732.437 120.279 726.384 112.922C720.424 105.565 718.328 96.4846 720.098 85.6818C721.681 75.5306 726.431 67.102 734.347 60.3966C742.263 53.598 751.39 50.1984 761.727 50.1984C772.065 50.1984 780.214 53.7841 786.175 60.9552C792.135 68.033 794.137 76.7409 792.182 87.0782C791.995 89.1271 791.343 91.5955 790.225 94.4825H737.42C737.792 98.9526 739.516 102.259 742.589 104.401C745.662 106.542 749.527 107.613 754.183 107.613C761.037 107.613 755.025 107.458 794.523 107.452L794.524 107.45C806.748 107.45 806.469 103.795 807.772 95.7863L814.559 57.3263H803.255L817.231 42.1827L820.345 24.5411L831.959 0.655394ZM760.609 66.4034C755.953 66.4035 751.809 67.614 748.177 70.0353C744.638 72.4567 741.89 75.9029 739.934 80.3732H775.418C775.325 75.6235 773.881 72.1308 771.087 69.8956C768.386 67.5675 764.893 66.4034 760.609 66.4034Z" fill={logoTextFill}/>
                        <defs>
                            <linearGradient id="paint0_linear_622_61" x1="70.4302" y1="5.82068" x2="70.4302" y2="146.681" gradientUnits="userSpaceOnUse">
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
                <div className="flex items-center gap-6">

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
    );
}