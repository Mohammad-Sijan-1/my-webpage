"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, ArrowRight, Pencil,RefreshCcw,Timer} from "lucide-react";

export default function VerifyOtpPage() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [phone] = useState("01712345678");
  const [seconds, setSeconds] = useState(113);

  const formattedTime = `০${Math.floor(seconds / 60)
    .toString()
    .replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)])}:${(seconds % 60)
    .toString()
    .padStart(2, "0")
    .replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)])}`;

  const handleOtpChange = (value: string) => {
    setOtp(value.replace(/\D/g, "").slice(0, 4));
  };

  const handleVerify = () => {
    if (otp.length !== 4) return;

    // TODO: Send OTP to your backend for verification.
    console.log("OTP:", otp);
  };

  const handleResend = () => {
    if (seconds > 0) return;

    // TODO: Request a new OTP from your backend.
    setSeconds(113);
  };

  return (
    <main className="min-h-screen bg-[#F1F2F4] flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-115 rounded-3xl bg-white p-6 sm:p-9 shadow-[0_10px_50px_rgba(15,23,42,0.07)]">

        {/* Close button */}
        <button
          onClick={() => router.back()}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F2F4] text-[#374151] transition hover:bg-gray-200"
          aria-label="Close"
        >
          <X size={19} />
        </button>

      

        {/* Heading */}
        <div className="text-start mt-5  sm:mt-6">
          <h1 className="text-2xl font-bold text-[#0F172A] sm:text-[28px]">
            OTP ভেরিফিকেশন
          </h1>

          <p className="mt-3 text-sm text-start leading-6 text-[#64748B]">
            মোবাইলে পাঠানো ৪ ডিজিটের কোডটি লিখুন
          </p>
        </div>

        {/* OTP Input */}
        <div className="mt-8">
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={4}
            value={otp}
            onChange={(e) => handleOtpChange(e.target.value)}
            placeholder="* * * *"
            className="h-14 w-full rounded-xl border border-gray-200 bg-[#FAFAFA] text-center text-2xl font-semibold tracking-[18px] text-[#374151] outline-none transition placeholder:text-gray-300 focus:border-[#5AAD85] focus:ring-4 focus:ring-[#5AAD85]/10"
          />

          {/* Resend OTP */}
          <div className="mt-4 flex items-center justify-end">
            <RefreshCcw className="size-4 text-[#64748B] mx-2"/>
            <button
              onClick={handleResend}
              disabled={seconds > 0}
              className={`text-sm font-semibold transition ${
                seconds > 0
                  ? "cursor-not-allowed text-gray-400"
                  : "text-[#5AAD85] hover:text-[#438b68]"
              }`}
            >
              Resend OTP
            </button>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleVerify}
          disabled={otp.length !== 4}
          className="mt-6 flex h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-[#5AAD85] font-semibold text-white transition hover:bg-[#438b68] disabled:cursor-not-allowed disabled:opacity-50"
        >
          এগিয়ে যান
          <ArrowRight size={18} />
        </button>

        {/* Resend information */}
        <div className="mt-7 text-center">
          <p className="text-sm text-gray-500">
            কোনো কোড পাননি?
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-gray-500">
              আবার অনুরোধ জানাতে অপেক্ষা করুন
            </span>

            <span className="font-semibold tabular-nums flex gap-2 items-center rounded-full px-2 py-1 bg-[#FFDAD6] text-[#EF4444]">
                <Timer className="size-5"/>
              {formattedTime} সেকেন্ড
            </span>
          </div>
        </div>

        {/* Phone number section */}
        <div className="mt-8 border-t px-3 py-3 flex items-center justify-between bg-[#F3F4F6] rounded-2xl text-[#64748B] border-gray-100 pt-6">
          <div>
            <p className="text-sm text-gray-500">
            মোবাইল নম্বর ভুল হয়নি তো?
          </p>
       <span className="font-semibold text-[#374151]">
              {phone}
            </span>
          </div>

          
     
            <button
              onClick={() => router.back()}
              className="flex items-center bg-white px-2 py-1 rounded-xl gap-1.5 text-sm font-semibold text-[#0A6C49] hover:text-[#438b68]"
            >
              <Pencil size={14} />
              নম্বর পরিবর্তন
            </button>
         
        </div>

      </div>

      <div className="absolute bg-red-700/40 text-5xl text-bold">
        working
      </div>
    </main>
  );
}