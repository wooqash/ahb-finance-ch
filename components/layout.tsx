import { ReactNode } from 'react';
import { ExtendedPageContextData } from 'types/page-context-data';

import { GlobalData } from 'types/global-data';
import Navbar from './layout/navbar';

type LayoutProps = {
    children?: ReactNode;
    global: GlobalData;
    pageContext: ExtendedPageContextData;
}

const Layout:React.FC<LayoutProps> = ({ children, global, pageContext }) => {
    const { mainNav } = global;

    return (
        <>
            <Navbar navbar={mainNav} pageContext={pageContext} />
            <div>{children}</div>
        </>
    )
}

export default Layout
