import Navbar from '@/components/homepage/Navbar';
import Hero from '@/components/homepage/hero';
import HowItWorks from '@/components/homepage/HowItWorks';
import DemoTutorial from "@/components/homepage/DemoTutorial";
import Features from '@/components/homepage/Features';
import Purpose from '@/components/homepage/Purpose';
import Footer from '@/components/homepage/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <Navbar />
      <main className="container mx-auto px-4">
        <Hero />
        <HowItWorks />
        <DemoTutorial />
        <Features />
        <Purpose />
      </main>
      <Footer />
    </div>
  );
}

