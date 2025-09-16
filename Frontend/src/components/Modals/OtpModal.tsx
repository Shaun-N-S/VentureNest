import { useResendOpt } from "@/hook/userApiHooks";
import { Rootstate } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

type OTPModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
};

export default function OTPModal({ isOpen, onClose, onVerify }: OTPModalProps) {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(120);

  const { mutate: resendOtp } = useResendOpt();
  const { email } = useSelector((state: Rootstate) => state.authData);

  useEffect(() => {
    if (!isOpen) return;
    setTimer(120);

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleResendOtp = async (email?: string) => {
    if (!email) return console.warn("No email found in store");
    resendOtp(email, {
      onSuccess: (res) => {
        console.log("response from resend otp,", res);
        setTimer(120);
      },
      onError: (err) => {
        console.error("Resend OTP failed:", err);
      },
    });
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Enter OTP</h2>

            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="mt-4 flex gap-3">
              <button
                onClick={onClose}
                className="w-1/2 rounded-lg border border-slate-300 py-2 text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => onVerify(otp)}
                className="w-1/2 rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
              >
                Verify
              </button>
            </div>

            <div className="mt-4 text-center">
              {timer > 0 ? (
                <p className="text-slate-600">
                  Resend OTP available in <b>{formatTime(timer)}</b>
                </p>
              ) : (
                <button
                  onClick={() => handleResendOtp(email)}
                  className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
