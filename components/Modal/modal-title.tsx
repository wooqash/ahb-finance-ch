import { ReactNode } from "react";

type ModalTitleProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

const ModalTitle: React.FC<ModalTitleProps> = ({
  id,
  children,
  className,
}) => {
  return (
    <h3 id={id} className={className || ''}>
      {children}
    </h3>
  );
};

export default ModalTitle;
