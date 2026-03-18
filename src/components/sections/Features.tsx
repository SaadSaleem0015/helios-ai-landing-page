import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Check, ArrowRight, LayoutDashboard, Mic, BarChart3, Server, Zap, Users, TrendingUp, Shield, Infinity, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import dashboardImg from "@assets/generated_images/modern_saas_dashboard_showing_integrations_and_analytics.png";
import avatarsImg from "@assets/generated_images/collage_of_diverse_friendly_professional_avatars.png";
import analyticsImg from "@assets/generated_images/abstract_data_visualization_graph_in_yellow.png";

export default function Features() {
  const calendlyRef = useRef<HTMLDivElement | null>(null);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    // Check if Calendly is already loaded
    if ((window as any).Calendly) {
      initCalendly();
      return;
    }

    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    script.onload = () => {
      console.log("Calendly script loaded");
      setCalendlyLoaded(true);
      initCalendly();
    };

    script.onerror = () => {
      console.error("Failed to load Calendly script");
      setScriptError(true);
    };

    document.body.appendChild(script);

    return () => {
      // Clean up script if component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const initCalendly = () => {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const calendly = (window as any).Calendly;
      if (calendly && calendlyRef.current) {
        try {
          // Clear any existing content
          calendlyRef.current.innerHTML = '';
          
          calendly.initInlineWidget({
            url: "https://calendly.com/kekoamac/the-helios-ai",
            parentElement: calendlyRef.current,
            prefill: {},
            utm: {}
          });
          console.log("Calendly widget initialized");
        } catch (error) {
          console.error("Error initializing Calendly:", error);
          setScriptError(true);
        }
      }
    }, 100);
  };

  const features = [
    {
      id: 1,
      title: "Seamless CRM & Tool Integrations",
      description: "Connect to HubSpot, Zoho, and GHL in one click. Sync leads, trigger calls, track results—all automated.",
      icon: <LayoutDashboard className="w-6 h-6" />,
      image: dashboardImg,
      points: ["One-click sync", "Real-time updates", "Automated triggers"],
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-gradient-to-br from-blue-50 to-cyan-50",
    },
    {
      id: 2,
      title: "Craft Voices That Resonate",
      description: "Choose accents, tones, and scripts. Train on your data for brand-perfect empathy.",
      icon: <Mic className="w-6 h-6" />,
      image: avatarsImg,
      points: ["Custom accents", "Brand voice training", "Emotion control"],
      gradient: "from-[#8fb3d3] to-[#7fa6c8]",
      bg: "bg-gradient-to-br from-[#f5f8fc] to-[#e6eef6]",
    },
    {
      id: 3,
      title: "Real-Time Insights & Optimization",
      description: "Monitor call sentiment, drop-offs, and ROI with AI-driven dashboards. A/B test scripts for peak performance.",
      icon: <BarChart3 className="w-6 h-6" />,
      image: analyticsImg,
      points: ["Sentiment analysis", "Drop-off tracking", "ROI dashboards"],
      gradient: "from-emerald-500 to-green-500",
      bg: "bg-gradient-to-br from-emerald-50 to-green-50",
    },
  ];

  const stats = [
    { value: "2,000+", label: "Active Businesses", icon: <Users className="w-5 h-5" /> },
    { value: "98%", label: "Satisfaction Rate", icon: <TrendingUp className="w-5 h-5" /> },
    { value: "24/7", label: "Uptime", icon: <Shield className="w-5 h-5" /> },
    { value: "∞", label: "Scalable", icon: <Infinity className="w-5 h-5" /> },
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-[#f5f8fc]/20 overflow-hidden relative scroll-mt-24">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#cfddec]/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-[#b8cce2]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-transparent via-[#e6eef6]/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-[#cfddec] shadow-lg shadow-[#e6eef6]/50 mb-8"
          >
            <Zap className="w-5 h-5 text-[#8fb3d3]" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#7fa6c8] to-[#678db0] bg-clip-text text-transparent">
              Enterprise-Grade Features
            </span>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Transform Your Outreach with{" "}
            <span className="bg-gradient-to-r from-[#8fb3d3] to-[#678db0] bg-clip-text text-transparent">
              AI-Powered Voice
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Everything you need to scale personalized conversations without scaling headcount. 
            Powered by cutting-edge AI that feels genuinely human.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-[#e6eef6] hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#a4c2dc] to-[#8fb3d3] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="space-y-24">
          {features.map((feature, index) => (
            <FeatureRow key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* Calendly Booking Section with Heading */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-[#cfddec] shadow-lg shadow-[#e6eef6]/50 mb-6"
            >
              <Calendar className="w-5 h-5 text-[#8fb3d3]" />
              <span className="text-sm font-semibold bg-gradient-to-r from-[#7fa6c8] to-[#678db0] bg-clip-text text-transparent">
                Schedule a Demo
              </span>
            </motion.div>
            
            <motion.h3 
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              See The Helios AI in Action
            </motion.h3>
            
            <motion.p 
              className="text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Book a personalized demo with our team and discover how AI-powered voice can transform your outreach
            </motion.p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#e6eef6] bg-white/90 p-4">
            {scriptError ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">Failed to load booking calendar.</p>
                <a 
                  href="https://calendly.com/kekoamac/the-helios-ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8fb3d3] to-[#7fa6c8] text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  Book on Calendly
                </a>
              </div>
            ) : (
              <div
                ref={calendlyRef}
                className="calendly-inline-widget w-full"
                style={{ minWidth: "320px", height: "700px" }}
                data-url="https://calendly.com/kekoamac/the-helios-ai"
              />
            )}
            
            {!calendlyLoaded && !scriptError && (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-[#8fb3d3] border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-gray-600">Loading booking calendar...</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Enhanced Scalability Feature */}
        <motion.div 
          className="mt-32 bg-gradient-to-br from-white to-[#f5f8fc] border border-[#cfddec] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-all duration-500"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Background Gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-[#a4c2dc]/10 to-[#8fb3d3]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#8fb3d3] to-[#7fa6c8] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <Server className="w-4 h-4" />
                <span>Enterprise Scale</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                Scale to Thousands of{" "}
                <span className="bg-gradient-to-r from-[#8fb3d3] to-[#678db0] bg-clip-text text-transparent">
                  Concurrent Calls
                </span>
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Handle 100+ concurrent calls with 99.9% uptime. No per-minute fees—just simple, predictable flat pricing that grows with you.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Systems Operational
                </div>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                  <Shield className="w-4 h-4" />
                  Enterprise Security
                </div>
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#8fb3d3] to-[#7fa6c8] hover:from-[#7fa6c8] hover:to-[#678db0] text-white font-semibold text-lg h-14 px-8 rounded-2xl shadow-lg shadow-[#8fb3d3]/25 hover:shadow-[#8fb3d3]/40 transition-all duration-300 hover:scale-105 group/btn"
            >
              <span className="flex items-center gap-2">
                Explore All Features
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureRow({ feature, index }: { feature: any, index: number }) {
  const isEven = index % 2 === 0;

  // Create ID from title for anchor links
  const sectionId = feature.title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return (
    <motion.div 
      id={sectionId}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-center scroll-mt-24`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* Text Content */}
      <motion.div 
        className="flex-1 space-y-6"
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white shadow-lg`}>
          {feature.icon}
        </div>
        <h3 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900">
          {feature.title}
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed">
          {feature.description}
        </p>
        <ul className="space-y-4">
          {feature.points.map((point: string, i: number) => (
            <motion.li 
              key={i} 
              className="flex items-center gap-4 group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (i * 0.1) }}
            >
              <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                <Check size={16} strokeWidth={3} />
              </div>
              <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Image Content */}
      <motion.div 
        className="flex-1 w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#e6eef6] bg-white p-3 group hover:scale-[1.02] transition-all duration-500">
          {/* Gradient Border Effect */}
          <div className="absolute -inset-1 bg-linear-to-r from-[#a4c2dc] via-[#8fb3d3] to-[#a4c2dc] rounded-3xl opacity-50 blur-sm group-hover:opacity-75 transition-opacity duration-300"></div>
          
          <div className="relative z-10 rounded-2xl overflow-hidden bg-white">
            <div className={`absolute inset-0 ${feature.bg} opacity-30 mix-blend-multiply`}></div>
            <img 
              src={feature.image} 
              alt={feature.title} 
              className="relative z-10 rounded-xl w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700" 
            />
            
            {/* Enhanced Floating Metric */}
            <motion.div 
              className="absolute bottom-6 left-6 right-6 z-20"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-white/20 transform translate-y-0 group-hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-800">Performance Boost</span>
                  <span className="text-green-600 font-bold text-sm flex items-center gap-1">
                    <TrendingUp size={14} />
                    +124%
                  </span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-[#8fb3d3] to-[#7fa6c8] h-full rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "74%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}