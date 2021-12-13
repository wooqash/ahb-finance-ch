import { API_URL } from "@/lib/constants";
import { ParsedUrlQuery } from "querystring";
import { AdvantageData } from "types/elements/advantage-data";
import { GlobalData } from "types/global-data";
import { PageData } from "types/page-data";

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

async function fetchAPI<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);

  try {
    response.parsedBody = await response.json();
  } catch (ex) {
    return Promise.reject(new Error("No data"));
  }

  if (!response.ok) {
    return Promise.reject(new Error(response.statusText));
  }

  return response;
}

export async function get<T>(
  path: string,
  args: RequestInit = {
    method: "get",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  }
): Promise<HttpResponse<T>> {
  return await fetchAPI<T>(new Request(path, args));
}

export async function post<T>(
  path: string,
  body: unknown,
  args: RequestInit = {
    method: "post",
    // headers: {
    //   "Content-Type": "application/json",
    // },
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
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<T>> {
  return await fetchAPI<T>(new Request(path, args));
}

export const getPageData = async (
  params: ParsedUrlQuery,
  locale: string | undefined,
  preview: boolean | null
) => {
  let slug = params?.slug;

  if (slug && Array.isArray(slug)) {
    slug = slug.join("/");
  }
  // Find the pages that match this slug
  const url = locale
    ? `${API_URL}/pages?slug=${slug}&_locale=${locale}&status=published${
        preview ? "&status=draft" : ""
      }`
    : `${API_URL}/pages?slug=${slug}&status=published${
        preview ? "&status=draft" : ""
      }`;
  const pagesData = await get<PageData[]>(url);

  // Make sure we found something, otherwise return null
  if (pagesData.parsedBody && pagesData.parsedBody.length > 0) {
    // Return the first item since there should only be one result per slug
    return pagesData.parsedBody[0];
  }

  return null
};

export const getAllPages = async (locale: string | undefined) => {
  const url = locale
    ? `${API_URL}/pages?_locale=${locale}`
    : `${API_URL}/pages`;

  let allPages: HttpResponse<PageData[]>;
  try {
    allPages = await get<PageData[]>(url);
  } catch (error) {
    const errorMsg = typeof error === 'string' ? error : undefined;
    return Promise.reject(new Error(errorMsg));
  }

  return allPages.parsedBody;
};

export const getPageSlugs = async (page: PageData, preview: boolean | null) => {
    const locales = page.localizations.map((localization) => localization.locale);

    const pagesArr = locales.map(async (locale) => {
        const url = `${API_URL}/pages?_locale=${locale}&title=${page.title}&status=published${
            preview ? "&status=draft" : ""
        }`;
        let otherPage: HttpResponse<PageData[]>;
        try {
            otherPage = await get<PageData[]>(url);
        } catch (error) {
            const errorMsg = typeof error === 'string' ? error : undefined;
            return Promise.reject(new Error(errorMsg));
        }

        return otherPage.parsedBody;
    });

    let pages: (PageData | undefined)[] = [];
    if (pagesArr){
        pages = await (await Promise.all(pagesArr)).flat();
    }

    return pages;
}

export const getGlobalData = async (locale: string | undefined) => {
  const url = locale
    ? `${API_URL}/global?_locale=${locale}`
    : `${API_URL}/global`;

  let global: HttpResponse<GlobalData>;
  try {
    global = await get<GlobalData>(url);
  } catch (error) {
    const errorMsg = typeof error === 'string' ? error : undefined;
    return Promise.reject(new Error(errorMsg));
  }

  return global.parsedBody;
};

export const getPageById = async(id: number) => {
  if (!id) {
    return null;
  }

  const url =  `${API_URL}/pages/${id}`;

  let page: HttpResponse<PageData>;
  try {
    page = await get<PageData>(url);
  } catch (error) {
    const errorMsg = typeof error === 'string' ? error : undefined;
    return Promise.reject(new Error(errorMsg));
  }

  return page.parsedBody;
}
