import { ReactNode } from 'react';
import { ExtendedPageContextData } from 'types/page-context-data';
import { SeoData } from 'types/seo-data';

import Seo from "@/components/seo";
import { GlobalData } from 'types/global-data';
import Navbar from './layout/navbar';

type LayoutProps = {
    children?: ReactNode;
    seo: SeoData;
    global: GlobalData;
    pageContext: ExtendedPageContextData;
}

const Layout:React.FC<LayoutProps> = ({ children, seo, global, pageContext }) => {
    const { mainNav } = global;

    return (
        <>
            <Seo seo={seo} pageContext={pageContext} />
            <Navbar navbar={mainNav} pageContext={pageContext} />
            <div>{children}</div>
        </>
    )
}

export default Layout
