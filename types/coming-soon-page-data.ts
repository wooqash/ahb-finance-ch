import { GlobalData } from "./global-data";
import { NewsletterSubscribeDialogData } from "./newsletter-subscribe-dialog-data";
import { SeoData } from "./seo-data";


export type ComingSoonPageData = {
  comingSoon: {
    content: string;
    openDialogButtonLabel: string;
    dialog: NewsletterSubscribeDialogData;
    seo?: SeoData;
  };
  global: GlobalData;
};