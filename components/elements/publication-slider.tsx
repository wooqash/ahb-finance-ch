import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import { PublicationsGroupData } from "types/sections-data";
import { PublicationItemData } from "types/elements/publication-item-data";
import CustomImage from "./custom-image";
import ButtonLink from "../links/button-link";
import { getButtonAppearance } from "utils/button";

import style from "./publication-slider.module.scss";

type PublicationSliderProps = {
  data: PublicationsGroupData;
};

type PublicationSlideProps = {
  data: PublicationItemData;
};

const PublicationSlide: React.FC<PublicationSlideProps> = (props) => {
  const { data } = props;
  const { title, description, links, image } = data;
  return (
    <div className={style.item}>
      <div className={style.item__content}>
        <h3 className={style.item__title}>{title}</h3>
        <div className={style.item__description}>{description}</div>
        <div className={style.item__links}>
          {links.map((link) => {
            return (
              <ButtonLink
                button={link}
                appearance={getButtonAppearance(link.type, "dark")}
                key={link.id}
              />
            );
          })}
        </div>
      </div>
      {image && (
        <div className={style["item__image-wrapper"]}>
          <div className={style.image}>
            <CustomImage media={image} />
          </div>
          
        </div>
      )}
    </div>
  );
};

const PublicationSlider: React.FC<PublicationSliderProps> = (props) => {
  const { data } = props;

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={16}
      slidesPerView={1}
      loop={true}
      navigation
      pagination={{ clickable: true, type: "fraction" }}
    >
      {data.publications.map((publication) => (
        <SwiperSlide key={`Publication${publication.id}`}>
          <PublicationSlide data={publication} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PublicationSlider;
