
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, ArrowRight, Pencil, RefreshCcw, Timer } from "lucide-react";

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [otp, setOtp] = useState("");
  const phone = searchParams.get("phone") || "01712345678";
  const [seconds, setSeconds] = useState(113);

  // Mask phone number


  // Bengali timer
  const toBangla = (value: string | number) =>
    value.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

  const formattedTime = `${toBangla(Math.floor(seconds / 60).toString().padStart(2, "0"))}:${toBangla((seconds % 60).toString().padStart(2, "0"))}`;

  const handleOtpChange = (value: string) => {
    setOtp(value.replace(/\D/g, "").slice(0, 4));
  };

const handleVerify = () => {
  if (otp.length !== 4) return;

  // Temporary navigation for frontend testing
  router.push(`/login3?phone=${encodeURIComponent(phone)}`);
};

  const handleResend = () => {
    if (seconds > 0) return;

    // TODO: Request new OTP
    setSeconds(113);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#00000099]/60 px-5 py-5 sm:px-6 sm:py-8">

      <div className="relative my-auto w-full max-w-120 rounded-2xl bg-white px-4 py-6 shadow-2xl sm:rounded-3xl sm:px-8 sm:py-9 md:px-9">

        {/* Close Button */}
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Close modal"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#F1F2F4] text-slate-500 transition hover:bg-slate-200 sm:right-5 sm:top-5 sm:h-9 sm:w-9"
        >
          <X size={20} />
        </button>

        {/* Heading */}
        <div className="mt-4 text-left sm:mt-6">

          <h1 className="mt-6 text-xl font-bold leading-snug text-slate-900 sm:mt-0 sm:text-2xl sm:leading-10">
            OTP ভেরিফিকেশন
          </h1>

          <p className="mt-2 text-sm leading-5 text-slate-500 sm:text-[15px] sm:leading-7">
            মোবাইলে পাঠানো ৪ ডিজিটের কোডটি লিখুন
          </p>

        </div>

        {/* OTP Input */}
        <div className="mt-4 sm:mt-6">

          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={4}
            value={otp}
            onChange={(e) => handleOtpChange(e.target.value)}
            placeholder="----"
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 text-center text-xl font-semibold tracking-[18px] text-slate-700 outline-none transition placeholder:tracking-[10px] placeholder:text-slate-300 focus:border-[#5AAD85] focus:ring-4 focus:ring-[#5AAD85]/10 sm:h-14 sm:text-2xl"
          />

          {/* Resend OTP */}
          <div className="mt-2 flex items-center justify-end gap-1.5">

            <RefreshCcw className="h-3 w-3 text-slate-400" />

            <button
              type="button"
              onClick={handleResend}
              disabled={seconds > 0}
              className={`text-[13px] font-semibold transition ${
                seconds > 0
                  ? "cursor-not-allowed text-slate-400"
                  : "text-[#5AAD85] hover:text-[#438b68]"
              }`}
            >
              Resend OTP
            </button>

          </div>

        </div>

        {/* Continue Button */}
        <button
          type="button"
          onClick={handleVerify}
          disabled={otp.length !== 4}
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#5AAD85] text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition duration-300 hover:bg-[#479B72] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:mt-6 sm:h-14 sm:text-base"
        >
          এগিয়ে যান
          <ArrowRight size={19} />
        </button>

        {/* Resend Information */}
        <div className="mt-4 text-center sm:mt-6">

          <p className="text-sm text-slate-500">
            কোনো কোড পাননি?
          </p>

          <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">

            <span className="text-slate-500">
              আবার অনুরোধ জানাতে অপেক্ষা করুন
            </span>

            <span className="flex text-xs sm:text-sm items-center gap-1.5 rounded-full bg-[#FFDAD6] px-1 py-0.5 sm:px-2 sm:py-1 font-semibold tabular-nums text-[#EF4444]">
              <Timer className="h-4 w-4" />
              {formattedTime} সেকেন্ড
            </span>

          </div>

        </div>

        {/* Phone Number Section */}
        <div className="mt-5 flex items-center justify-between gap-2 rounded-2xl border-t border-gray-100 bg-[#F3F4F6] px-3 py-3 sm:mt-6 sm:px-5">

          <div className="min-w-0">

            <p className="text-[10px] text-slate-500 sm:text-xs">
              মোবাইল নম্বর ভুল হয়নি তো?
            </p>

            <span className="text-sm font-semibold tracking-wide text-slate-700 sm:text-base">
              {phone}
            </span>

          </div>

          <button
            type="button"
            onClick={() => router.back()}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-white px-2.5 py-2 text-xs font-semibold text-[#0A6C49] transition hover:bg-[#5AAD85]/10 sm:px-3 sm:text-[13px]"
          >
            <Pencil size={13} />
            নম্বর পরিবর্তন
          </button>

        </div>

      </div>
    </div>
  );
}
