export type LoginFunnelSteps = {
  PhoneInput: { phone?: string };
  PasswordInput: { phone: string; password?: string };
  Complete: { phone: string };
};
