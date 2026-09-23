/**
 * Bridge module để re-export từ couple.config.js
 * Giúp người dùng chỉ cần chỉnh sửa duy nhất tệp couple.config.js ở thư mục gốc.
 */
import {
  CONFIG_VERSION,
  COUPLE_CONFIG,
  COUNTDOWN_CONFIG,
  TIMELINE_CONFIG,
  LOVE_MAP_CONFIG,
  GALLERY_CONFIG,
  WHEEL_CONFIG,
  LETTERS_CONFIG,
  BUCKET_LIST_CONFIG,
  SECRET_VAULT_CONFIG,
} from '../couple.config';

export const DEFAULT_CONFIG_VERSION = CONFIG_VERSION;
export const DEFAULT_COUPLE_INFO = COUPLE_CONFIG;
export const DEFAULT_COUNTDOWNS = COUNTDOWN_CONFIG;
export const DEFAULT_TIMELINE = TIMELINE_CONFIG;
export const DEFAULT_LOVE_MAP = LOVE_MAP_CONFIG;
export const DEFAULT_GALLERY = GALLERY_CONFIG;
export const DEFAULT_WHEEL_FOODS = WHEEL_CONFIG.foods;
export const DEFAULT_WHEEL_DATES = WHEEL_CONFIG.dates;
export const DEFAULT_LETTERS = LETTERS_CONFIG;
export const DEFAULT_BUCKET_LIST = BUCKET_LIST_CONFIG;
export const DEFAULT_SECRET_VAULT = SECRET_VAULT_CONFIG;
