import { heroConfig } from './heroConfig';
import { featuresConfig } from './featuresConfig';
import { showcasesConfig } from './showcasesConfig';
import { ctaConfig } from './ctaConfig';
import { supportConfig } from './supportConfig';
import { faqConfig } from './faqConfig';
import { pricingConfig } from './pricingConfig';
import { testimonialsConfig } from './testimonialsConfig';
import { footerConfig } from './footerConfig';

const discordLink = "https://discord.gg/EqhVZgsd92";
const newLogoUrl = "https://i.ibb.co/QjKMsSNJ/Zerion-Wtf-Transparent.png";

export const siteConfig = {
  name: "Zerion.Wtf",
  logoUrl: newLogoUrl,
  description: "The Premier Serverside Execution Platform",
  discordUrl: discordLink,
  hero: heroConfig,
  features: featuresConfig,
  showcases: showcasesConfig,
  cta: ctaConfig,
  support: supportConfig,
  faq: faqConfig,
  pricing: pricingConfig,
  testimonials: testimonialsConfig,
  footer: footerConfig,
};