import { ReactNode } from "react";
import { GlobalData } from "types/global-data";
import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";
import styles from "./layout.module.scss";

type LayoutCleanProps = {
  preview: boolean | null;
  children: ReactNode;
  globalSettings: GlobalData;
  classNames?: string;
};

const LayoutClean: React.FC<LayoutCleanProps> = ({
  preview,
  children,
  globalSettings,
  classNames,
}) => {
  return (
    <div className={`${styles.pageWrapper} ${styles['pageWrapper--clean']} ${classNames || ''}`}>
      <Meta globalSettings={globalSettings} />
      <div className="min-h-screen md:max-w-full">
        {/* <Alert preview={preview} /> */}
        <main className="py-40 md:py-56 md:min-h-screen">
          {children}
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default LayoutClean;
