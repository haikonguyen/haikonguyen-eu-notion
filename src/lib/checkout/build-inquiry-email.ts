import type { CheckoutInquiry } from './checkout-inquiry-schema';
import { escapeHtml } from './escape-html';

function formatItemLine(item: CheckoutInquiry['items'][number]): string {
  const notes = item.notes ? ` — ${escapeHtml(item.notes)}` : '';
  const price =
    typeof item.price === 'number' ? ` (${item.price} × ${item.quantity})` : '';
  return `<li>${escapeHtml(item.title)} ×${item.quantity}${price}${notes}</li>`;
}

export function buildInquiryEmailHtml(inquiry: CheckoutInquiry): string {
  const phone = inquiry.phone ? escapeHtml(inquiry.phone) : '—';
  const company = inquiry.company ? escapeHtml(inquiry.company) : '—';

  return `
  <div>
    <h1>New checkout inquiry</h1>
    <ul>
      <li>Name: ${escapeHtml(inquiry.name)}</li>
      <li>Email: ${escapeHtml(inquiry.email)}</li>
      <li>Phone: ${phone}</li>
      <li>Company: ${company}</li>
    </ul>
    <h2>Selection</h2>
    <ul>
      ${inquiry.items.map(formatItemLine).join('')}
    </ul>
    <h2>Message</h2>
    <p>${escapeHtml(inquiry.message)}</p>
  </div>
`;
}
