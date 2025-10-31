export interface SendSMSRequest {
  phone: string;
}

export interface SendSMSResponse {
  success: boolean;
  message: string;
}

export interface VerifySMSRequest {
  phone: string;
  code: string;
}

// 백엔드 응답에 맞게 수정
export interface VerifySMSResponse {
  success: boolean;
  accessToken: string; // ← 추가
  refreshToken: string; // ← 추가
  expiresIn: number; // ← 추가
  user: {
    id: string;
    phone: string;
    role: string; // ← 추가
  };
  isProfileComplete?: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}
