import { getPostBySlug } from "@/actions/insights";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Twitter, Linkedin, Facebook, Share2 } from "lucide-react";
import { format } from "date-fns";
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default async function InsightDetailsPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

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

                {/* Back Link */}
                <div className="max-w-4xl mx-auto px-6 mb-8">
                    <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft size={16} /> Back to Insights
                    </Link>
                </div>

                {/* Article Header */}
                <header className="max-w-4xl mx-auto px-6 mb-12 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-6">
                        <span className="text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">{post.category}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {format(new Date(post.createdAt), "MMM dd, yyyy")}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center font-bold text-muted-foreground">
                            {post.author.charAt(0)}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-foreground">{post.author}</p>
                            <p className="text-xs text-muted-foreground">Author @ Themes Jet</p>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="max-w-5xl mx-auto px-6 mb-16">
                    <div className="aspect-[21/9] bg-muted rounded-3xl border border-border overflow-hidden shadow-2xl relative">
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${post.coverImage}')` }} />
                    </div>
                </div>

                {/* Content Layout */}
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Social Share (Sticky) */}
                    <div className="hidden lg:block lg:col-span-2">
                        <div className="sticky top-32 flex flex-col gap-4 items-center">
                            <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Share</p>
                            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all"><Twitter size={18} /></button>
                            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-blue-600 hover:text-blue-600 transition-all"><Linkedin size={18} /></button>
                            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-blue-500 hover:text-blue-500 transition-all"><Facebook size={18} /></button>
                        </div>
                    </div>

                    {/* Article Content */}
                    <article className="lg:col-span-8">
                        {/* Intro Excerpt */}
                        <p className="text-xl text-muted-foreground font-medium mb-8 leading-relaxed">
                            {post.excerpt}
                        </p>

                        {/* Main HTML Content */}
                        <div
                            className="prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-a:text-primary hover:prose-a:underline max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        <hr className="border-border my-12" />

                        {/* CTA */}
                        <div className="bg-secondary/50 border border-border rounded-2xl p-8 text-center">
                            <h3 className="text-2xl font-bold text-foreground mb-2">Build Faster with Themes Jet</h3>
                            <p className="text-muted-foreground mb-6">Save months of development time with our premium Next.js templates.</p>
                            <Link href="/products" className="inline-block px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                Explore Templates
                            </Link>
                        </div>
                    </article>

                    {/* Right Sidebar (Optional placeholder for now) */}
                    <div className="hidden lg:block lg:col-span-2" />
                </div>
            </div>

            <Footer />
        </main>
    );
}