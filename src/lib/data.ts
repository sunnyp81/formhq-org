import businessTypesData from '../../data/business-types.json';
import statesData from '../../data/states.json';
import insuranceTypesData from '../../data/insurance-types.json';
import businessStateData from '../../data/business-state-data.json';
import llcProvidersData from '../../data/affiliates/llc-providers.json';

export interface BusinessType {
  slug: string;
  name: string;
  category: string;
  description: string;
  defaultInsuranceTypes: string[];
  startupCostRange: [number, number];
  iconKey: string;
}

export interface State {
  slug: string;
  name: string;
  abbr: string;
  llcFilingFee: number;
  annualReportFee: number;
  hasStateIncomeTax: boolean;
  businessRegistrationUrl: string;
  sosName: string;
  requiresRegisteredAgent: boolean;
  insuranceMinimums: Record<string, number | string>;
}

export interface InsuranceType {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  avgAnnualCost: [number, number];
  isTypicallyRequired: boolean;
}

export interface Step {
  order: number;
  title: string;
  description: string;
}

export interface BusinessStateEntry {
  specificLicenses: string[];
  estimatedTotalCost: [number, number];
  steps: Step[];
  stateSpecificNotes: string;
}

export interface LLCProvider {
  slug: string;
  name: string;
  basePrice: number;
  paidTier: number;
  features: string[];
  rating: number;
  affiliateUrlTemplate: string;
  isTopPick: boolean;
}

const businessTypes: BusinessType[] = businessTypesData as BusinessType[];
const states: State[] = statesData as State[];
const insuranceTypes: InsuranceType[] = insuranceTypesData as InsuranceType[];
const businessStateMap: Record<string, BusinessStateEntry> = businessStateData as Record<string, BusinessStateEntry>;
const llcProviders: LLCProvider[] = llcProvidersData as LLCProvider[];

export function getAllBusinessTypes(): BusinessType[] {
  return businessTypes;
}

export function getBusinessType(slug: string): BusinessType | undefined {
  return businessTypes.find((b) => b.slug === slug);
}

export function getAllStates(): State[] {
  return states;
}

export function getState(slug: string): State | undefined {
  return states.find((s) => s.slug === slug);
}

export function getAllInsuranceTypes(): InsuranceType[] {
  return insuranceTypes;
}

export function getInsuranceType(slug: string): InsuranceType | undefined {
  return insuranceTypes.find((i) => i.slug === slug);
}

export function getBusinessStateData(businessSlug: string, stateSlug: string): BusinessStateEntry | undefined {
  return businessStateMap[`${businessSlug}:${stateSlug}`];
}

export function getLLCProviders(): LLCProvider[] {
  return llcProviders;
}

export function getLLCProviderUrl(provider: LLCProvider, stateAbbr: string): string {
  return provider.affiliateUrlTemplate.replace('{state}', stateAbbr.toLowerCase());
}

export function getBusinessStatePairs(): Array<{ business: BusinessType; state: State; data: BusinessStateEntry | undefined }> {
  const pairs: Array<{ business: BusinessType; state: State; data: BusinessStateEntry | undefined }> = [];
  for (const business of businessTypes) {
    for (const state of states) {
      pairs.push({
        business,
        state,
        data: getBusinessStateData(business.slug, state.slug),
      });
    }
  }
  return pairs;
}

export function getInsuranceTypesForBusiness(business: BusinessType): InsuranceType[] {
  return business.defaultInsuranceTypes
    .map((slug) => getInsuranceType(slug))
    .filter((t): t is InsuranceType => t !== undefined);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
}

export function formatCostRange(range: [number, number]): string {
  return `${formatCurrency(range[0])} - ${formatCurrency(range[1])}`;
}
