import { ComingSoonPageData } from "types/coming-soon-page-data";
import { LocalizationPageData } from "types/localization-page-data";
import { ThankYouPageData } from "types/thank-you-page-data";
import { FinalThankYouPageData } from "types/final-thank-you-page-data";
import { PrivacyPolicyPageData } from "types/privacy-policy-page-data";
import { Custom404PageData } from "types/custom-404-error-page-data";
import { API_URL, CK_API_KEY, CK_API_URL, CK_DE_FORM_ID, CK_PL_FORM_ID, CK_EN_FORM_ID } from "@/lib/constants";
import { NewsletterFormValues } from "types/newsletter-form-values";
import { RecaptchaResData } from "types/recaptcha-res-data";

interface JSONResponse<T> extends Response {
  data?: T;
  subscription?: T,
  errors?: Array<{ message: string }>
}

async function fetchAPI<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  const { data, errors, subscription }: JSONResponse<T> = await response.json();

  if(response.ok) {
    if (data) {
      return data;
    }
    else if (subscription) {
      return subscription;
    } else {
      return Promise.reject(new Error(`No data`))
    }
  } else {
    // handle the graphql errors
    const error = new Error(errors?.map(e => e.message).join('\n') ?? 'unknown error')
    return Promise.reject(error);
  }
}

export async function get<T>(
  path: string,
  args: RequestInit = { method: "get" }
): Promise<T> {
  return await fetchAPI<T>(new Request(path, args));
}

export async function post<T>(
  path: string,
  body: unknown,
  args: RequestInit = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }
): Promise<T> {
  return await fetchAPI<T>(new Request(path, args));
}

export async function put<T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }
): Promise<T> {
  return await fetchAPI<T>(new Request(path, args));
}

// export async function getPreviewPostBySlug(slug) {
//   const data = await fetchAPI(
//     `
//   query PostBySlug($where: JSON) {
//     posts(where: $where) {
//       slug
//     }
//   }
//   `,
//     {
//       variables: {
//         where: {
//           slug,
//         },
//       },
//     }
//   );
//   return data?.posts[0];
// }

// export async function getPreviewArticlesBySlug(slug) {
//   const data = await fetchAPI(
//     `
//   query ArticlesBySlug($where: JSON) {
//     articles(where: $where) {
//       slug
//     }
//   }
//   `,
//     {
//       variables: {
//         where: {
//           slug,
//         },
//       },
//     }
//   );
//   return data?.articles[0];
// }

// export async function getAllPostsWithSlug() {
//   const data = fetchAPI(`
//     {
//       posts {
//         slug
//       }
//     }
//   `);
//   return data?.allPosts;
// }

// export async function getAllPostsForHome(preview) {
//   const data = await fetchAPI(
//     `
//     query Posts($where: JSON){
//       posts(sort: "date:desc", limit: 10, where: $where) {
//         title
//         slug
//         excerpt
//         date
//         coverImage {
//           url
//         }
//         author {
//           name
//           picture {
//             url
//           }
//         }
//       }
//     }
//   `,
//     {
//       variables: {
//         where: {
//           ...(preview ? {} : { status: "published" }),
//         },
//       },
//     }
//   );
//   return data?.posts;
// }

// export async function getAllArticles(preview) {
//   const data = await fetchAPI(
//     `
//     query Articles($where: JSON){
//       articles(limit: 10, where: $where) {
//         title
//         slug
//         description
//         content
//         category {
//           name
//         }
//         author {
//           name
//           picture {
//             url
//           }
//         }
//       }
//     }
//   `,
//     {
//       variables: {
//         where: {
//           ...(preview ? {} : { status: "published" }),
//         },
//       },
//     }
//   );
//   return data;
// }

// export async function getPostAndMorePosts(slug, preview) {
//   const data = await fetchAPI(
//     `
//   query PostBySlug($where: JSON, $where_ne: JSON) {
//     posts(where: $where) {
//       title
//       slug
//       content
//       date
//       ogImage: coverImage{
//         url
//       }
//       coverImage {
//         url
//       }
//       author {
//         name
//         picture {
//           url
//         }
//       }
//     }

//     morePosts: posts(sort: "date:desc", limit: 2, where: $where_ne) {
//       title
//       slug
//       excerpt
//       date
//       coverImage {
//         url
//       }
//       author {
//         name
//         picture {
//           url
//         }
//       }
//     }
//   }
//   `,
//     {
//       preview,
//       variables: {
//         where: {
//           slug,
//           ...(preview ? {} : { status: "published" }),
//         },
//         where_ne: {
//           ...(preview ? {} : { status: "published" }),
//           slug_ne: slug,
//         },
//       },
//     }
//   );
//   return data;
// }

