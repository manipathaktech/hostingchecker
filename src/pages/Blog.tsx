import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Clock, ArrowRight } from 'lucide-react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/blog')
      .then(res => setPosts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <Helmet>
        <title>Hosting & SEO Blog | Hosting Checker</title>
        <meta name="description" content="Latest hosting reviews, comparisons, and SEO tips from the Hosting Checker team at WebSEOTrends." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4 mb-12">
              <h1 className="text-4xl font-extrabold text-slate-900">Hosting & SEO Insights</h1>
              <p className="text-lg text-slate-500">Expert advice on choosing the right hosting and growing your online presence.</p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 animate-pulse space-y-4">
                    <div className="h-48 bg-slate-100 rounded-2xl w-full"></div>
                    <div className="h-6 bg-slate-100 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post, i) => (
                  <article key={i} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                    <div className="p-8 flex-1 space-y-4">
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                        <Clock className="w-3 h-3" />
                        {new Date(post.pubDate).toLocaleDateString()}
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">
                        {post.contentSnippet}
                      </p>
                    </div>
                    <div className="px-8 pb-8">
                      <a 
                        href={post.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                      >
                        Read Article <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
