import { NewsletterSubscribeDialogData } from "./newsletter-subscribe-dialog-data";
import { SeoData } from "./seo-data";

export type PageWithNewsletterDialogData = {
  content: string;
  openDialogButtonLabel: string;
  dialog: NewsletterSubscribeDialogData;
  seo?: SeoData;
};
