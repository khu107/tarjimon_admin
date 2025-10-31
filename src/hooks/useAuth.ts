import { useMutation } from "@tanstack/react-query";
import { sendSMS, verifySMS, logoutApi } from "../api/auth";
import { useNavigate } from "react-router-dom";
import type {
  SendSMSResponse,
  VerifySMSResponse,
  ApiError,
} from "../types/auth";
import type { AxiosError } from "axios";

export function useSendSMS(onSuccess?: () => void) {
  return useMutation<SendSMSResponse, AxiosError<ApiError>, string>({
    mutationFn: sendSMS,
    onSuccess,
  });
}

export function useVerifySMS() {
  const navigate = useNavigate();

  return useMutation<
    VerifySMSResponse,
    AxiosError<ApiError>,
    { phone: string; code: string }
  >({
    mutationFn: verifySMS,
    onSuccess: (data) => {
      // Hooks에서 토큰 저장
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token");
      return logoutApi(refreshToken);
    },
    onSuccess: () => {
      // Hooks에서 토큰 제거
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      navigate("/login");
    },
    onError: () => {
      // 실패해도 로그인으로
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    },
  });
}
