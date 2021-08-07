import { ReactNode } from "react";

type ModalFooterProps = {
    children: ReactNode;
}
 
const ModalFooter:React.FC<ModalFooterProps> = ({children}) => {
    return (
        <div className="p-6 mx-auto text-center relative">
           {children}
        </div>
    );
}
 
 
export default ModalFooter;