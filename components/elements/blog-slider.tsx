import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import { ArticleData } from "types/blog-data";
import CustomLink from "../links/custom-link";

import style from "./blog-slider.module.scss";
import CustomImage from "./custom-image";

type BlogSliderProps = {
  data: ArticleData[];
};

type BlogCardProps = {
  article: ArticleData;
};

export const BlogCard: React.FC<BlogCardProps> = (props) => {
  const { article } = props;
  const { image, title } = article;
  const link = {
    id: article.id,
    label: "",
    url: `/article/${article.slug}`,
    newTab: false,
  };

  return (
    <div className={style.item}>
        <CustomLink id={`ArticleLink${article.id}`} link={link} className={style.item__link}>
          <>
            <div className={style.item__image}><CustomImage media={image} layout="fill" /></div>
            <h3 className={style.item__title}>{title}</h3>
          </>
        </CustomLink>
    </div>
  );
};

export const BlogSlider: React.FC<BlogSliderProps> = (props) => {
  const { data } = props;

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={16}
      slidesPerView={3}
      loop={true}
      navigation
      pagination={{ clickable: true }}
    >
      {data.map((data) => (
        <SwiperSlide key={data.id}>
          <BlogCard article={data} key={data.id} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