export const getLocalizationPageContent = async (
  locale: string | undefined
) => {
  const response = await post<LocalizationPageData>(API_URL, {
    query: `
  query localizationPage($locale: String){
    localizationPage(locale: $locale) {
      mainText
      ukButton {
        label
        url
        openInNewTab
      }
      chButton {
        label
        url
        openInNewTab
      }
      seo {
        metaTitle
        metaDescription
        metaKeywords
        preventIndexing
        cannonicalLink
        ogImage {
          url
          width
          height
        }
      }
    }
    global(locale: $locale) {
      favicon {
        mime
        url
        width
        height
      }
      siteName
      defaultSeo {
        metaTitle
        metaDescription
        metaKeywords
        preventIndexing
        ogImage {
          url
        }
        cannonicalLink
      }
      logo {
        alternativeText
        name
        url
        width
        height
      }
    }
  }
  `,
    variables: {
      locale: locale,
    },
  });

  return response;
};

export const getComingSoonPageContent = async (locale: string | undefined) => {
  const response = await post<ComingSoonPageData>(API_URL, {
    query: `
  query comingSoon($locale: String){
  	comingSoon(locale: $locale){
    	content
    	openDialogButtonLabel
    	seo {
        metaTitle
        metaDescription
        metaKeywords
        preventIndexing
        cannonicalLink
        ogImage {
          alternativeText
          name
          url
          width
          height
        }
      }
    	dialog {
        title
        clause
        confiramtionReminder
        offerSummary
        repeatConfirmationReminder
      }
  	}
    global(locale: $locale) {
      favicon {
        mime
        url
        width
        height
      }
      siteName
      defaultSeo {
        metaTitle
        metaDescription
        metaKeywords
        preventIndexing
        ogImage {
          url
        }
        cannonicalLink
      }
      logo {
        alternativeText
        name
        url
        width
        height
      }
      form {
        nameLabel
        emailLabel
        subscribeButtonLabel
        requiredFieldErrorMsg
        fieldTooShortErrorMsg
        fieldTooLongErrorMsg
        invalidEmailFormatErrorMsg
        namePlaceholderMsg
        emailPlaceholderMsg
        unhandledExeptionLabel
      }
      cookieInfo {
        cookieBannerText
        settingsTitle
        settingsButtonLabel
        acceptAllCookiesButtonLabel
        acceptSelectedCookiesButtonLabel
        acceptNecessaryCookiesButtonLabel
        acceptButtonLabel
        cookieLblSingle
        cookieLblPlural
        tabs {
          id
          label
          description
        }
        groups {
          id
          groupName
          title
          description
        }
      }
    }
  }
  `,
    variables: {
      locale: locale,
    },
  });

  return response;
};

export const getThankYouPageContent = async (locale: string | undefined) => {
  const response = await post<ThankYouPageData>(API_URL, {
    query: `
    query thankYouPage($locale: String){
      thankYouPage(locale: $locale){
        content
        seo {
          metaTitle
          metaDescription
          metaKeywords
          preventIndexing
          cannonicalLink
          ogImage {
            alternativeText
            name
            url
            width
            height
          }
        }
      }
      global(locale: $locale) {
        favicon {
          mime
          url
          width
          height
        }
        siteName
        defaultSeo {
          metaTitle
          metaDescription
          metaKeywords
          preventIndexing
          ogImage {
            url
          }
          cannonicalLink
        }
        logo {
          alternativeText
          name
          url
          width
          height
        }
        cookieInfo {
          cookieBannerText
          settingsTitle
          settingsButtonLabel
          acceptAllCookiesButtonLabel
          acceptSelectedCookiesButtonLabel
          acceptNecessaryCookiesButtonLabel
          acceptButtonLabel
          cookieLblSingle
          cookieLblPlural
          tabs {
            id
            label
            description
          }
          groups {
            id
            groupName
            title
            description
          }
        },
        backToMainPageButtonLabel
      }
    }
  `,
    variables: {
      locale: locale,
    },
  });

  return response;
};

