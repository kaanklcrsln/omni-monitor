import type { AIRegulation, RegulatoryAction, CountryRegulationProfile } from '@/types';

// Removed — not needed for Turkey-focused version
export const AI_REGULATIONS: AIRegulation[] = [];
export const REGULATORY_ACTIONS: RegulatoryAction[] = [];
export const COUNTRY_REGULATION_PROFILES: CountryRegulationProfile[] = [];

export function getRegulationById(_id: string): AIRegulation | undefined { return undefined; }
export function getCountryProfile(_countryCode: string): CountryRegulationProfile | undefined { return undefined; }
export function getRegulationsByCountry(_country: string): AIRegulation[] { return []; }
export function getUpcomingDeadlines(): AIRegulation[] { return []; }
export function getRecentActions(_months: number = 6): RegulatoryAction[] { return []; }
