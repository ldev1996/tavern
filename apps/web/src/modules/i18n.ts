import { createI18n } from "@svelte-i18n/core";
import en from "@/i18n/en.json";
import ptBR from "@/i18n/pt-BR.json";

type I18n = Awaited<ReturnType<typeof createI18n>>;

const COOKIE_NAME = "lang";
const FALLBACK_LOCALE = "en";
const LOCALES = ["en", "pt-BR"] as const;

function readLocaleCookie(): string {
	const match = document.cookie.match(/(?:^|; )lang=([^;]+)/);
	const value = match?.[1];
	return value !== undefined && (LOCALES as readonly string[]).includes(value)
		? value
		: FALLBACK_LOCALE;
}

const initialLocale = readLocaleCookie();

export const i18n: I18n = await createI18n({
	locales: [...LOCALES],
	locale: initialLocale,
	fallbackLocale: FALLBACK_LOCALE,
	cookieName: COOKIE_NAME,
	dictionaries: {
		en: async () => en,
		"pt-BR": async () => ptBR,
	},
});

export const t: I18n["t"] = i18n.t;
export const getLocale: I18n["getLocale"] = i18n.getLocale;
export const getLocales: I18n["getLocales"] = i18n.getLocales;
export const setLocale: I18n["setLocale"] = i18n.setLocale;

const displayNamesCache = new Map<string, Intl.DisplayNames>();

export function localeName(locale: string): string {
	let names = displayNamesCache.get(locale);
	if (names === undefined) {
		names = new Intl.DisplayNames([locale], { type: "language" });
		displayNamesCache.set(locale, names);
	}
	return names.of(locale) || "en";
}

document.documentElement.lang = initialLocale;
