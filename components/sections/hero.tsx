import { HeroData } from "types/sections-data";
import { getButtonAppearance } from "utils/button";
import ButtonLink from "../links/button-link";

import style from "./hero.module.scss";

import { HERO_VIDEO } from "lib/constants";
import Video from "../elements/video";
import Image from 'next/image';

import Watermark from 'public/images/wartermark-pig.svg';
import OfferHeroSign from 'public/images/offer-hero-sign.svg';
import ScrollDownArrow from 'public/icons/arrow-down.svg';

type HeroProps = {
  data: HeroData;
  pageName: string;
};

const Hero: React.FC<HeroProps> = (props) => {
  const { data, pageName } = props;
  const { title, description, cta } = data;

  return (
    <section className={`${style.section} ${style["section--" + pageName]}`}>
      {pageName === "home" && <Video videoSrc={HERO_VIDEO} />}
      <div className={style.section__wrapper}>
        <div className={style.section__caption}>
          <h1 className={style.section__title}>{title}</h1>
          {description && <div className={style.section__description}>{description}</div>}
          {cta && <div className={style["section__buttons-wrapper"]}>
            {cta?.map((button) => {
              return (
                <ButtonLink
                  button={button}
                  appearance={getButtonAppearance(button.type, "dark")}
                  key={button.id}
                />
              );
            })}
          </div>}
        </div>
        {pageName === "home" && (
          <div className={style.section__watermark}>
            <Image src={Watermark} alt={`transparent pig watermark`} />
          </div>
        )}
        {pageName === "offer" && (
          <div className={style.section__watermark}>
            <Image src={OfferHeroSign} alt="" />
          </div>
        )}
        <div className={style["scroll-down-icon"]}>
            <Image src={ScrollDownArrow} alt={`scroll down image`} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
