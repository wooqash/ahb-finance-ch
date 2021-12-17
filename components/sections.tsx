
import { ArticleData } from "types/blog-data";
import { SectionsData, SectionType } from "types/sections-data";
import AdvantagesGroup from "./sections/advantages-group";
import Blog from "./sections/blog";
import FaqGroup from "./sections/faq-group";
import Hero from "./sections/hero";
import OffersGroup from "./sections/offers-group";
import PartnersGroup from "./sections/partners-group";
import PublicationsGroup from "./sections/publications-group";
import RichTextWithCta from "./sections/rich-text-with-cta";
import TestimonialsGroup from "./sections/testimonials-group";

type SectionsProps = {
  sections: SectionsData[];
  articles?: ArticleData[];
  preview: boolean | null;
};

type SectionProps = {
  sectionData: SectionsData;
  articles?: ArticleData[];
};

// Display a section individually
const Section: React.FC<SectionProps> =  (prop) => {
  const { sectionData, articles } = prop;

  switch (sectionData.type) {
    case SectionType.ADVANTAGES:
      return <AdvantagesGroup data={sectionData} />;
    case SectionType.BLOG:
      return <Blog data={sectionData} articles={articles} />;
    case SectionType.FAQS:
      return <FaqGroup data={sectionData} />;
    case SectionType.HERO:
      return <Hero data={sectionData} />;
    case SectionType.OFFERS:
      return <OffersGroup data={sectionData} />;
    case SectionType.PARTNERS:
      return <PartnersGroup data={sectionData} />;
    case SectionType.RICHTEXTWITHCTA:
      return <RichTextWithCta data={sectionData} />;
    case SectionType.TESTIMONIALS:
      return <TestimonialsGroup data={sectionData} />;
    case SectionType.PUBLICATIONS:
      return <PublicationsGroup data={sectionData} />
    default:
      let x: never = sectionData;
      return <></>;
  }
};

const Sections: React.FC<SectionsProps> = (props) => {
  const { sections, articles, preview } = props;

  return (
    <>
      {sections.map((section) => (
        <Section
          sectionData={section}
          articles={articles}
          key={`${section.__component}${section.id}`}
        />
      ))}
    </>
  );
};

export default Sections;
