export interface SendSMSRequest {
  phone: string;
}

export interface SendSMSResponse {
  message: string;
  expiresIn: number;
}

export interface VerifySMSRequest {
  phone: string;
  code: string;
}

export interface VerifySMSResponse {
  token: string;
  user: {
    id: string;
    phone: string;
    name?: string;
  };
}
