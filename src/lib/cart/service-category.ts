import { ServiceIcon } from '@lib/keystatic/types';
import type { CartItem } from '@lib/store/useCartStore';

export function cartCategoryFromIcon(icon: ServiceIcon): CartItem['category'] {
  if (icon === ServiceIcon.Camera) return 'photography';
  if (icon === ServiceIcon.Video) return 'video';
  return 'web-dev';
}
