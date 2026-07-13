import { Helmet } from 'react-helmet-async';
import { COMPANY } from '../data/content';

export default function SEO({ title, description, path = '/' }) {
  const fullTitle = title ? `${title} | AITechPulze` : 'AITechPulze | AI Powered Software Development Company';
  const desc = description || COMPANY.description;
  const url = `${COMPANY.url}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={COMPANY.ogImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={COMPANY.ogImage} />
    </Helmet>
  );
}
