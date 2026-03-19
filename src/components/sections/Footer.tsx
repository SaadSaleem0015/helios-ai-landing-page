import { Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-[#f5f8fc] border-t border-[#cfddec] pt-20 pb-10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#a4c2dc]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#a4c2dc]/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <img 
                src="/logo.jpeg" 
                alt="The Helios AI" 
                className="h-10 w-auto object-contain"
              />
              <p className="text-gray-600 font-medium leading-relaxed max-w-xs">
                Revolutionizing Outreach with AI Humanity. Making every conversation count and convert.
              </p>
            </div>
            <div className="flex gap-3">
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold mb-6 text-gray-900 text-lg">Product</h4>
            <ul className="space-y-3">
              <FooterLink href="#craft-voices-that-resonate">AI Voice Features</FooterLink>
              <FooterLink href="#seamless-crm-tool-integrations">CRM Integrations</FooterLink>
              <FooterLink href="#features">Changelog</FooterLink>
              <FooterLink href="#product-demo">API Documentation</FooterLink>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold mb-6 text-gray-900 text-lg">Company</h4>
            <ul className="space-y-3">
              <FooterLink>About Us</FooterLink>
              <FooterLink>Careers</FooterLink>
              <FooterLink>Blog & News</FooterLink>
              <FooterLink>Case Studies</FooterLink>
              <FooterLink>Contact Sales</FooterLink>
            </ul>
          </div>

          {/* Newsletter Column */}
          {/* <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#a4c2dc]" />
                <h4 className="font-bold text-lg text-gray-900">Stay Updated</h4>
              </div>
              <p className="text-gray-600 font-medium text-sm leading-relaxed">
                Get the latest AI outreach tips and product updates delivered to your inbox.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-white border-[#cfddec] text-gray-900 placeholder:text-gray-400 focus:border-[#a4c2dc] shadow-sm focus:ring-[#a4c2dc]/20"
                />
                <Button className="bg-[#a4c2dc] text-white hover:bg-[#93b6d6] transition-all duration-300 shadow-lg hover:shadow-[#a4c2dc]/25 hover:scale-105">
                  <Send size={18} />
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#cfddec] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-600 text-sm font-medium">
                © {new Date().getFullYear()} The Helios AI. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm font-medium">
              <a href="privacy-policy" className="text-gray-600 hover:text-[#a4c2dc] transition-colors">
                Privacy Policy
              </a>
              <a href="terms-and-conditions" className="text-gray-600 hover:text-[#a4c2dc] transition-colors">
                Terms of Service
              </a>
          
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: any }) {
  return (
    <a 
      href="#" 
      className="w-10 h-10 rounded-xl bg-white border border-[#cfddec] flex items-center justify-center text-gray-600 hover:bg-[#a4c2dc] hover:text-white hover:border-[#a4c2dc] transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
    >
      {icon}
    </a>
  );
}

function FooterLink({ children, href, onClick }: { children: React.ReactNode; href?: string; onClick?: () => void }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    } else if (href && href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <li>
      <a 
        href={href || "#"}
        onClick={handleClick}
        className="text-gray-600 hover:text-[#a4c2dc] transition-all duration-300 font-medium text-sm block py-1 hover:translate-x-1 group"
      >
        <span className="flex items-center gap-2">
          {children}
          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </span>
      </a>
    </li>
  );
}