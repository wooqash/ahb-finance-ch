import { ReactNode } from 'react';
import { ExtendedPageContextData } from 'types/page-context-data';
import { SeoData } from 'types/seo-data';

import Seo from "./seo";

type LayoutProps = {
    children?: ReactNode;
    seo: SeoData;
    pageContext: ExtendedPageContextData;
}

const Layout:React.FC<LayoutProps> = ({ children, seo, pageContext }) => {

    return (
        <>
            <Seo seo={seo} pageContext={pageContext} />
            <div>Layout test</div>
        </>
    )
}

export default Layout
