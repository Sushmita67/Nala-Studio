/** Configurable Formspree endpoint ID — also editable in Admin → Settings */
export const DEFAULT_FORMSPREE_FORM_ID = 'manppgvr';

/** Bump when seed shape / public UI changes so stale localStorage refreshes */
export const STORAGE_KEY = 'nala-studio-data-v5';
export const ADMIN_SESSION_KEY = 'nala-admin-session-v5';

export const DEFAULT_ADMIN_EMAIL = 'owner@nalastudio.com.np';
export const DEFAULT_ADMIN_PASSWORD = 'nala2026';

/** Session length for owner auth (ms) — 12 hours */
export const ADMIN_SESSION_TTL_MS = 12 * 60 * 60 * 1000;

export const BRAND = {
  name: 'NALA Studio',
  tagline: 'Nails • Lashes • Makeup • Beauty Education',
  phone: '9703422242',
  phoneHref: 'tel:9703422242',
  whatsapp: 'https://wa.me/9779703422242',
  email: 'hello@nalastudio.com.np',
  website: 'https://nalastudio.com.np',
  instagram: 'https://www.instagram.com/nala.studio__/',
  facebook: 'https://www.facebook.com/',
  address: 'Triple Seven Complex, Phulbari, Kathmandu, Nepal',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Triple+Seven+Complex+Phulbari+Kathmandu',
};
