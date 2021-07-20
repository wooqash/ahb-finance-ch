import { LocalizationPageData } from "types/localization-page-data";

const API_URL = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`;

interface HttpResponse<T> extends Response {
  parsedBody?: {data?: T, errors?: Array<{message:string}>};
}

// async function fetchAPI2<T>(query, { variables } = {}): Promise<T> {
//   const res = await fetch(API_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query,
//       variables,
//     }),
//   });

//   const json = await res.json();
//   if (json.errors) {
//     throw new Error("Failed to fetch API");
//   }

//   return json.data;
// }

async function fetchAPI<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);
  try {
    // may error if there is no body
    response.parsedBody = await response.json();
  } catch (ex) {
    throw new Error(ex);
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

export async function get<T>(
  path: string,
  args: RequestInit = { method: "get" }
): Promise<HttpResponse<T>> {
  return await fetchAPI<T>(new Request(path, args));
}

export async function post<T>(
  path: string,
  body: { query: string; variables: {} },
  args: RequestInit = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<T>> {
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
): Promise<HttpResponse<T>> {
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

export const getLocalizationPageContent = async (locale: string | undefined) => {
  const data = await post<LocalizationPageData>(API_URL, {
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

  return data?.parsedBody?.data;
};

// export const getGlobals = async (locale) => {
//   const data = await fetchAPI(
//     `
//     query globals($locale: String){
      // global(locale: $locale) {
      //   favicon {
      //     mime
      //     url
      //     width
      //     height
      //   }
      //   siteName
      //   defaultSeo {
      //     metaTitle
      //     metaDescription
      //     metaKeywords
      //     preventIndexing
      //     ogImage {
      //       url
      //     }
      //     cannonicalLink
      //   }
      //   logo {
      //     alternativeText
      //     name
      //     url
      //     width
      //     height
      //   }
      // }
//     }
//     `,
//     {
//       variables: {
//         locale: locale,
//       },
//     }
//   );
//   console.log(data);
//   return data?.global;
// };
