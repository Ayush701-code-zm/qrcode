import NewsletterSection from "../app/components/NewsLetters";
import VedioSection from "../app/components/VedioSection";
import ContactFormSection from "./components/ContactForm";
import FooterSection from "./components/FooterSection";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="mt-24 md:32 lg:mt-8 px-4  md:px-[9rem]">
        <VedioSection />
        <NewsletterSection />
        <ContactFormSection />
        <FooterSection />
      </div>
    </main>
  );
}
