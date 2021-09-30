import { MouseEvent } from "react";

import { ReactNode } from "react";

import Button from "@/components/button";
import CloseIcon from "@/components/Icons/CloseIcon";

type ModalHeaderProps = {
    children: ReactNode;
    onClose?: (e: MouseEvent<HTMLElement>) => void;
};

const ModalHeader: React.FC<ModalHeaderProps> = ({children, onClose}) => {
  return (
    <div className="pt-12 pb-6 px-12 w-10/12 mx-auto text-center relative">
      {children}
      <div className="absolute top-9 sm:top-10 -right-4 sm:-right-8 xl:-right-14">
        <Button
          id="ModalCloseButton"
          ariaLabel="close"
          name="ModalCloseButton"
          onClick={onClose}
          variant="contained"
          className=""
        >
          <CloseIcon />
        </Button>
      </div>
    </div>
  );
};

export default ModalHeader;
