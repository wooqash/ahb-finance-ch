import { SectionsData } from "types/sections/sections-data";

type RichTextWithCtaProps = {
    data: SectionsData,
}
 
const RichTextWithCta:React.FC<RichTextWithCtaProps> = (props) => {
    const { data } = props;
    return (
        <div>
            RichTextWithCta
        </div>
    );
}
 
 
export default RichTextWithCta;