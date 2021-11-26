import { NextSeo } from "next-seo";
import { ExtendedPageContextData } from "types/page-context-data";
import { SeoData } from "types/seo-data";

type SeoProps = {
    seo: SeoData;
    pageContext: ExtendedPageContextData;
}
 
const Seo:React.FC<SeoProps> = ({seo, pageContext}) => {
    return (
        <NextSeo>
            Seo
        </NextSeo>
    );
}
 
 
export default Seo;