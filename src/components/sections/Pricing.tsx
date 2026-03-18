import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      price: isAnnual ? 29 : 39,
      description: "For Solo Founders",
      features: ["3 calls/day", "Basic voices", "Email support", "Standard analytics"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: isAnnual ? 99 : 119,
      description: "For Growing Teams",
      features: ["Unlimited calls", "Premium AI voices", "Priority support", "Advanced analytics", "CRM Integrations"],
      cta: "Get Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For Large Organizations",
      features: ["Unlimited everything", "Custom voice cloning", "Dedicated manager", "API Access", "SSO & Security"],
      cta: "Contact Sales",
      popular: false,
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Decorative Background */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#a4c2dc]/10 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold font-heading mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Simple Pricing for Every Scale
          </motion.h2>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-[#a4c2dc]" />
            <span className={`font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-1">-20%</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.popular 
                  ? "bg-white border-2 border-[#a4c2dc] shadow-2xl shadow-[#a4c2dc]/10 scale-105 z-10" 
                  : "bg-slate-50 border border-slate-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#a4c2dc] text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                  Best Value
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold font-heading">
                    {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                  </span>
                  {typeof plan.price === 'number' && <span className="text-muted-foreground">/mo</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-[#a4c2dc]/20 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-[#7fa6c8]" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full h-12 font-bold text-lg rounded-xl ${
                  plan.popular 
                    ? "bg-[#a4c2dc] text-white hover:bg-[#93b6d6] shadow-lg shadow-[#a4c2dc]/20" 
                    : "bg-white border-2 border-slate-200 hover:bg-slate-50 text-foreground"
                }`}
                onClick={() => window.open('https://app.theheliosai.com/login', '_blank')}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 max-w-3xl mx-auto">
           <div className="bg-[#a4c2dc] text-white rounded-3xl p-12 text-center shadow-2xl shadow-[#a4c2dc]/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="relative z-10">
               <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
               <p className="text-white/90 font-medium mb-8">Sign in to access all features and start transforming your outreach.</p>
               <Button 
                 size="lg" 
                 className="bg-white text-[#7fa6c8] font-bold text-lg px-12 h-14 rounded-full hover:bg-[#c6d9ea] hover:scale-105 transition-all shadow-xl"
                 onClick={() => window.open('https://app.theheliosai.com/login', '_blank')}
               >
                 Get Started Now
               </Button>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
