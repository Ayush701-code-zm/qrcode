import NewsletterSection from "../app/components/NewsLetters";
import VedioSection from "../app/components/VedioSection";
import ContactFormSection from "./components/ContactForm";
import FooterSection from "./components/FooterSection";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import TestimonialsPage from "./components/Testimonial";

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="mt-24 mb-5 md:32 lg:mt-8 px-4  md:px-[9rem]">
        <HeroSection />
        <VedioSection />
        <NewsletterSection />
        <ContactFormSection />
        <TestimonialsPage />
        <FooterSection />
      </div>
    </main>
  );
}
