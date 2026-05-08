import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { ArrowLeft } from 'lucide-react';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Placeholder — in future, fetch from CMS or static data
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <Navigation theme="learn" />
      <SEOHead
        title={`${slug?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} | PureCreativity Blog`}
        description="An article from PureCreativity — insights on tech, music, media, and business for entrepreneurs."
        path={`/blog/${slug}`}
      />

      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-3xl">
          {/* Back Link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          {/* Article Header */}
          <h1 className="text-3xl md:text-5xl font-afro font-bold tracking-tight mb-6 leading-tight">
            {slug?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </h1>

          <div className="flex items-center gap-4 text-zinc-500 text-sm mb-12 pb-6 border-b border-white/10">
            <span>PureCreativity Team</span>
            <span>·</span>
            <span>Coming Soon</span>
          </div>

          {/* Placeholder Body */}
          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8 md:p-12 text-center">
              <p className="text-zinc-400 text-lg mb-4">
                This article is coming soon.
              </p>
              <p className="text-zinc-500 text-sm">
                We're crafting something valuable. Check back soon or{' '}
                <Link to="/" className="text-amber-400 hover:underline">
                  explore the hub
                </Link>{' '}
                in the meantime.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer theme="learn" />
    </div>
  );
};

export default BlogPost;
