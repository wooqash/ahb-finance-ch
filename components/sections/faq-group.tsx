import Image from "next/image";

import { FaqGroupData } from "types/sections-data";
import { getButtonAppearance } from "utils/button";
import ButtonLink from "../links/button-link";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import style from "./faq-group.module.scss";
import { HiArrowNarrowRight } from "react-icons/hi";
import BottomTriangle from "public/images/adv-bottom-triangle.svg";

type FaqGroupProps = {
  data: FaqGroupData;
};

const FaqGroup: React.FC<FaqGroupProps> = (props) => {
  const { data } = props;
  const { title, questionAndAnswer, moreBtn } = data;
  return (
    <section className={style.section}>
      <div className={style.section__wrapper}>
        {title && <h2 className={style.section__title}>{title}</h2>}
        {questionAndAnswer ? (
          <Accordion allowZeroExpanded>
            {questionAndAnswer.map((qaItem) => {
              const { question, answer } = qaItem;
              return (
                <AccordionItem key={qaItem.id}>
                  <AccordionItemHeading>
                    <AccordionItemButton><HiArrowNarrowRight className="button__icon" />{question}</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>{answer}</p>
                  </AccordionItemPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          ""
        )}
        {moreBtn && (
          <ButtonLink
            button={moreBtn}
            appearance={
              moreBtn ? getButtonAppearance(moreBtn.type, "light") : ""
            }
          />
        )}
        <div className={style["section__bottom-triangle"]}>
          <Image src={BottomTriangle} alt="" />
        </div>
      </div>
    </section>
  );
};

export default FaqGroup;
