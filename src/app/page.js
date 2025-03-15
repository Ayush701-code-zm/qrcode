import NewsletterSection from "../app/components/NewsLetters";
import VedioSection from "../app/components/VedioSection";

export default function Home() {
  return (
    <main>
      <div className="mt-24 md:32 lg:mt-8 px-4  md:px-[9rem]">
        <VedioSection />
        <NewsletterSection />
      </div>
    </main>
  );
}
