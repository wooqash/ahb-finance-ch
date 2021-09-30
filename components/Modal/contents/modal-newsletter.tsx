import ReactMarkdown from "react-markdown";

import { NewsletterSubscribeDialogData } from "types/newsletter-subscribe-dialog-data";
import { Media } from "types/media";
import { FormsData } from "types/forms-data";

import MainLogo from "@/components/main-logo";
import NewsletterForm from "@/components/newsletter-form";

import rmStyles from '@/components/markdown-styles.module.scss';

type ModalNewsletterProps = {
    content: NewsletterSubscribeDialogData;
    form?: FormsData;
    logo?: Media | null;
    onLoading: (isLoding: boolean) => void;
}
 
const ModalNewsletter:React.FC<ModalNewsletterProps> = ({logo, form, content, onLoading}) => {

    return (
        <>
            {logo && <MainLogo logo={logo} />}
              <div className="lg:w-9/12 mx-auto">
                  {content.offerSummary && <ReactMarkdown className={`${rmStyles.markdown}`}>{content.offerSummary}</ReactMarkdown>}
                  {content.confirmationReminder && <ReactMarkdown className={`${rmStyles.markdown}`}>{content.confirmationReminder}</ReactMarkdown>}
              </div>
              {form && <NewsletterForm content={form} onLoading={onLoading}></NewsletterForm>}
              {content.repeatConfirmationReminder && <div className="text-secondary text-xl font-medium"><ReactMarkdown className={`${rmStyles.markdown}`}>{content.repeatConfirmationReminder}</ReactMarkdown></div>}
              {content.clause && <div className="text-sm"><ReactMarkdown className={`${rmStyles.markdown}`}>{content.clause}</ReactMarkdown></div>}
        </>
    );
}
 
 
export default ModalNewsletter;