export const getFinalThankYouPageContent = async (
  locale: string | undefined
) => {
  const response = await post<FinalThankYouPageData>(API_URL, {
    query: `
    query finalThankYouPage($locale: String){
      finalThankYouPage(locale: $locale){
        content
        seo {
          metaTitle
          metaDescription
          metaKeywords
          preventIndexing
          cannonicalLink
          ogImage {
            alternativeText
            name
            url
            width
            height
          }
        }
      }
      global(locale: $locale) {
        favicon {
          mime
          url
          width
          height
        }
        siteName
        defaultSeo {
          metaTitle
          metaDescription
          metaKeywords
          preventIndexing
          ogImage {
            url
          }
          cannonicalLink
        }
        logo {
          alternativeText
          name
          url
          width
          height
        }
        cookieInfo {
          cookieBannerText
          settingsTitle
          settingsButtonLabel
          acceptAllCookiesButtonLabel
          acceptSelectedCookiesButtonLabel
          acceptNecessaryCookiesButtonLabel
          acceptButtonLabel
          cookieLblSingle
          cookieLblPlural
          tabs {
            id
            label
            description
          }
          groups {
            id
            groupName
            title
            description
          }
        },
        backToMainPageButtonLabel
      }
    }
  `,
    variables: {
      locale: locale,
    },
  });

  return response;
};

export const getPrivacyPolicyPageContent = async (
  locale: string | undefined
) => {
  const response = await post<PrivacyPolicyPageData>(API_URL, {
    query: `
    query privacyPolicyPage($locale: String){
      privacyPolicyPage(locale: $locale){
        content
        seo {
          metaTitle
          metaDescription
          metaKeywords
          preventIndexing
          cannonicalLink
          ogImage {
            alternativeText
            name
            url
            width
            height
          }
        }
      }
      global(locale: $locale) {
        favicon {
          mime
          url
          width
          height
        }
        siteName
        defaultSeo {
          metaTitle
          metaDescription
          metaKeywords
          preventIndexing
          ogImage {
            url
          }
          cannonicalLink
        }
        logo {
          alternativeText
          name
          url
          width
          height
        }
        cookieInfo {
          cookieBannerText
          settingsTitle
          settingsButtonLabel
          acceptAllCookiesButtonLabel
          acceptSelectedCookiesButtonLabel
          acceptNecessaryCookiesButtonLabel
          acceptButtonLabel
          cookieLblSingle
          cookieLblPlural
          tabs {
            id
            label
            description
          }
          groups {
            id
            groupName
            title
            description
          }
        }
      }
    }
  `,
    variables: {
      locale: locale,
    },
  });

  return response;
};

export const getCustom404PageContent = async (locale: string | undefined) => {
  const response = await post<Custom404PageData>(API_URL, {
    query: `
  query custom404Page($locale: String){
  	custom404Page(locale: $locale){
    	content
    	openDialogButtonLabel
    	seo {
        metaTitle
        metaDescription
        metaKeywords
        preventIndexing
        cannonicalLink
        ogImage {
          alternativeText
          name
          url
          width
          height
        }
      }
    	dialog {
        title
        clause
        confiramtionReminder
        offerSummary
        repeatConfirmationReminder
      }
  	}
    global(locale: $locale) {
      favicon {
        mime
        url
        width
        height
      }
      siteName
      defaultSeo {
        metaTitle
        metaDescription
        metaKeywords
        preventIndexing
        ogImage {
          url
        }
        cannonicalLink
      }
      logo {
        alternativeText
        name
        url
        width
        height
      }
      form {
        nameLabel
        emailLabel
        subscribeButtonLabel
        requiredFieldErrorMsg
        fieldTooShortErrorMsg
        fieldTooLongErrorMsg
        invalidEmailFormatErrorMsg
        namePlaceholderMsg
        emailPlaceholderMsg
        unhandledExeptionLabel
      }
      cookieInfo {
        cookieBannerText
        settingsTitle
        settingsButtonLabel
        acceptAllCookiesButtonLabel
        acceptSelectedCookiesButtonLabel
        acceptNecessaryCookiesButtonLabel
        acceptButtonLabel
        cookieLblSingle
        cookieLblPlural
        tabs {
          id
          label
          description
        }
        groups {
          id
          groupName
          title
          description
        }
      }
    }
  }
  `,
    variables: {
      locale: locale,
    },
  });

  return response;
};

const getFormIdByLocale = (locale: string | undefined) => {
  switch(locale?.toLowerCase()) {
    case 'pl':
      return CK_PL_FORM_ID;
    case 'en':
      return CK_EN_FORM_ID;
    default: 
      return CK_DE_FORM_ID;
  }
}

export const subscribeToNewsletter = async(locale: string | undefined, values: NewsletterFormValues) => {
  const formId = getFormIdByLocale(locale);
  const response = await post(`${CK_API_URL}forms/${formId}/subscribe`, {...values, api_key: CK_API_KEY});

  return response;
};

export const validateReCaptcha = async (token: string) => {
  const response = await post<RecaptchaResData>(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/recaptcha`, {token});

  return response;
}
