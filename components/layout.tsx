import { ReactNode } from "react";
import { GlobalData } from "types/global-data";
import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";

type LayoutProps = {
  preview: boolean | null;
  children: ReactNode;
  globalSettings: GlobalData;
};

const Layout: React.FC<LayoutProps> = ({
  preview,
  children,
  globalSettings,
}) => {
  return (
    <>
      <Meta globalSettings={globalSettings} />
      <div className="min-h-screen md:max-w-full">
        {/* <Alert preview={preview} /> */}
        <main className="mt-40 pb-40 md:mt-0 md:pb-0 md:flex md:items-center md:min-h-screen">{children}</main>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
