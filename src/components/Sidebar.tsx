import React, { useState, useEffect } from 'react';
import { Star, ChevronRight, Zap, Clock } from 'lucide-react';
import axios from 'axios';

const Sidebar = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/blog').then(res => setPosts(res.data)).catch(() => {});
  }, []);

  return (
    <aside className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          Top Hosting Picks
        </h3>
        <div className="space-y-4">
          {[
            { name: 'Bluehost', deal: '75% OFF + Free Domain', link: 'https://webseotrends.com/deals/black-friday-web-hosting-deals/' },
            { name: 'Hostinger', deal: 'Up to 80% OFF', link: 'https://webseotrends.com/deals/black-friday-web-hosting-deals/' },
            { name: 'SiteGround', deal: 'Special 73% Discount', link: 'https://webseotrends.com/deals/black-friday-web-hosting-deals/' },
            { name: 'Cloudways', deal: '3 Days Free Trial', link: 'https://webseotrends.com/deals/black-friday-web-hosting-deals/' }
          ].map((host, i) => (
            <div key={i} className="group p-4 rounded-xl border border-slate-50 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-800">{host.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
              </div>
              <p className="text-xs text-indigo-600 font-semibold mb-3">{host.deal}</p>
              <a href={host.link} className="block text-center bg-white border border-slate-200 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">
                Claim Deal
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-indigo-600 rounded-2xl p-6 text-white overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">Need Better Hosting?</h3>
          <p className="text-indigo-100 text-sm mb-6">Switch to our top-rated provider and get a free migration service.</p>
          <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
            See Comparisons
          </button>
        </div>
        <Zap className="absolute -bottom-4 -right-4 w-32 h-32 text-indigo-500 opacity-20 rotate-12" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Recent from Blog</h3>
        <div className="space-y-6">
          {posts.map((post, i) => (
            <a key={i} href={post.link} target="_blank" rel="noopener noreferrer" className="group block">
              <h4 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
                {post.title}
              </h4>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                <Clock className="w-3 h-3" />
                {new Date(post.pubDate).toLocaleDateString()}
              </div>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
