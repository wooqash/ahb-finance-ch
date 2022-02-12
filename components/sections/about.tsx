import { AboutSectionData } from "types/sections-data";
import { getButtonAppearance } from "utils/button";
import CustomImage from "../elements/custom-image";
import ButtonLink from "../links/button-link";

import style from "./about.module.scss";

type AboutProps = {
  data: AboutSectionData;
};

const About: React.FC<AboutProps> = (props) => {
  const { data } = props;
  const { title, description, readMoreLink, sideImage } = data;

  return (
    <section className={`${style.section}`}>
      <div className={style["section__left-side"]}>
        <div className={style.section__content}>
            <h2>{title}</h2>
            <p>{description}</p>
            {readMoreLink && (
            <ButtonLink
                button={readMoreLink}
                appearance={getButtonAppearance(readMoreLink.type, "dark")}
                key={readMoreLink.id}
            />
            )}
        </div>
      </div>
      {sideImage && (
        <div className={style["section__side-image"]}>
          <CustomImage media={sideImage} isBgImage={true} />
        </div>
      )}
    </section>
  );
};

export default About;
