import { writable } from 'svelte/store';
import { setCookie, getCookie } from './utils/cookies';

const NICKNAME_COOKIE_KEY = 'nickname';
const EXPERIENCE_COOKIE_KEY = 'experience';
const COINS_COOKIE_KEY = 'coins';
const SELECTED_BONUS_COOKIE_KEY = 'selectedBonus';

export const nickname = writable(getCookie(NICKNAME_COOKIE_KEY) || 'Задайте тут ваш никнейм');
export const experience = writable(Number(getCookie(EXPERIENCE_COOKIE_KEY) || 0));
export const coins = writable(Number(getCookie(COINS_COOKIE_KEY) || 0));
export const selectedBonusKey = writable(getCookie(SELECTED_BONUS_COOKIE_KEY) || null);

export function updateNickname(newNickname: string) {
    nickname.set(newNickname);
    setCookie(NICKNAME_COOKIE_KEY, newNickname);
}

export function updateExperience(newExperience: number) {
    experience.set(newExperience);
    setCookie(EXPERIENCE_COOKIE_KEY, String(newExperience));
}

export function updateCoins(newCoins: number) {
    coins.set(newCoins);
    setCookie(COINS_COOKIE_KEY, String(newCoins));
}

export function updateSelectedBonusKey(newBonusKey: string | null) {
    selectedBonusKey.set(newBonusKey);
    setCookie(SELECTED_BONUS_COOKIE_KEY, newBonusKey || '');
}