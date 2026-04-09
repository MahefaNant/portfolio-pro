'use server';

import { cookies } from 'next/headers';

/**
 * The name of the cookie used to store the user's locale.
 * next-intl's default is NEXT_LOCALE.
 */
const COOKIE_NAME = 'NEXT_LOCALE';

/**
 * Gets the current locale from the cookies.
 * Defaults to 'en' if not set.
 */
export async function getUserLocale() {
  const cookieStore = await cookies();
  const locale = cookieStore.get(COOKIE_NAME)?.value || 'en';
  return locale;
}

/**
 * Sets the user's locale in a cookie.
 * @param locale The locale to set (e.g., 'en' or 'fr').
 */
export async function setUserLocale(locale: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale, {
    path: '/',
    maxAge: 31536000, // 1 year
    sameSite: 'lax',
  });
}
