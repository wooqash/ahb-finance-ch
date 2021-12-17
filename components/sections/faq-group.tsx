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

type FaqGroupProps = {
  data: FaqGroupData;
};

const FaqGroup: React.FC<FaqGroupProps> = (props) => {
  const { data } = props;
  const { title, questionAndAnswer, moreBtn } = data;
  return (
    <section>
      {title && <h2>{title}</h2>}
      {questionAndAnswer ? (
        <Accordion>
          {questionAndAnswer.map((qaItem) => {
              const { question, answer } = qaItem;
            return (
              <AccordionItem key={qaItem.id}>
                <AccordionItemHeading>
                  <AccordionItemButton>{question}</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>
                    {answer}
                  </p>
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
          appearance={moreBtn ? getButtonAppearance(moreBtn.type, "light") : ""}
        />
      )}
    </section>
  );
};

export default FaqGroup;
