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
import StatsStrip from "@/components/sections/home/StatsStrip";

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
            <HeroSection />
            <StatsStrip />
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