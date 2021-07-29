import React, { ReactNode, MouseEvent } from "react";
import ModalTitle from "./modal-title";
import { NewsletterSubscribeDialogData } from "../types/newsletter-subscribe-dialog-data";
import Button from "./button";
import CloseIcon from "./Icons/CloseIcon";
import { FormsData } from "types/forms-data";
import { Media } from "types/media";

type ModalProps = {
    isActive: boolean;
    children?: ReactNode;
    id?: string;
    content: NewsletterSubscribeDialogData;
    form?: FormsData;
    logo?: Media | null;
    onClose?: () => void;
}

const Modal:React.FC<ModalProps> = ({isActive, children, id, content, onClose}) => {
        return (
        <div id={id} className={`${isActive ? 'modal--unfoldingIn' : 'modal--unfoldingOut'} fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 transform scale-0`}>
            <div className={`absolute w-full h-full bg-gray-900 opacity-75`} onClick={onClose}></div>
            <div className={`${isActive ? 'modal-content--unfoldingIn' : 'modal-content--unfoldingOut'} max-w-full md:max-w-2xl xl:max-w-screen-lg flex flex-col max-h-90 bg-midnight-green-eagle-green rounded border-white border border-solid shadow-lg z-50 my-10`}>
                <div className="pt-12 pb-6 px-12 w-10/12 mx-auto text-center relative">
                     {content.title && <ModalTitle className="my-0" id="NewsletterTitle">{content.title}</ModalTitle>}
                     <div className="absolute top-9 sm:top-10 -right-4 sm:-right-8 xl:-right-14">
                        <Button id="ModalCloseButton" ariaLabel="close" name="ModalCloseButton" onClick={onClose} variant="contained" className="">
                            <CloseIcon />
                        </Button>
                    </div>
                </div>
                <div className="dialog__content p-8 pt-0 lg:p-10 lg:pt-0 overflow-y-auto">
                    <div className="xl:w-10/12 mx-auto text-center" id="NewsletterDescription">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Modal;