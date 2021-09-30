import { getPrivacyPolicyPageContent } from '@/lib/api'

export default async function thankYou(req: { query: { secret: string | undefined; locale: string | undefined; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; setPreviewData: (arg0: {}) => void; writeHead: (arg0: number, arg1: { Location: string; }) => void; end: () => void; }) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.STRAPI_PREVIEW_SECRET ||
    !req.query.locale
  ) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const post = await getPrivacyPolicyPageContent(req.query.locale);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Invalid locale' });
  }

  const locale = req.query.locale.substr(0,2);

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/${locale}` });
  res.end()
}
