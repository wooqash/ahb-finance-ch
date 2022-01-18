import { ReactNode } from 'react';
import { ExtendedPageContextData } from 'types/page-context-data';

import { GlobalData } from 'types/global-data';

import Footer from './layout/footer';
import { PageAppearance } from 'types/page-appearance.enum';
import { DEFAULT_LABELS } from 'utils/default-labels';
import Navbar from './top-bar/navbar';

type LayoutProps = {
    children?: ReactNode;
    global: GlobalData;
    pageContext: ExtendedPageContextData;
    appearance: PageAppearance;
}

const Layout:React.FC<LayoutProps> = (props) => {
    const { children, global, pageContext, appearance } = props;
    const { mainNav, footer, socialMediaLinks, skipToMainContentLabel = DEFAULT_LABELS.skipToMainContentLabel } = global;

    return (
        <>
            <Navbar navbar={mainNav} socialMedia={socialMediaLinks} skipLabel={skipToMainContentLabel} pageContext={pageContext} appearance={appearance} />
            <main id="Main">{children}</main>
            <Footer footer={footer} socialMedia={socialMediaLinks} pageContext={pageContext} />
        </>
    )
}

export default Layout
