import { RichtextWithCtaData } from "types/sections-data";
import { getButtonAppearance } from "utils/button";
import ButtonLink from "../links/button-link";

type RichTextWithCtaProps = {
    data: RichtextWithCtaData,
}
 
const RichTextWithCta:React.FC<RichTextWithCtaProps> = (props) => {
    const { data } = props;
    return (
        <section>
            <h2>{data.title}</h2>
            <p>{data.content}</p>
            {data.cta?.map((button) => {
                return <ButtonLink
                    button={button}
                    appearance={getButtonAppearance(button.type, "light")}
                    key={button.id}
                />
            })}
        </section>
    );
}
 
 
export default RichTextWithCta;