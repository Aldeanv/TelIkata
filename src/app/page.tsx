import Navbar from '@/components/Navbar';
import Hero from '@/components/hero';
import HowItWorks from '@/components/HowItWorks';
import DemoTutorial from "@/components/DemoTutorial";
import Features from '@/components/Features';
import Purpose from '@/components/Purpose';
import Footer from '@/components/Footer';

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

