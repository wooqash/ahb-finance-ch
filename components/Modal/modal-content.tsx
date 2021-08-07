import { ReactNode } from "react";

type ModalContentProps = {
    children: ReactNode;
};

const ModalContent: React.FC<ModalContentProps> = ({children}) => {
  return (
    <div className="dialog__content p-8 pt-0 lg:p-10 lg:pt-0 overflow-y-auto">
      <div
        className="xl:w-10/12 mx-auto text-center"
        id="NewsletterDescription"
      >
        {children}
      </div>
    </div>
  );
};

export default ModalContent;
