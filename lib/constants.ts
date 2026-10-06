import type { KeyStatus } from '@/types';

export const KEY_STATUSES: { value: KeyStatus; label: string; color: string }[] = [
  { value: 'keyless', label: 'Keyless', color: '#A8E6A3' },
  { value: 'verified', label: 'Verified', color: '#FF8579' }
];

export const SITE_NAME = 'DUEROHUB';
export const SITE_DESCRIPTION = 'Curated Roblox scripts catalog.';
