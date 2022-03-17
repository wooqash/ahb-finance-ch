import ReactMarkdown from "react-markdown";

import { FormsData } from "types/forms-data";

import NewsletterForm from "@/components/NewsletterForm/NewsletterForm";

import { NewsletterModalInfoData } from "types/newsletter-modal-info-data";



type NewsletterModalProps = {
  id?: string;
  content: NewsletterModalInfoData;
  form?: FormsData;
  onLoading: (isLoding: boolean) => void;
};

const NewsletterModal: React.FC<NewsletterModalProps> = ({
  form,
  content,
  onLoading,
}) => {
  return (
    <>
      {content.title && <h4>{content.title}</h4>}
      {content.offerSummary && (
        <ReactMarkdown>
          {content.offerSummary}
        </ReactMarkdown>
      )}
      {content.confirmationReminder && (
        <ReactMarkdown>
          {content.confirmationReminder}
        </ReactMarkdown>
      )}

      {form && (
        <NewsletterForm content={form} onLoading={onLoading}></NewsletterForm>
      )}
      {content.repeatConfirmationReminder && (
        <ReactMarkdown className="markdown-styles awarded">
          {content.repeatConfirmationReminder}
        </ReactMarkdown>
      )}
      {content.clause && (
        <div className="small-text">
          <ReactMarkdown>
            {content.clause}
          </ReactMarkdown>
        </div>
      )}
    </>
  );
};

export default NewsletterModal;
