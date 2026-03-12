import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Products />
      <Services />
      <Testimonials />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
