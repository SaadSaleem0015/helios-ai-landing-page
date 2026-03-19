import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Mic2, PlayCircle, BarChart2, ChevronDown, ArrowRight, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductDemo() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Upload Leads",
      description: "CSV or API import—tag priorities effortlessly.",
      icon: <Upload />,
      content: (
        <div className="bg-slate-50 rounded-xl p-8 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center h-64">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <Upload size={32} />
          </div>
          <p className="text-lg font-medium text-slate-600">Drag & Drop CSV file here</p>
          <p className="text-sm text-slate-400 mt-2">or click to browse</p>
        </div>
      )
    },
    {
      id: 1,
      title: "Customize Script",
      description: "AI suggests empathetic openers based on lead data.",
      icon: <Mic2 />,
      content: (
        <div className="bg-card rounded-xl border border-border shadow-lg p-6 h-64 flex flex-col">
          <div className="space-y-4">
             <div className="flex justify-between items-center">
               <span className="text-sm font-bold">Voice Persona</span>
               <span className="text-xs bg-primary/20 text-primary-foreground px-2 py-1 rounded">Friendly Professional</span>
             </div>
             <div className="p-4 bg-slate-50 rounded-lg text-sm italic text-slate-600">
               "Hi {`{FirstName}`}, I noticed you recently checked out our pricing page. I wanted to see if you had any questions about our enterprise tier?"
             </div>
             <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-primary animate-pulse"></div>
             </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Launch & Listen",
      description: "Monitor calls in real-time dashboard.",
      icon: <PlayCircle />,
      content: (
        <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-lg p-6 h-64 flex items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-[#a4c2dc]/10 to-transparent opacity-20"></div>
           <div className="text-center z-10">
             <div className="text-4xl font-bold text-white mb-2">Live Call</div>
             <div className="text-green-400 animate-pulse text-sm font-mono">● CONNECTED 00:45</div>
             <div className="mt-8 flex gap-2 justify-center">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-2 bg-[#a4c2dc] rounded-full animate-wave" style={{ height: 30 + Math.random() * 30, animationDelay: i * 0.1 + 's' }}></div>
                ))}
             </div>
           </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Analyze & Iterate",
      description: "Heatmaps of engagement—optimize with one click.",
      icon: <BarChart2 />,
      content: (
        <div className="bg-card rounded-xl border border-border shadow-lg p-6 h-64 flex items-end justify-between gap-2">
           {[40, 70, 50, 90, 60, 80].map((h, i) => (
             <motion.div 
               key={i}
               initial={{ height: 0 }}
               animate={{ height: `${h}%` }}
               transition={{ delay: i * 0.1 }}
               className="flex-1 bg-[#a4c2dc]/80 rounded-t-lg hover:bg-[#a4c2dc] transition-colors relative group"
             >
               <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                 {h}%
               </div>
             </motion.div>
           ))}
        </div>
      )
    }
  ];

  return (
    <section id="product-demo" className="py-24 bg-slate-50 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            See The Helios AI in <span className="relative inline-block after:content-[''] after:absolute after:w-full after:h-2 after:bg-[#a4c2dc] after:bottom-1 after:left-0 after:-z-10">Action</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Steps Navigation */}
          <div className="lg:col-span-4 space-y-4">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 border-l-4 ${
                  activeStep === index 
                    ? "bg-white shadow-lg border-[#a4c2dc]" 
                    : "hover:bg-white/50 border-transparent opacity-70 hover:opacity-100"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${activeStep === index ? 'bg-[#a4c2dc] text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${activeStep === index ? 'text-foreground' : 'text-slate-600'}`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Preview Area */}
          <div className="lg:col-span-8">
             <div className="bg-white rounded-3xl p-2 shadow-2xl border border-slate-100 h-[500px] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
                
                <div className="relative h-full flex items-center justify-center p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="w-full max-w-2xl"
                    >
                      {steps[activeStep].content}
                      
                      <div className="mt-8 text-center">
                        <h4 className="text-2xl font-bold mb-2">{steps[activeStep].title}</h4>
                        <p className="text-muted-foreground">{steps[activeStep].description}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-16 text-center">
  <Button 
    size="lg" 
    className="relative bg-gradient-to-r from-[#8fb3d3] to-[#7fa6c8] hover:from-[#7fa6c8] hover:to-[#678db0] text-white font-bold text-lg px-12 h-14 rounded-2xl shadow-[rgba(164,194,220,0.3)_0px_8px_24px,rgba(164,194,220,0.2)_0px_16px_56px] hover:shadow-[rgba(164,194,220,0.4)_0px_12px_32px,rgba(164,194,220,0.3)_0px_20px_64px] transition-all duration-300 hover:scale-105 group overflow-hidden"
    onClick={() => window.open('https://app.theheliosai.com/login', '_blank')}
  >
    {/* Shine animation */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    
    <span className="relative z-10 flex items-center gap-3">
      <Zap className="w-5 h-5" />
      Get Started
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </span>
  </Button>
  
  {/* Trust badge */}
  <p className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
    <Shield className="w-4 h-4" />
    Secure sign in • Access all features
  </p>
</div>
      </div>
    </section>
  );
}
