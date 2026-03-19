import { motion } from "framer-motion";
import { Star, Quote, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "The Helios AI tripled our demo bookings—it's like having a sales team that never sleeps! The AI voices are so natural, prospects can't tell they're not human.",
      author: "Sarah L.",
      role: "CEO @GrowthHack Inc.",
      rating: 5,
      results: "+300% Demos"
    },
    {
      id: 2,
      quote: "The human-like nuance closed deals we thought were lost forever. We saw ROI in the first week and scaled to 100+ calls daily effortlessly.",
      author: "Mike R.",
      role: "Sales Director @TechFlow",
      rating: 5,
      results: "ROI in Week 1"
    },
    {
      id: 3,
      quote: "Incredibly easy setup with powerful results. Our cold calls now feel genuinely warm and engaging. The voice customization is remarkable.",
      author: "Elena K.",
      role: "Founder @StartupAI",
      rating: 5,
      results: "98% Success Rate"
    },
    {
      id: 4,
      quote: "I was skeptical about AI voices, but The Helios AI is indistinguishable from human callers. Our conversion rates increased by 240% immediately.",
      author: "David W.",
      role: "VP Sales @ScaleUp",
      rating: 5,
      results: "+240% Conversions"
    },
    {
      id: 5,
      quote: "The emotional intelligence in these AI voices is astounding. They handle objections better than some of our junior sales reps!",
      author: "Jennifer T.",
      role: "Head of Marketing @SaaSPro",
      rating: 5,
      results: "Better Than Human"
    },
    {
      id: 6,
      quote: "We replaced 3 sales development reps with The Helios AI and saw a 400% increase in qualified leads. The technology is revolutionary.",
      author: "Alex B.",
      role: "CTO @InnovateLabs",
      rating: 5,
      results: "+400% Qualified Leads"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#f5f8fc]/30 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#cfddec]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#b8cce2]/15 rounded-full blur-3xl"></div>
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#a4c2dc]/40 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-[#cfddec] shadow-lg shadow-[#e6eef6]/50 mb-8"
          >
            <Sparkles className="w-5 h-5 text-[#8fb3d3]" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#7fa6c8] to-[#678db0] bg-clip-text text-transparent">
              Trusted by 2,000+ Companies
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Loved by Teams Who{" "}
            <span className="bg-gradient-to-r from-[#8fb3d3] to-[#678db0] bg-clip-text text-transparent">
              Convert More
            </span>
          </h2>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-[#cfddec] shadow-lg">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-[#a4c2dc] fill-[#a4c2dc]" />
                ))}
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900">4.9/5 Rating</div>
                <div className="text-sm text-gray-600">from 500+ users</div>
              </div>
            </div>
            
            <div className="text-lg text-gray-600 max-w-2xl">
              Don't just take our word for it. See what industry leaders are saying about their success with The Helios AI.
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="h-full"
                >
                  <Card className="border border-[#cfddec]/50 bg-white/80 backdrop-blur-md shadow-[rgba(17,17,26,0.05)_0px_4px_16px,rgba(17,17,26,0.05)_0px_8px_32px] hover:shadow-[rgba(164,194,220,0.15)_0px_8px_24px,rgba(164,194,220,0.1)_0px_16px_56px] transition-all duration-500 h-full group overflow-hidden">
                    <CardContent className="p-8 flex flex-col h-full">
                      {/* Quote Icon */}
                      <div className="mb-6">
                        <Quote className="w-12 h-12 text-[#cfddec] group-hover:text-[#b8cce2] transition-colors" />
                      </div>

                      {/* Rating */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-[#a4c2dc] fill-[#a4c2dc]" />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-lg font-medium leading-relaxed text-gray-700 mb-6 flex-grow">
                        "{testimonial.quote}"
                      </p>

                      {/* Results Badge */}
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8fb3d3] to-[#7fa6c8] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 self-start shadow-lg shadow-[#8fb3d3]/25">
                        <TrendingUp className="w-4 h-4" />
                        {testimonial.results}
                      </div>

                      {/* Author */}
                      <div className="flex items-center gap-4 pt-4 border-t border-[#e6eef6]">
                        <Avatar className="h-14 w-14 border-2 border-[#cfddec] shadow-lg group-hover:border-[#b8cce2] transition-colors">
                          <AvatarImage 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.author}&backgroundColor=a4c2dc,c6d9ea,8fb3d3`} 
                            alt={testimonial.author}
                          />
                          <AvatarFallback className="bg-gradient-to-r from-[#a4c2dc] to-[#8fb3d3] text-white font-bold">
                            {testimonial.author[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-bold text-gray-900 text-lg">{testimonial.author}</div>
                          <div className="text-sm text-gray-600 font-medium">{testimonial.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Enhanced Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <CarouselPrevious className="relative static left-0 right-0 transform-none h-12 w-12 border-2 border-[#cfddec] bg-white/80 backdrop-blur-md hover:bg-[#f5f8fc] hover:border-[#b8cce2] text-[#7fa6c8] shadow-lg">
              <ArrowLeft className="h-5 w-5" />
            </CarouselPrevious>
            
            <div className="flex items-center gap-2">
              {testimonials.slice(0, 3).map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 bg-[#cfddec] rounded-full transition-all duration-300"
                />
              ))}
            </div>
            
            <CarouselNext className="relative static left-0 right-0 transform-none h-12 w-12 border-2 border-[#cfddec] bg-white/80 backdrop-blur-md hover:bg-[#f5f8fc] hover:border-[#b8cce2] text-[#7fa6c8] shadow-lg">
              <ArrowRight className="h-5 w-5" />
            </CarouselNext>
          </div>
        </Carousel>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-[#8fb3d3] to-[#7fa6c8] rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-[#8fb3d3]/25 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Outreach?
            </h3>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Join 2,000+ businesses already converting more leads with human-like AI voices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-[#7fa6c8] hover:bg-[#f5f8fc] font-bold text-lg h-14 px-8 rounded-2xl shadow-lg hover:scale-105 transition-all"
                onClick={() => window.open('https://app.theheliosai.com/login', '_blank')}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-[#7fa6c8] font-medium h-14 px-8 rounded-2xl backdrop-blur-sm hover:scale-105 transition-all"
              >
                View Case Studies
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Add this component for the trending up icon
function TrendingUp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}