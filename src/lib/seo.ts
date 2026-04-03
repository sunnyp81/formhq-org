import type { BusinessType, State, InsuranceType, Step, LLCProvider } from './data';
import { formatCurrency, formatCostRange } from './data';

const CURRENT_YEAR = new Date().getFullYear();
const SITE_NAME = 'Business Formation Guide';

export function businessHubTitle(business: BusinessType): string {
  return `How to Start a ${business.name} (${CURRENT_YEAR} Guide)`;
}

export function stateSpokeTitle(business: BusinessType, state: State): string {
  return `How to Start a ${business.name} in ${state.name} | Requirements & Costs`;
}

export function insuranceSpokeTitle(business: BusinessType, state: State): string {
  return `${business.name} Insurance in ${state.name} | Coverage & Quotes`;
}

export function llcSpokeTitle(state: State): string {
  return `How to Form an LLC in ${state.name} | Fees, Steps & Best Services`;
}

export function businessHubDescription(business: BusinessType): string {
  return `Learn how to start a ${business.name.toLowerCase()} step by step. Startup costs range from ${formatCostRange(business.startupCostRange)}. Covers licensing, insurance, LLC formation, and more.`;
}

export function stateSpokeDescription(business: BusinessType, state: State, estimatedCost?: [number, number]): string {
  const cost = estimatedCost ? formatCostRange(estimatedCost) : formatCostRange(business.startupCostRange);
  return `Start a ${business.name.toLowerCase()} in ${state.name}. LLC filing fee: ${formatCurrency(state.llcFilingFee)}. Estimated total cost: ${cost}. Step-by-step requirements and registration guide.`;
}

export function insuranceSpokeDescription(business: BusinessType, state: State): string {
  return `Get ${business.name.toLowerCase()} insurance in ${state.name}. Compare coverage options, find minimum requirements, and get free quotes from top insurers.`;
}

export function llcSpokeDescription(state: State): string {
  return `Form an LLC in ${state.name} for ${formatCurrency(state.llcFilingFee)}. Step-by-step guide covering filing, registered agents, annual fees, and the best LLC formation services for ${state.abbr}.`;
}

export function canonicalUrl(path: string): string {
  const base = 'https://formhq.org';
  const cleanPath = path.endsWith('/') ? path : `${path}/`;
  return `${base}${cleanPath}`;
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function webPageSchema(title: string, description: string, url: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };
}

export function howToSchema(title: string, description: string, steps: Step[], estimatedCost?: [number, number]): object {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    step: steps.map((step) => ({
      '@type': 'HowToStep',
      position: step.order,
      name: step.title,
      text: step.description,
    })),
  };
  if (estimatedCost) {
    schema.estimatedCost = {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      minValue: estimatedCost[0],
      maxValue: estimatedCost[1],
    };
  }
  return schema;
}

export function faqSchema(items: Array<{ question: string; answer: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function itemListSchema(name: string, items: Array<{ name: string; url: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function productSchema(provider: LLCProvider, stateFee: number): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${provider.name} LLC Formation`,
    description: provider.features.join('. '),
    offers: {
      '@type': 'Offer',
      price: provider.basePrice + stateFee,
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: provider.rating,
      bestRating: 5,
      worstRating: 1,
    },
  };
}
