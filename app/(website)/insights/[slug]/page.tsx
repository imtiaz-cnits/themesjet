import { getPostBySlug, getRelatedPosts } from "@/actions/insights";
import { prisma } from "@/lib/prisma"; // Import prisma directly to fetch user image
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShareButtons from "@/components/insights/ShareButtons";
import TableOfContents from "@/components/insights/TableOfContents";

function processContent(html: string) {
    const headings: { id: string; text: string }[] = [];
    const modifiedHtml = html.replace(/<h2[^>]*>(.*?)<\/h2>/g, (match, title) => {
        const id = title.toLowerCase().replace(/<[^>]*>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
        headings.push({ id, text: title.replace(/<[^>]*>/g, "") });
        return `<h2 id="${id}" class="scroll-mt-32">${title}</h2>`;
    });
    return { modifiedHtml, headings };
}

// Helper to get real author image
async function getAuthorImage(authorName: string) {
    try {
        const user = await prisma.user.findFirst({
            where: { name: authorName },
            select: { image: true }
        });
        return user?.image || null;
    } catch (e) {
        return null;
    }
}

export default async function InsightDetailsPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = await getRelatedPosts(post.slug, 3);
    const { modifiedHtml, headings } = processContent(post.content);

    // FIX: Try to get real DB image, otherwise fallback to UI Avatar
    const dbImage = await getAuthorImage(post.author);
    const authorAvatarUrl = dbImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=random&color=fff&size=128`;

    return (
        <main className="min-h-screen bg-background text-foreground font-body transition-colors duration-300 flex flex-col relative">

            {/* Backgrounds */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
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

                {/* Header */}
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
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border">
                            <Image src={authorAvatarUrl} alt={post.author} fill className="object-cover" />
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
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative mb-16">

                    {/* Left: Sticky Share */}
                    <div className="hidden lg:block lg:col-span-2">
                        <div className="sticky top-32">
                            <ShareButtons title={post.title} slug={post.slug} />
                        </div>
                    </div>

                    {/* Center: Article Text */}
                    <article className="lg:col-span-8 min-w-0">
                        <p className="text-xl text-muted-foreground font-medium mb-8 leading-relaxed border-l-4 border-primary pl-6 italic">
                            {post.excerpt}
                        </p>

                        <div
                            className="
                                prose prose-lg dark:prose-invert max-w-none
                                prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground
                                prose-p:text-muted-foreground prose-p:leading-relaxed
                                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ul]:space-y-2
                                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_ol]:space-y-2
                                [&_li]:text-muted-foreground [&_li]:leading-relaxed
                                [&_h2]:text-2xl [&_h2]:font-heading [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-4 [&_h2]:mt-12
                                [&_h3]:text-xl [&_h3]:font-heading [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mb-3 [&_h3]:mt-8
                                [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-foreground [&_blockquote]:my-8
                                [&_img]:rounded-2xl [&_img]:shadow-lg [&_img]:border [&_img]:border-border [&_img]:my-10
                                [&_pre]:bg-secondary [&_pre]:border [&_pre]:border-border [&_pre]:text-sm [&_pre]:rounded-xl [&_pre]:p-6
                            "
                            dangerouslySetInnerHTML={{ __html: modifiedHtml }}
                        />

                        <hr className="border-border my-12" />
                    </article>

                    {/* Right: Sticky TOC */}
                    <div className="hidden lg:block lg:col-span-2">
                        <div className="sticky top-32">
                            <TableOfContents headings={headings} />
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="max-w-4xl mx-auto px-6 mb-24 relative z-10">
                    <div className="bg-secondary/50 border border-border rounded-2xl p-10 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                        <h3 className="text-2xl font-bold text-foreground mb-3">Ready to Ship Faster?</h3>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            Save months of development time with our premium Next.js templates. Built for performance and scale.
                        </p>
                        <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                            Explore Templates <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* Related Insights */}
                {relatedPosts.length > 0 && (
                    <div className="max-w-7xl mx-auto px-6 mt-12 border-t border-border pt-16">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-heading font-bold text-foreground">Related Insights</h2>
                            <Link href="/insights" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                                View All <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {relatedPosts.map((rPost) => (
                                <Link key={rPost.id} href={`/insights/${rPost.slug}`} className="group block h-full flex flex-col">
                                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted mb-4 relative border border-border">
                                        <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${rPost.coverImage})` }} />
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                            <span className="text-primary font-bold">{rPost.category}</span>
                                            <span>•</span>
                                            <span>{rPost.readTime}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                            {rPost.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                            {rPost.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            <Footer />
        </main>
    );
}