import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useSendSMS, useVerifySMS } from "../hooks/useAuth";

type Step = "phone" | "code";

function Login() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(0);

  const sendSMSMutation = useSendSMS(() => {
    setStep("code");
    setTimer(180);
  });

  const verifySMSMutation = useVerifySMS();

  // 🔹 카운트다운
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendSMS = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phone.trim()) return;
    sendSMSMutation.mutate(phone);
  };

  const handleVerifyCode = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!code.trim() || timer === 0) return;
    verifySMSMutation.mutate({ phone, code });
  };

  const handleResendSMS = () => {
    sendSMSMutation.reset();
    sendSMSMutation.mutate(phone);
    setTimer(180);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const handleBackToPhone = () => {
    setStep("phone");
    setCode("");
    setTimer(0);
    sendSMSMutation.reset(); // ← 상태 초기화
    verifySMSMutation.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">관리자 로그인</h2>

        {step === "phone" ? (
          <form onSubmit={handleSendSMS}>
            <label className="block text-sm font-medium mb-2">전화번호</label>
            <input
              type="tel"
              placeholder="010-1234-5678"
              className="w-full px-4 py-2 border rounded mb-4"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {sendSMSMutation.isError && (
              <p className="text-red-500 text-sm mb-4">
                {sendSMSMutation.error?.response?.data?.message ||
                  "SMS 발송 실패"}
              </p>
            )}
            <button
              type="submit"
              disabled={sendSMSMutation.isPending || !phone.trim()}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {sendSMSMutation.isPending ? "발송 중..." : "인증번호 받기"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode}>
            <p className="text-sm text-gray-600 mb-2">
              {phone}로 인증번호가 발송되었습니다
            </p>

            {timer > 0 ? (
              <p className="text-sm text-blue-600 font-semibold mb-2">
                남은 시간: {formatTimer(timer)}
              </p>
            ) : (
              <p className="text-sm text-red-500 mb-2">
                인증번호가 만료되었습니다.
              </p>
            )}

            <label className="block text-sm font-medium mb-2">인증번호</label>
            <input
              type="text"
              placeholder="6자리 숫자"
              maxLength={6}
              className="w-full px-4 py-2 border rounded mb-4"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              disabled={timer === 0}
            />

            {verifySMSMutation.isError && (
              <p className="text-red-500 text-sm mb-4">
                {verifySMSMutation.error?.response?.data?.message ||
                  "인증 실패"}
              </p>
            )}

            <button
              type="submit"
              disabled={
                verifySMSMutation.isPending || timer === 0 || !code.trim()
              }
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 mb-2"
            >
              {verifySMSMutation.isPending
                ? "확인 중..."
                : timer > 0
                ? "로그인"
                : "인증번호 만료"}
            </button>

            {timer === 0 && (
              <button
                type="button"
                onClick={handleResendSMS}
                disabled={sendSMSMutation.isPending}
                className="w-full text-sm text-blue-500 hover:text-blue-700 mb-2"
              >
                인증번호 다시 보내기
              </button>
            )}

            <button
              type="button"
              onClick={handleBackToPhone}
              className="w-full text-sm text-gray-600 hover:text-gray-800"
            >
              다시 입력하기
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
