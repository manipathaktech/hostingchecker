import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Globe, 
  Server, 
  MapPin, 
  Network, 
  FileText, 
  Download, 
  ChevronRight, 
  Info,
  CheckCircle2,
  AlertCircle,
  Layout,
  Zap,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { useTranslation, Trans } from 'react-i18next';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Sidebar from '../components/Sidebar';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Home = () => {
  const { t } = useTranslation();
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const reportRef = useRef<HTMLDivElement>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await axios.get(`/api/lookup?domain=${encodeURIComponent(domain)}`);
      setResult(res.data);
    } catch (err: any) {
      const serverError = err.response?.data;
      setError(serverError?.details ? `${serverError.error}: ${serverError.details}` : (serverError?.error || 'Could not fetch data for this domain. Please check the spelling and try again.'));
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`hosting-checker-report-${result.domain}.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Helmet>
        <title>Hosting Checker | Who Hosts This Website? Free Tool by WebSEOTrends</title>
        <meta name="description" content="Find out where any website is hosted instantly with Hosting Checker. Get hosting provider, IP address, server location, DNS, and CMS details. Fast, free, and accurate." />
        <link rel="canonical" href="https://hosting-checker.webseotrends.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Hosting Checker",
            "url": "https://hosting-checker.webseotrends.com",
            "description": "Professional hosting checker tool to detect website hosting providers and server details.",
            "applicationCategory": "SEO Tool",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0"
            }
          })}
        </script>
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            
            <section id="tool" className="text-center space-y-8 py-8">
              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight"
                >
                  <Trans i18nKey="hero.title">
                    Who Hosts This <span className="text-indigo-600">Website?</span>
                  </Trans>
                </motion.h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                  {t('hero.subtitle')}
                </p>
              </div>

              <form onSubmit={handleLookup} className="max-w-2xl mx-auto relative group">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder={t('hero.placeholder')}
                    className="block w-full pl-16 pr-32 py-5 bg-white border-2 border-slate-100 rounded-2xl text-lg focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-xl shadow-slate-200/50"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-3 top-3 bottom-3 bg-indigo-600 text-white px-8 rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>{t('hero.button')} <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </form>

              {error && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 max-w-2xl mx-auto border border-red-100"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{error}</span>
                </motion.div>
              )}
            </section>

            <AnimatePresence>
              {result && (
                <motion.section 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                      <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                      {t('results.analysis_for')} {result.domain}
                    </h2>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(result, null, 2));
                          alert('Report copied to clipboard!');
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                      >
                        <FileText className="w-4 h-4" /> {t('results.copy_json')}
                      </button>
                      <button 
                        onClick={downloadPDF}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                      >
                        <Download className="w-4 h-4" /> {t('results.download_pdf')}
                      </button>
                    </div>
                  </div>

                  <div ref={reportRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                        <div className="p-2 bg-indigo-50 rounded-xl">
                          <Server className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-bold">{t('results.hosting_provider')}</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-slate-500 text-sm">{t('results.provider')}</span>
                          <span className="font-bold text-slate-900">{result.whois?.org || result.geo?.org || 'Unknown'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 text-sm">{t('results.ip_address')}</span>
                          <span className="font-mono text-sm font-bold text-indigo-600">{result.ip}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 text-sm">{t('results.location')}</span>
                          <span className="font-bold text-slate-900 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {result.geo?.city}, {result.geo?.country}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 text-sm">{t('results.server_type')}</span>
                          <span className="font-bold text-slate-900">{result.server}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                        <div className="p-2 bg-emerald-50 rounded-xl">
                          <Layout className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h3 className="text-lg font-bold">{t('results.tech_stack')}</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-slate-500 text-sm">{t('results.cms')}</span>
                          <span className="font-bold text-slate-900">{result.cms}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 text-sm">{t('results.ssl_status')}</span>
                          <span className={cn(
                            "font-bold px-2 py-0.5 rounded text-xs",
                            result.ssl === "Active / Valid" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                          )}>
                            {result.ssl}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 text-sm">{t('results.web_server')}</span>
                          <span className="font-bold text-slate-900">{result.server}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 text-sm">{t('results.cdn')}</span>
                          <span className="font-bold text-slate-900">{result.headers?.['x-cdn'] || 'None Detected'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                        <div className="p-2 bg-amber-50 rounded-xl">
                          <Network className="w-6 h-6 text-amber-600" />
                        </div>
                        <h3 className="text-lg font-bold">{t('results.dns_records')}</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('results.nameservers')}</h4>
                          <ul className="space-y-2">
                            {result.dns.ns.map((ns: string, i: number) => (
                              <li key={i} className="text-sm font-mono bg-slate-50 p-2 rounded-lg border border-slate-100">{ns}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('results.mx_records')}</h4>
                          <ul className="space-y-2">
                            {result.dns.mx.map((mx: any, i: number) => (
                              <li key={i} className="text-sm font-mono bg-slate-50 p-2 rounded-lg border border-slate-100">{mx.exchange}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            <article className="prose prose-slate max-w-none bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">How to Find Out Where a Website is Hosted: The Ultimate Guide</h2>
              <p className="lead text-xl text-slate-600 mb-10">
                Have you ever visited a lightning-fast website and wondered, <strong>"who hosts this site?"</strong> Or perhaps you're doing competitor research and want to find the hosting provider of a website that ranks well in your niche. Knowing where a website is hosted can provide valuable insights into its performance, security, and technical infrastructure.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                  <h3 className="text-indigo-900 font-bold mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5" /> Why Check Hosting?
                  </h3>
                  <ul className="space-y-2 text-sm text-indigo-800">
                    <li>• Performance Benchmarking</li>
                    <li>• Competitor Analysis</li>
                    <li>• Security Verification</li>
                    <li>• Migration Planning</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                  <h3 className="text-emerald-900 font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" /> Instant Detection
                  </h3>
                  <p className="text-sm text-emerald-800">
                    Our tool uses advanced DNS and WHOIS protocols to fetch real-time data from global servers, ensuring 100% accuracy in hosting detection.
                  </p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">How Can You Tell Where a Website is Hosted?</h3>
              <p>There are several ways to determine a website's hosting provider. While manual methods exist, using an automated <strong>hosting checker</strong> like Hosting Checker is the fastest and most reliable way. Here are the primary methods used by professionals:</p>
              <h4 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Using an Automated Hosting Checker Tool</h4>
              <p>This is the easiest method. You simply enter the URL into a tool, and it performs several background checks:</p>
              <ul>
                <li><strong>DNS Lookup:</strong> Checking the 'A' record to find the server's IP address.</li>
                <li><strong>IP Geolocation:</strong> Mapping the IP address to a physical data center and provider.</li>
                <li><strong>WHOIS Data:</strong> Querying global databases for registrar and ownership information.</li>
              </ul>
              <h4 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Manual DNS Lookup</h4>
              <p>If you're technically inclined, you can use the command line (Terminal on Mac/Linux or CMD on Windows) to find the hosting provider. By typing <code>nslookup example.com</code>, you can find the IP address. Once you have the IP, you can use an IP lookup service to find the organization associated with it.</p>
              <h4 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Checking Nameservers (NS Records)</h4>
              <p>Nameservers often point directly to the hosting provider. For example, if you see <code>ns1.bluehost.com</code>, it's a clear indicator that the site is hosted on Bluehost. However, many sites use third-party DNS providers like Cloudflare, which can mask the actual hosting provider.</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Where is This Website Hosted? Understanding Server Locations</h3>
              <p>Server location plays a critical role in <strong>Core Web Vitals</strong> and overall SEO. If your target audience is in the UK, but your website is hosted in Singapore, your users will experience higher latency. Our tool provides precise geolocation data, including the city and country of the server.</p>
              <div className="my-12 p-8 bg-slate-900 rounded-3xl text-white">
                <h3 className="text-2xl font-bold mb-4">The Importance of Hosting for SEO</h3>
                <p className="text-slate-300 mb-6">Google has confirmed that page speed is a ranking factor. Your choice of hosting provider directly impacts your TTFB (Time to First Byte). High-quality hosts like SiteGround or WP Engine offer optimized server environments that can significantly boost your rankings.</p>
                <a 
                  href="https://webseotrends.com/deals/black-friday-web-hosting-deals/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-all"
                >
                  Claim Best Hosting Deal
                </a>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Find Hosting Provider of Website: Step-by-Step</h3>
              <ol className="space-y-4">
                <li><strong>Step 1:</strong> Copy the URL of the website you want to check.</li>
                <li><strong>Step 2:</strong> Paste it into the Hosting Checker search box above.</li>
                <li><strong>Step 3:</strong> Click "Scan" and wait 2-3 seconds.</li>
                <li><strong>Step 4:</strong> Review the detailed report, including IP, Location, and CMS.</li>
              </ol>
              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Whois Hosting This? Common FAQs</h3>
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-6">
                  <h4 className="font-bold text-slate-900 mb-2">Can I hide my hosting provider?</h4>
                  <p className="text-slate-600 text-sm">While you can't completely hide it, using a proxy service like Cloudflare will show Cloudflare's IP addresses instead of your actual origin server, adding a layer of privacy and security.</p>
                </div>
                <div className="border-b border-slate-100 pb-6">
                  <h4 className="font-bold text-slate-900 mb-2">Is this tool free to use?</h4>
                  <p className="text-slate-600 text-sm">Yes, Hosting Checker is 100% free. You can perform as many lookups as you want without any restrictions.</p>
                </div>
                <div className="border-b border-slate-100 pb-6">
                  <h4 className="font-bold text-slate-900 mb-2">How accurate is the CMS detection?</h4>
                  <p className="text-slate-600 text-sm">Our CMS detection is highly accurate for popular platforms like WordPress, Shopify, and Wix. It works by scanning the site's header code and file structure for unique identifiers.</p>
                </div>
              </div>
              <div className="mt-12 p-8 bg-indigo-50 rounded-3xl border border-indigo-100">
                <h3 className="text-xl font-bold text-indigo-900 mb-4">Ready to find the best hosting?</h3>
                <p className="text-indigo-800 mb-6">Check out our comprehensive comparison of the top 10 hosting providers for 2026. We've tested them for speed, uptime, and support.</p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://webseotrends.com/deals/black-friday-web-hosting-deals/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
                  >
                    Claim Hosting Deal
                  </a>
                  <a 
                    href="https://webseotrends.com/best-web-hosting/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-indigo-600 border border-indigo-200 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all"
                  >
                    Read Reviews
                  </a>
                </div>
              </div>
            </article>
          </div>

          <div className="lg:col-span-4">
            <Sidebar />
          </div>

        </div>
      </main>
    </div>
  );
};

export default Home;
