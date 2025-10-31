import apiClient from "./client";
import type {
  SendSMSRequest,
  SendSMSResponse,
  VerifySMSRequest,
  VerifySMSResponse,
} from "../types/auth";

export const sendSMS = async (phone: string): Promise<SendSMSResponse> => {
  const { data } = await apiClient.post<SendSMSResponse>("/auth/sms/send", {
    phone,
  } as SendSMSRequest);
  return data;
};

export const verifySMS = async ({
  phone,
  code,
}: VerifySMSRequest): Promise<VerifySMSResponse> => {
  const { data } = await apiClient.post<VerifySMSResponse>(
    "/auth/sms/verify/user",
    {
      phone,
      code,
    }
  );
  return data;
};

// 로그아웃 API 호출
export const logoutApi = async (refreshToken: string) => {
  const { data } = await apiClient.post("/auth/logout", {
    refreshToken,
  });
  return data;
};
