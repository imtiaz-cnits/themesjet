// app/(website)/pricing/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PricingSection from "@/components/sections/pricing/PricingSection";
import TopBar from "@/components/layout/Topbar";

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-background">
            <TopBar />
            <Navbar />
            <div className="pt-20">
                <PricingSection />
            </div>
            <Footer />
        </main>
    );
}