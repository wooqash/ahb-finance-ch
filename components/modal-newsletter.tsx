import { ReactNode } from "react";
import { NewsletterSubscribeDialogData } from "types/newsletter-subscribe-dialog-data";
import MainLogo from "./main-logo";
import NewsletterForm from "./newsletter-form";
import ReactMarkdown from "react-markdown";
import rmStyles from '@/components/markdown-styles.module.scss';
import { FormsData } from "types/forms-data";
import { Media } from "types/media";
import Modal from '@/components/modal';

type ModalNewsletterProps = {
    isActive: boolean;
    id?: string;
    content: NewsletterSubscribeDialogData;
    form?: FormsData;
    logo?: Media | null;
    onClose?: () => void;
}
 
const ModalNewsletter:React.FC<ModalNewsletterProps> = ({logo, form, isActive, id, content, onClose}) => {
    return (
        <Modal logo={logo} content={content} form={form} isActive={isActive} id={id} onClose={onClose}>
            {logo && <MainLogo logo={logo} />}
            <div className="lg:w-9/12 mx-auto">
                {content.offerSummary && <ReactMarkdown className={`${rmStyles.markdown}`}>{content.offerSummary}</ReactMarkdown>}
                {content.confirmationReminder && <ReactMarkdown className={`${rmStyles.markdown}`}>{content.confirmationReminder}</ReactMarkdown>}
            </div>
            {form && <NewsletterForm content={form}></NewsletterForm>}
            {content.repeatConfirmationReminder && <div className="text-secondary text-xl font-medium"><ReactMarkdown className={`${rmStyles.markdown}`}>{content.repeatConfirmationReminder}</ReactMarkdown></div>}
            {content.clause && <div className="text-sm"><ReactMarkdown className={`${rmStyles.markdown}`}>{content.clause}</ReactMarkdown></div>}
        </Modal>
    );
}
 
 
export default ModalNewsletter;