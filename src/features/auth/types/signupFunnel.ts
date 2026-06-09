export type PersonalInfoPhase = 'name' | 'rrn' | 'carrier' | 'phone';

export type SignupFunnelSteps = {
  PersonalInfo: {
    name?: string;
    rrnFront?: string;
    rrnBack?: string;
    carrier?: string;
    phone?: string;
    phase?: PersonalInfoPhase;
  };
  VerifyCode: {
    name: string;
    rrnFront: string;
    rrnBack: string;
    carrier: string;
    phone: string;
    verifyCode?: string;
  };
  PasswordSet: {
    name: string;
    rrnFront: string;
    rrnBack: string;
    carrier: string;
    phone: string;
    verifyCode: string;
    password?: string;
  };
  Complete: {
    name: string;
    phone: string;
    password: string;
  };
};
