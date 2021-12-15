import { ArticleData } from "types/blog-data";
import { ButtonLinkData } from "types/buttons-data";
import { BlogData } from "types/sections-data";
import { getButtonAppearance } from "utils/button";
import Card from "../elements/card";
import ButtonLink from "../links/button-link";

type BlogProps = {
    data: BlogData;
    articles?: ArticleData[];
}
 
const Blog:React.FC<BlogProps> 
= (props) => {
    const { data, articles } = props;
    const { title, moreBtn } = data;

    return (
        <section>
            <h2>{title}</h2>
            {moreBtn && <ButtonLink
                button={moreBtn}
                appearance={moreBtn ? getButtonAppearance(moreBtn.type, "light") : ""}
            />}
            {articles?.map((article) => {
                return (<Card article={article} key={article.id} />);
            })}
        </section>
    );
};

export default Blog;