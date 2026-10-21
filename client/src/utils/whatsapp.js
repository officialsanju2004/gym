import { site } from '../config/site';
import { inr } from '../data/products';

const base = () => `https://wa.me/${String(site.whatsappNumber).replace(/\D/g, '')}`;

export const whatsappUrl = (message) => `${base()}?text=${encodeURIComponent(message)}`;

export const productMessage = (product) =>
  `Hello ${site.brand}, I am interested in buying ${product.name}${product.price != null ? ` (listed at ${inr(product.price)})` : ''}. Is it available in stock?`;

export const generalMessage = () =>
  `Hello ${site.brand}, I would like to enquire about your supplements.`;

export function openWhatsApp(message) {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
}

export const buyProduct = (product) => openWhatsApp(productMessage(product));
