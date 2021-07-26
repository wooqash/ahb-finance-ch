import { ReactNode } from "react";

type DialogTitleProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

const DialogTitle: React.FC<DialogTitleProps> = ({
  id,
  children,
  className,
}) => {
  return (
    <h3 id={id} className={className}>
      {children}
    </h3>
  );
};

export default DialogTitle;
