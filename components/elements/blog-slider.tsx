import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Slide from "./slide";
import { ArticleData } from "types/blog-data";

type BlogSliderProps = {
  data: ArticleData[];
};

const BlogSlider: React.FC<BlogSliderProps> = (props) => {
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
          <Slide article={data} key={data.id} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BlogSlider;
