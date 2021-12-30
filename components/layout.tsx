import { ReactNode } from 'react';
import { ExtendedPageContextData } from 'types/page-context-data';

import { GlobalData } from 'types/global-data';
import Navbar from './layout/navbar';
import Footer from './layout/footer';

type LayoutProps = {
    children?: ReactNode;
    global: GlobalData;
    pageContext: ExtendedPageContextData;
}

const Layout:React.FC<LayoutProps> = ({ children, global, pageContext }) => {
    const { mainNav, footer, socialMediaLinks } = global;

    return (
        <>
            <Navbar navbar={mainNav} socialMedia={socialMediaLinks} pageContext={pageContext} />
            <div>{children}</div>
            <Footer footer={footer} socialMedia={socialMediaLinks} pageContext={pageContext} />
        </>
    )
}

export default Layout
