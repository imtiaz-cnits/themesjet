import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import { Search, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import HeroSection from "@/components/sections/home/HeroSection";
import PopularProducts from "@/components/sections/home/PopularProducts";
import BrowseCategories from "@/components/sections/home/BrowseCategories";
import ServiceSection from "@/components/sections/home/ServiceSection";
import Advantages from "@/components/sections/home/Advantages";
import WordPressEcosystem from "@/components/sections/home/WordPressEcosystem";
import FreshFromLab from "@/components/sections/home/FreshFromLab";
import Testimonials from "@/components/sections/home/Testimonials";
import ThemeStoreCTA from "@/components/sections/home/ThemeStoreCTA";
import Footer from "@/components/layout/Footer";
import { getPopularProducts, getLatestProducts } from "@/actions/product";
import { getFeaturedReviews } from "@/actions/review";

// Set Revalidation (Optional: updates cache every hour)
export const revalidate = 3600;

export default async function Home() {
    // 1. Fetch Data Parallelly for performance
    const [rawPopular, rawLatest, featuredReviews] = await Promise.all([
        getPopularProducts(),
        getLatestProducts(),
        getFeaturedReviews()
    ]);

    // 2. Data Transformation (Decimal -> Number)
    const popularProducts = rawPopular.map((product) => ({
        ...product,
        price: Number(product.price),
        tags: product.tags ? String(product.tags) : "",
    }));

    const latestProducts = rawLatest.map((product) => ({
        ...product,
        price: Number(product.price),
        tags: product.tags ? String(product.tags) : "",
    }));

    return (
        <main className="min-h-screen bg-background text-foreground font-body selection:bg-primary/30 overflow-x-hidden transition-colors duration-300">

            {/* 1. Global Navigation */}
            <TopBar />
            <Navbar />

            {/* 2. HERO SECTION */}
            <HeroSection />

            {/* STATS STRIP */}
            <div className="border-y mb-10 border-border bg-card/30 backdrop-blur-md relative z-10">
                <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap justify-center md:justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-bold text-foreground font-heading">500+</h3>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest font-body">Premium Assets</p>
                    </div>
                    <div className="h-10 w-px bg-border hidden md:block"></div>
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-bold text-foreground font-heading">24/7</h3>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest font-body">Dedicated Support</p>
                    </div>
                    <div className="h-10 w-px bg-border hidden md:block"></div>
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-bold text-foreground font-heading">10k+</h3>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest font-body">Happy Developers</p>
                    </div>
                    <div className="h-10 w-px bg-border hidden md:block"></div>

                    {/* Logos */}
                    <div className="flex gap-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="h-8 w-24 bg-foreground/20 rounded"></div>
                        <div className="h-8 w-24 bg-foreground/20 rounded"></div>
                        <div className="h-8 w-24 bg-foreground/20 rounded"></div>
                    </div>
                </div>
            </div>

            {/* 3. POPULAR PRODUCTS SECTION */}
            <PopularProducts products={popularProducts} />
            <BrowseCategories />
            <ServiceSection />
            <Advantages />
            <WordPressEcosystem />
            <FreshFromLab products={latestProducts} />
            <Testimonials reviews={featuredReviews} />
            <ThemeStoreCTA />

            <Footer />
        </main>
    );
}