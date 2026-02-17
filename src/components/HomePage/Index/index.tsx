import LanguageHomeSection from "./Home";
import LanguageStatusSection from "./Status";
import LanguageAboutSection from "./About";
import LanguageCategorySection from "./Category";
import LanguageCoursesSection from "./Coures";
import LanguageCTASection from "./CTA";
import LanguageTestimonialSection from "./Testimonial";
import LanguageFacultySection from "./Faculty";
import LanguageBlogSection from "./Blog";
import CTASection from "./Footer_CTA";
import WhyChooseSection from "./WhyChooseUs";
import Process from "./Process";

export default function LanguageAcademyIndex() {
  return (
    <>
      <LanguageHomeSection />
      <LanguageStatusSection />
      <LanguageCoursesSection />
      <LanguageCategorySection />
      <LanguageAboutSection />
      <LanguageCTASection />
      <WhyChooseSection />
      <Process />
      <LanguageTestimonialSection />
      <LanguageBlogSection />
      <CTASection />
      
    </> 
  );
}
