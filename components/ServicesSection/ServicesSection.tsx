import Image from "next/image";
import { ServicesSectionData } from "types/sections-data";
import Service from "../elements/Service/Service";
import style from "./ServiceSection.module.scss";

import TopOddTriangle from "public/images/adv-top-triangle.svg";
import TopEvenTriangle from "public/images/off-small-triangle.svg";
import BottomOddTriangle from "public/images/adv-bottom-triangle.svg";
import BottomEvenTriangle from "public/images/off-bottom-triangle.svg";
import ReactMarkdown from "react-markdown";

type ServicesSectionProps = {
  data: ServicesSectionData;
};

const ServicesSection: React.FC<ServicesSectionProps> = (props) => {
  const { data } = props;
  const {
    serviceId,
    title,
    shadowTitle,
    intro,
    description,
    servicesHeading,
    services,
  } = data;

  return (
    <section className={`${style.section}`}>
      <div id={serviceId} className={style.section__wrapper}>
        <div className={style.section__heading}>
          <h2 className={style.section__title}>{title}</h2>
          {shadowTitle && (
            <p className={style["section__shadow-title"]}>{shadowTitle}</p>
          )}
        </div>
        {(intro || description) && (
          <div className={style.section__content}>
            {intro && <div className={style.content__intro}>{intro}<hr /></div>}
            {description && (
              <div className={style.content__description}><ReactMarkdown>{description}</ReactMarkdown></div>
            )}
            <div
              className={`${style["top-triangle"]} ${style["top-triangle--even"]}`}
            >
              <Image src={TopEvenTriangle} alt="" />
            </div>
            <div
              className={`${style["top-triangle"]} ${style["top-triangle--odd"]}`}
            >
              <Image src={TopOddTriangle} alt="" />
            </div>
          </div>
        )}
        <div className={style.section__services}>
          {servicesHeading && (
            <h3 className={style.services__title}>{servicesHeading}</h3>
          )}
          {services.length && (
            <ul className={style.services__list}>
              {services.map((service) => {
                return (
                  <Service key={`${serviceId}${service.id}`} data={service} />
                );
              })}
            </ul>
          )}
          <div
            className={`${style["bottom-triangle"]} ${style["bottom-triangle--even"]}`}
          >
            <Image src={BottomEvenTriangle} alt="" />
          </div>
          <div
            className={`${style["bottom-triangle"]} ${style["bottom-triangle--odd"]}`}
          >
            <Image src={BottomOddTriangle} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
