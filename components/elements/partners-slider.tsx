import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import { PartnersGroupData } from "types/sections-data";
import { PartnerItemData } from "types/elements/partner-item-data";
import CustomImage from "./custom-image";
import useDeviceDetect from "@/lib/useDeviceDetect";

import style from "./partners-slider.module.scss";
import CustomLink from "../links/custom-link";

type PartnersSliderProps = {
  data: PartnersGroupData;
};

type PartnersSlideProps = {
  data: PartnerItemData;
};

const PartnersSlide: React.FC<PartnersSlideProps> = (props) => {
  const { data } = props;
  const {
    id,
    name,
    description,
    company,
    smallImage,
    largeImage,
    companyLogo,
    companyUrl,
  } = data;
  const isMobile = useDeviceDetect();

  return (
    <div className={style.partner}>
      <p className={style.partner__description}>{description}</p>
      <div className={style.partner__info}>
        {isMobile && smallImage && (
          <div className={style.partner__image}>
            <CustomImage media={smallImage} />
          </div>
        )}
        {!isMobile && largeImage && (
          <div className={style.partner__image}>
            <CustomImage media={largeImage} />
          </div>
        )}
        <div className={style.partner__details}>
          <div>
            <p className={style.partner__name}>{name}</p>
            <p className={style.partner__company}>{company}</p>
          </div>
          {companyLogo && companyUrl && (
            <CustomLink
              id={`PartnerLink${id}`}
              link={companyUrl}
              className={style.item__link}
            >
              <div className={style["partner__company-logo"]}>
                <CustomImage media={companyLogo} />
              </div>
            </CustomLink>
          )}
          {companyLogo && !companyUrl && (
            <div className={style["partner__company-logo"]}>
              <CustomImage media={companyLogo} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PartnersSlider: React.FC<PartnersSliderProps> = (props) => {
  const { data } = props;
  const isMobile = useDeviceDetect();

  return (
    <>
      {isMobile && (
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          autoHeight={true}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            992: {
              slidesPerView: 2,
              autoHeight: false,
            },
          }}
        >
          {data.partners.map((partner) => (
            <SwiperSlide key={`Mobile${partner.id}`}>
              <PartnersSlide data={partner} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {!isMobile && data.partners.length > 2 && (
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          autoHeight={true}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            992: {
              slidesPerView: 2,
              autoHeight: false,
            },
          }}
        >
          {data.partners.map((partner) => (
            <SwiperSlide key={`Desktop${partner.id}`}>
              <PartnersSlide data={partner} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {!isMobile && data.partners.length <=2 && (
        <div className={style["partner-container"]}>
          {data.partners.map((partner) => (
              <PartnersSlide data={partner} key={partner.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default PartnersSlider;
