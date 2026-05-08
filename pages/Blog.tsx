import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import ScrollReveal from '../components/ScrollReveal';
import { ArrowRight, Clock, Tag } from 'lucide-react';

// Placeholder blog posts — user will replace with real content
const posts = [
  {
    slug: 'stop-guessing-start-building',
    title: 'Stop Guessing, Start Building: The 3-Step Framework',
    excerpt: 'Most side hustlers stall not because of talent, but because of decision paralysis. Here\'s the system we use to get clients from idea to revenue in 90 days.',
    date: '2026-05-01',
    readTime: '6 min read',
    category: 'Business',
    categoryColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  },
  {
    slug: 'ai-content-workflow',
    title: 'The AI Content Workflow That Saves 10 Hours a Week',
    excerpt: 'We built an automated content pipeline using AI tools that turns one idea into 12 pieces of content. Here\'s the exact stack and process.',
    date: '2026-04-22',
    readTime: '8 min read',
    category: 'Tech',
    categoryColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
  },
  {
    slug: 'sonic-branding-101',
    title: 'Sonic Branding 101: Why Your Brand Needs a Sound',
    excerpt: 'Your audience recognizes Netflix, Apple, and HBO by sound alone. Here\'s how small brands can build the same audio identity on a budget.',
    date: '2026-04-15',
    readTime: '5 min read',
    category: 'Music',
    categoryColor: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/30',
  },
  {
    slug: 'content-that-converts',
    title: 'Content That Converts: The Visual Framework',
    excerpt: 'Beautiful content gets likes. Strategic content gets clients. Learn the visual framework that turns your social media into a lead engine.',
    date: '2026-04-08',
    readTime: '7 min read',
    category: 'Media',
    categoryColor: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
  },
  {
    slug: 'automation-stack-2026',
    title: 'The 2026 Automation Stack Every Creator Needs',
    excerpt: 'From email sequences to social scheduling to CRM — here are the exact tools and automations running behind the scenes at PureCreativity.',
    date: '2026-03-28',
    readTime: '10 min read',
    category: 'Tech',
    categoryColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
  },
];

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <Navigation theme="learn" />
      <SEOHead
        title="Blog — Insights & Guides | PureCreativity"
        description="Actionable insights on tech, music, media, and business for entrepreneurs and creators. Learn the systems behind the scenes."
        path="/blog"
      />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <ScrollReveal direction="up" distance={25}>
            <div className="inline-block border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 rounded-full text-[11px] font-mono tracking-[0.2em] uppercase text-amber-400 mb-6">
              Insights & Guides
            </div>
            <h1 className="text-4xl md:text-6xl font-afro font-bold tracking-tight mb-4">
              The Blog
            </h1>
            <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Actionable frameworks, behind-the-scenes breakdowns, and the strategies we use to help creators and entrepreneurs build momentum.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post, i) => (
              <ScrollReveal key={post.slug} direction="up" delay={i * 0.08} blur={4} distance={20}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block border border-white/5 rounded-xl bg-white/[0.02] p-6 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 hover:-translate-y-1 h-full"
                >
                  {/* Category + Meta */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border ${post.categoryColor}`}>
                      <Tag size={10} />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-zinc-500 text-[11px]">
                      <Clock size={10} />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors leading-tight">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase">
                    Read Article
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Date */}
                  <div className="mt-4 pt-3 border-t border-white/5 text-zinc-600 text-[11px] font-mono">
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer theme="learn" />
    </div>
  );
};

export default Blog;
