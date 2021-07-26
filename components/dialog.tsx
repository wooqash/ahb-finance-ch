import React, { ReactNode, MouseEvent, KeyboardEvent, TransitionEvent } from "react";
import DialogTitle from "./dialog-title";
import NewsletterForm from "./newsletter-form";
import { NewsletterSubscribeDialogData } from "../types/newsletter-subscribe-dialog-data";
import ReactMarkdown from "react-markdown";
import Button from "./button";
import CloseIcon from "./Icons/CloseIcon";
import { FormsData } from "types/forms-data";
import { Media } from "types/media";
import MainLogo from "./main-logo";

type DialogProps = {
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    children?: ReactNode;
    id?: string;
    isOpen: boolean;
    content: NewsletterSubscribeDialogData;
    form?: FormsData;
    logo?: Media | null;
    onClose?: (e: MouseEvent) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
    onTransitionEnd?: (e: TransitionEvent) => void;
}

const Dialog:React.FC<DialogProps> = ({ariaLabelledby, ariaDescribedby, logo, id, isOpen, content, form, onClose, onTransitionEnd, onKeyDown}) => {
        return (
        <div data-open={isOpen || null} id={id} aria-labelledby={ariaLabelledby} aria-describedby={ariaDescribedby} className={(isOpen ? ' opacity-100 pointer-events-auto ' : '') + 'fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 opacity-0 pointer-events-none'} onTransitionEnd={onTransitionEnd} onKeyDown={onKeyDown}>
            <div className="absolute w-full h-full bg-gray-900 opacity-50" onClick={onClose}></div>
            <div className="max-w-full md:max-w-2xl xl:max-w-screen-lg flex flex-col max-h-90 bg-primary rounded border-white border border-solid shadow-lg z-50 overflow-y-auto my-10">
                <div className="pt-12 pb-8 px-6 text-center relative">
                     {content.title && <DialogTitle className="my-0">{content.title}</DialogTitle>}
                     <div className="absolute top-4 right-6">
                        <Button ariaLabel="close" name="DialogCloseButton" onClick={onClose} variant="contained" className="">
                            <CloseIcon />
                        </Button>
                    </div>
                </div>
                <div className="overflow-y-auto p-8 lg:p-10 xl:w-10/12 mx-auto text-center">
                    {logo && <MainLogo logo={logo} />}
                    <div className="lg:w-9/12 mx-auto">
                        {content.offerSummary && <ReactMarkdown>{content.offerSummary}</ReactMarkdown>}
                        {content.confirmationReminder && <ReactMarkdown>{content.confirmationReminder}</ReactMarkdown>}
                    </div>
                    {form && <NewsletterForm content={form}></NewsletterForm>}
                    {content.repeatConfirmationReminder && <div className="text-secondary text-xl font-medium"><ReactMarkdown>{content.repeatConfirmationReminder}</ReactMarkdown></div>}
                    {content.clause && <div className="text-sm"><ReactMarkdown>{content.clause}</ReactMarkdown></div>}
                </div>
            </div>
        </div>
    );
}
 
export default Dialog;