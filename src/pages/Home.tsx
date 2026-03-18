import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import ProductDemo from "@/components/sections/ProductDemo";
import CallDemo from "@/components/sections/CallDemo";
import Pricing from "@/components/sections/Pricing";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background overflow-x-hidden">
      <Hero />
      <Features />
      <Testimonials />
      <ProductDemo />
      <CallDemo />
      {/* <Pricing /> */}
      <Footer />
    </div>
  );
}
