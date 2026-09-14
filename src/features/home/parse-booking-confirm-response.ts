export interface BookingConfirmResponse {
  mode: string | undefined;
  emailSent: boolean;
}

export function parseBookingConfirmResponse(
  value: unknown,
): BookingConfirmResponse {
  if (typeof value !== 'object' || value === null) {
    return { mode: undefined, emailSent: false };
  }

  const mode =
    'mode' in value && typeof value.mode === 'string' ? value.mode : undefined;
  const emailSent = 'emailSent' in value && value.emailSent === true;

  return { mode, emailSent };
}
