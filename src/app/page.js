import NewsletterSection from "../app/components/NewsLetters";
import VideoSection from "../app/components/VedioSection";
import ContactFormSection from "./components/ContactForm";
import FAQSection from "./components/Faq";
import FooterSection from "./components/FooterSection";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import TestimonialsPage from "./components/Testimonial";


export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="mt-16 md:mt-20 lg:mt-24 px-4 md:px-8 lg:px-24">
        <section id="hero">
          <HeroSection />
        </section>
        <VideoSection />
        <NewsletterSection />
        <section id="contact">
          <ContactFormSection />
        </section>
        <section >
          <FAQSection />
          <TestimonialsPage />
        </section>
        <FooterSection />
      </div>
    </main>
  );
}