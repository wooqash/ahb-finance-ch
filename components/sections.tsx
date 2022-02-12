
import { ArticleData } from "types/blog-data";
import { SectionsData, SectionType } from "types/sections-data";
import About from "./sections/about";
import AdvantagesGroup from "./sections/advantages-group";
import Blog from "./sections/blog";
import FaqGroup from "./sections/faq-group";
import Hero from "./sections/hero";
import OffersGroup from "./sections/offers-group";
import CollabolatorsGroup from "./sections/collabolators-group";
import PublicationsGroup from "./sections/publications-group";
import RichTextWithCta from "./sections/rich-text-with-cta";
import TestimonialsGroup from "./sections/testimonials-group";
import NewsletterFrom from "./sections/newsletter-form";
import { FormsData } from "types/forms-data";

type SectionsProps = {
  sections: SectionsData[];
  articles?: ArticleData[];
  form?: FormsData;
  preview: boolean | null;
  pageName: string;
};

type SectionProps = {
  sectionData: SectionsData;
  articles?: ArticleData[];
  form?: FormsData;
  pageName: string;
};

// Display a section individually
const Section: React.FC<SectionProps> =  (prop) => {
  const { sectionData, articles, form, pageName } = prop;

  console.log(sectionData);

  switch (sectionData.type) {
    case SectionType.ADVANTAGES:
      return <AdvantagesGroup data={sectionData} />;
    // case SectionType.BLOG:
    //   return <Blog data={sectionData} articles={articles} />;
    // case SectionType.FAQS:
    //   return <FaqGroup data={sectionData} />;
    case SectionType.HERO:
      return <Hero data={sectionData} pageName={pageName} />;
    // case SectionType.OFFERS:
    //   return <OffersGroup data={sectionData} />;
    // case SectionType.COLLABOLATORS:
    //   return <CollabolatorsGroup data={sectionData} />;
    case SectionType.RICHTEXTWITHCTA:
      return <RichTextWithCta data={sectionData} pageName={pageName} />;
    // case SectionType.TESTIMONIALS:
    //   return <TestimonialsGroup data={sectionData} />;
    // case SectionType.PUBLICATIONS:
    //   return <PublicationsGroup data={sectionData} />
    // case SectionType.NEWSLETTER:
    //   return form ? <NewsletterFrom data={sectionData} form={form} /> : <></>
    case SectionType.ABOUT:
      return <About data={sectionData} />;
    default:
      let x: never = sectionData;
      return <></>;
  }
};

const Sections: React.FC<SectionsProps> = (props) => {
  const { sections, articles, form, preview, pageName } = props;

  return (
    <>
      {sections.map((section) => (
        
        <Section
          sectionData={section}
          articles={articles}
          form={form}
          key={`${section.__component}${section.id}`}
          pageName={pageName}
        />
      ))}
    </>
  );
};

export default Sections;
