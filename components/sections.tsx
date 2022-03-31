
import { ArticleData } from "types/blog-data";
import { SectionsData, SectionType } from "types/sections-data";
import About from "./sections/about";
import AdvantagesGroup from "./sections/advantages-group";
import Blog from "./sections/blog";
import FaqGroup from "./sections/faq-group";
import Hero from "./sections/hero";
import OffersGroup from "./sections/offers-group";
import PartnersGroup from "./sections/partners-group";
import PublicationsGroup from "./sections/publications-group";
import { FormsData } from "types/forms-data";
import NewsletterSection from "./NewsletterSection/NewsletterSection";
import ServicesSection from "./ServicesSection/ServicesSection";

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

  switch (sectionData.type) {
    case SectionType.ADVANTAGES:
      return <AdvantagesGroup data={sectionData} />;
    case SectionType.BLOG:
      return <Blog data={sectionData} articles={articles} />;
    case SectionType.FAQS:
      return <FaqGroup data={sectionData} />;
    case SectionType.HERO:
      return <Hero data={sectionData} pageName={pageName} />;
    case SectionType.OFFERS:
      return <OffersGroup data={sectionData} />;
    case SectionType.PARTNERS:
      return <PartnersGroup data={sectionData} />;
    case SectionType.PUBLICATIONS:
      return <PublicationsGroup data={sectionData} />
    case SectionType.NEWSLETTER:
      return form ? <NewsletterSection data={sectionData} form={form} /> : <></>
    case SectionType.ABOUT:
      return <About data={sectionData} />;
    case SectionType.SERVICES:
        return <ServicesSection data={sectionData} />;
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
