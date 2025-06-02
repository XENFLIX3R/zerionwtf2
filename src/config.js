
// This file is deprecated. Configurations are now in the src/config/ directory.
// Please import from '@/config' (which points to src/config/index.js)

// This is kept temporarily to avoid breaking existing imports if any were missed,
// but should ideally be removed once all imports are verified.
import { siteConfig as newSiteConfig } from '@/config/index';
export const siteConfig = newSiteConfig;
