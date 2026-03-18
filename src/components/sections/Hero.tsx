import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, Phone, TrendingUp, CheckCircle2, X, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import heroBg from "@assets/generated_images/abstract_yellow_and_white_tech_waveform_background.png";

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 80]);
  const y2 = useTransform(scrollY, [0, 500], [0, -80]);

  const playAudio = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 5000);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-[#f5f8fc] to-[#e6eef6] flex items-center justify-center pt-20 lg:pt-0">
      {/* Modern Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-gradient-to-r from-[#cfddec] to-[#b8cce2] rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-gradient-to-r from-[#b8cce2] to-[#a4c2dc] rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
        
        {/* Geometric patterns */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute top-20 right-20 w-4 h-4 bg-[#a4c2dc] rounded-full opacity-60"></div>
          <div className="absolute top-40 right-40 w-6 h-6 bg-[#c6d9ea] rounded-lg opacity-40 rotate-45"></div>
          <div className="absolute top-60 right-60 w-3 h-3 bg-[#8fb3d3] rounded-full opacity-50"></div>
        </div>
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="container relative z-10 mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <motion.div 
          className="space-y-8 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ y: y1 }}
        >
          {/* Enhanced Badge */}
          <motion.div 
            className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-[#cfddec] shadow-lg shadow-[#e6eef6]/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <span className="absolute animate-ping inline-flex h-3 w-3 rounded-full bg-[#a4c2dc] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8fb3d3]"></span>
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-[#7fa6c8] to-[#678db0] bg-clip-text text-transparent">
              AI Voice Technology Live Demo
            </span>
            <Sparkles className="w-4 h-4 text-[#8fb3d3]" />
          </motion.div>

          {/* Enhanced Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
              Turn Cold Leads{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#8fb3d3] to-[#678db0] bg-clip-text text-transparent">
                  Warm
                </span>
                <div className="absolute bottom-2 left-0 w-full h-3 bg-[#cfddec]/40 -rotate-1 rounded-lg z-0"></div>
              </span>{" "}
              with Human-like AI
            </h1>
            
            <motion.p 
              className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Helios AI transforms cold outreach into genuine conversations using 
              <span className="font-semibold text-[#7fa6c8]"> hyper-realistic AI voices</span>. 
              Personalize at scale, connect emotionally, and convert effortlessly.
            </motion.p>
          </div>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="relative bg-gradient-to-r from-[#8fb3d3] to-[#7fa6c8] hover:from-[#7fa6c8] hover:to-[#678db0] text-white font-semibold text-lg px-8 h-14 rounded-2xl shadow-lg shadow-[#8fb3d3]/25 hover:shadow-[#8fb3d3]/40 transition-all duration-300 hover:scale-105 group overflow-hidden"
              onClick={() => window.open('https://app.theheliosai.com/login', '_blank')}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
            
            {/* <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-8 text-lg rounded-2xl border-2 border-[#cfddec] bg-white/80 backdrop-blur-md hover:bg-[#f5f8fc] hover:border-[#b8cce2] text-gray-700 font-medium transition-all duration-300 hover:scale-105 group"
              onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
            >
              <Play className="mr-3 w-5 h-5 fill-[#8fb3d3] text-[#8fb3d3] group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button> */}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-6 pt-8 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-[#a4c2dc] to-[#8fb3d3] rounded-full border-2 border-white"></div>
                ))}
              </div>
              <span>Join 2,000+ businesses</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="w-4 h-4 text-[#a4c2dc] fill-current">★</div>
                ))}
              </div>
              <span>4.9/5 from 500+ reviews</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - Enhanced Video Section */}
        <motion.div 
          className="relative w-full"
          style={{ y: y2 }}
          initial={{ opacity: 0, scale: 0.95, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-[12px] border-white bg-white group hover:shadow-2xl transition-all duration-500">
            {/* Modern video container with gradient border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#a4c2dc] via-[#8fb3d3] to-[#a4c2dc] rounded-3xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-black rounded-2xl overflow-hidden aspect-video w-full z-10">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#a4c2dc]/10 via-transparent to-[#8fb3d3]/5 pointer-events-none z-20 mix-blend-overlay"></div>
             
              {/* Video Embed */}
              <div className="w-full h-full relative z-0">
                <iframe 
                  src="https://fast.wistia.net/embed/iframe/dmhz3pmgpr?seo=false&videoFoam=true" 
                  title="Helios AI Video" 
                  allow="autoplay; fullscreen" 
                  allowTransparency={true} 
                  frameBorder="0" 
                  scrolling="no" 
                  className="wistia_embed w-full h-full" 
                  name="wistia_embed" 
                ></iframe>
              </div>

              {/* Enhanced Floating Elements */}
              <motion.div 
                className="absolute -left-4 top-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl z-30 max-w-[220px] border border-[#e6eef6] hover:shadow-2xl transition-shadow duration-300"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a4c2dc] to-[#8fb3d3] flex items-center justify-center text-white shadow-lg">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Live AI Call</div>
                    <div className="text-xs text-[#7fa6c8] font-medium">Active conversation</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -right-4 bottom-6 bg-gradient-to-br from-[#8fb3d3] to-[#7fa6c8] text-white p-4 rounded-2xl shadow-xl z-30 border border-[#b8cce2] hover:shadow-2xl transition-shadow duration-300"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              >
                <div className="text-sm font-bold mb-2">AI Confidence Score</div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-20 bg-[#cfddec]/30 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-white rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "98%" }}
                      transition={{ delay: 1, duration: 1.5 }}
                    ></motion.div>
                  </div>
                  <span className="font-bold text-white">98%</span>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Background accent */}
          <div className="absolute -inset-4 bg-linear-to-r from-[#cfddec] to-[#b8cce2] rounded-[40px] -z-10 blur-xl opacity-40"></div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent z-0"></div>
    </section>
  );
}