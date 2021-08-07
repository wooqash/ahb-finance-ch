import React, { ReactNode, MouseEvent } from "react";

type ModalProps = {
    isActive: boolean;
    children?: ReactNode;
    id?: string;
    // content: NewsletterSubscribeDialogData | { title: string};
    // form?: FormsData;
    // logo?: Media | null;
    onClose?: (e: MouseEvent<HTMLElement>) => void;
}

const Modal:React.FC<ModalProps> = ({isActive, children, id, onClose}) => {
        return (
        <div id={id} className={`${isActive ? 'modal--unfoldingIn' : 'modal--unfoldingOut'} fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 transform scale-0`}>
            <div className={`absolute w-full h-full bg-gray-900 opacity-75`} onClick={onClose}></div>
            <div className={`${isActive ? 'modal-content--unfoldingIn' : 'modal-content--unfoldingOut'} max-w-full md:max-w-2xl xl:max-w-screen-lg flex flex-col max-h-90 bg-midnight-green-eagle-green rounded border-white border border-solid shadow-lg z-50 my-10`}>
                {children}
            </div>
        </div>
    );
}
 
export default Modal;