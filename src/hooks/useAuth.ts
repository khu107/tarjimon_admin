import { useMutation } from "@tanstack/react-query";
import { sendSMS, verifySMS } from "../api/auth";
import { useNavigate } from "react-router-dom";
import type { SendSMSResponse, VerifySMSResponse } from "../types/auth";
import type { ApiError } from "../types/api";
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
      localStorage.setItem("token", data.token);
      navigate("/");
    },
  });
}
