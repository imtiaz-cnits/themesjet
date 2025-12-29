import { getPosts, getFeaturedPost } from "@/actions/insights";
import InsightsClient from "@/components/insights/InsightsClient";
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Revalidate every hour (ISR)
export const revalidate = 3600;

export default async function InsightsPage() {
    const { posts, totalPages } = await getPosts(1); // Fetch page 1
    const featuredPost = await getFeaturedPost();

    return (
        <main className="min-h-screen bg-background text-foreground font-body transition-colors duration-300 flex flex-col relative overflow-x-hidden">
            {/* Backgrounds */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-10" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-10" />
            </div>

            <TopBar />
            <Navbar />

            <div className="flex-grow pt-32 pb-20 relative z-10">
                <InsightsClient
                    initialPosts={posts}
                    totalPages={totalPages}
                    featuredPost={featuredPost}
                />
            </div>

            <Footer />
        </main>
    );
}