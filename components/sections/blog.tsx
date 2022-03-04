import { ArticleData } from "types/blog-data";
import { BlogData } from "types/sections-data";
import { getButtonAppearance } from "utils/button";
import { BlogSlider, BlogCard } from "../elements/blog-slider";
import ButtonLink from "../links/button-link";
import useDeviceDetect from "@/lib/useDeviceDetect";

import style from "./blog.module.scss";

type BlogProps = {
  data: BlogData;
  articles?: ArticleData[];
};

const Blog: React.FC<BlogProps> = (props) => {
  const { data, articles } = props;
  const { title, moreBtn } = data;
  const isMobile = useDeviceDetect();

  return (
    <section className={`blog ${style.section}`}>
      <div className={style.section__wrapper}>
        <h2 className={style.section__title}>{title}</h2>
        <div className={style.section__readMoreBtn}>
          {moreBtn && (
            <ButtonLink
              button={moreBtn}
              appearance={
                moreBtn ? getButtonAppearance(moreBtn.type, "dark") : ""
              }
            />
          )}
        </div>
        {articles && (
          <>
            {isMobile && (
              <div className={style.section__blogCards}>
                {articles.map((article) => (
                  <BlogCard article={article} key={article.id} />
                ))}
              </div>
            )}
            {!isMobile && <BlogSlider data={articles} />}
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;
