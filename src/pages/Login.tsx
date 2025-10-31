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

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendSMS = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendSMSMutation.mutate(phone);
  };

  const handleVerifyCode = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifySMSMutation.mutate({ phone, code });
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">로그인</h2>

        {step === "phone" ? (
          <form onSubmit={handleSendSMS}>
            <input
              type="tel"
              placeholder="010-1234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4"
            />
            <button
              type="submit"
              disabled={sendSMSMutation.isPending}
              className="w-full bg-blue-500 text-white py-2 rounded disabled:bg-gray-400"
            >
              {sendSMSMutation.isPending ? "발송 중..." : "인증번호 받기"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode}>
            <p className="text-sm mb-2">{phone}로 발송됨</p>
            <p className="text-sm mb-4">남은 시간: {formatTimer(timer)}</p>

            <input
              type="text"
              maxLength={6}
              placeholder="6자리"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4"
            />
            <button
              type="submit"
              disabled={verifySMSMutation.isPending}
              className="w-full bg-blue-500 text-white py-2 rounded disabled:bg-gray-400"
            >
              {verifySMSMutation.isPending ? "확인 중..." : "로그인"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
