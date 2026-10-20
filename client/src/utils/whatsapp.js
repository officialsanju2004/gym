import { site } from '../config/site';

const base = () => `https://wa.me/${String(site.whatsappNumber).replace(/\D/g, '')}`;

export const whatsappUrl = (message) => `${base()}?text=${encodeURIComponent(message)}`;

export const productMessage = (product) =>
  `Hello, I am interested in purchasing the ${product.name}. Please share the price, specifications, and availability.`;

export const generalMessage = () =>
  `Hello ${site.brand}, I would like to enquire about your gym equipment.`;

export function openWhatsApp(message) {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
}

export const buyProduct = (product) => openWhatsApp(productMessage(product));
