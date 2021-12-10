import { SectionType } from "types/sections/section-type.enum";
import { SectionsData } from "types/sections/sections-data";

import AdvantagesGroup from "./sections/advantages-group";
import FaqGroup from "./sections/faq-group";
import Hero from "./sections/hero";
import OffersGroup from "./sections/offers-group";
import Partners from "./sections/partners";
import PublicationsGroup from "./sections/publications-group";
import RichTextWithCta from "./sections/rich-text-with-cta";
import TestimonialsGroup from "./sections/testimonials-group";

type SectionsProps = {
  sections: SectionsData[];
  preview: boolean | null;
};

type SectionProps = {
  sectionData: SectionsData;
};

// Display a section individually
const Section: React.FC<SectionProps> =  (prop) => {
  const { sectionData } = prop;

  switch (sectionData.type) {
    case SectionType.ADVANTAGES:
      return <AdvantagesGroup data={sectionData} />;
    case SectionType.FAQS:
      return <FaqGroup data={sectionData} />;
    case SectionType.HERO:
      return <Hero data={sectionData} />;
    case SectionType.OFFERS:
      return <OffersGroup data={sectionData} />;
    case SectionType.PARTNERS:
      return <Partners data={sectionData} />;
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
  const { sections, preview } = props;
  return (
    <>
      {sections.map((section) => (
        <Section
          sectionData={section}
          key={`${section.__component}${section.id}`}
        />
      ))}
    </>
  );
};

export default Sections;
