
"use client";


// all import
import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Phone, ArrowRight } from "lucide-react";

export default function Home() {
  const router = useRouter();
// states
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Remove spaces and other non-digit characters
    let formattedPhone = phone.replace(/\D/g, "");

    // If 10 digits, add 0 at the beginning
    if (formattedPhone.length === 10) {
      formattedPhone = "0" + formattedPhone;
    }

    // Validate Bangladesh mobile number
    if (!/^01[3-9]\d{8}$/.test(formattedPhone)) {
      setError("সঠিক ১০ বা ১১ ডিজিটের ফোন নম্বর দিন।");
      return;
    }

    // Navigate to OTP page
    router.push(
      `/verify-otp?phone=${encodeURIComponent(formattedPhone)}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#0F172A99] px-5 py-5 sm:px-6 sm:py-8">

      <div className="relative my-auto w-full max-w-120 rounded-2xl bg-white px-4 py-6 shadow-2xl sm:rounded-3xl sm:px-8 sm:py-9 md:px-9">

        {/* Close Button */}
        <button
          type="button"
          aria-label="Close modal"
          onClick={() => router.back()}
          className="absolute right-3 top-3 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#F1F2F4] text-slate-500 transition hover:bg-slate-200 sm:right-5 sm:top-5"
        >
          <X size={20} />
        </button>

        {/* Heading */}
        <div className="mt-4 text-left sm:mt-6">

          <h2 className="mt-6 text-xl font-bold leading-snug text-slate-900 sm:mt-0 sm:text-2xl sm:leading-10">
            Mobile Mandi-র জগতে আপনাকে স্বাগতম।
          </h2>

          <p className="mt-2 text-sm leading-5 text-slate-500  sm:text-[15px] sm:leading-7">
            আপনার ফোন নম্বর দিয়ে সহজে লগইন বা একাউন্ট তৈরি করুন।
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 sm:mt-6">

          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-semibold text-[#374151]"
          >
            ফোন নম্বর
          </label>

          {/* Phone Input */}
          <div className="flex h-11 w-full items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-[#5AAD85] focus-within:ring-4 focus-within:ring-[#5AAD85]/10 sm:h-14">

            <span className="flex h-full shrink-0 items-center border-r border-slate-200 px-3 text-sm font-semibold text-slate-700 sm:px-4">
              +880
            </span>

            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="1XXXXXXXXX "
              maxLength={11}
              value={phone}
              onChange={(e) => {
                setPhone(
                  e.target.value.replace(/\D/g, "").slice(0, 11)
                );
                setError("");
              }}
              className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:px-4 sm:text-base"
              required
            />

            <Phone className="mr-3 h-5 w-5 shrink-0 text-[#9CA3AF] sm:mr-4" />

          </div>

          {/* Error Message */}
          {error && (
            <p className="mt-2 text-xs font-medium text-red-500">
              {error}
            </p>
          )}

          {/* OTP Description */}
          <p className=" mt-2  text-[11px] sm:leading-6 text-[#9CA3AF] sm:text-[11px]">
            ভেরিফিকেশনের জন্য আমরা একটি ৪-ডিজিটের ওটিপি (OTP) পাঠাব।
          </p>

          {/* Continue Button */}
          <button
            type="submit"
            className="sm:mt-6 mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#5AAD85] text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition duration-300 hover:bg-[#479B72] active:scale-[0.98] sm:h-14 sm:text-base"
          >
            এগিয়ে যান
            <ArrowRight size={19} />
          </button>

        </form>

        {/* Security Message */}
        <div className="mt-4 flex w-full items-center  gap-2 rounded-xl bg-[#F1F2F4B2]/70 px-3 py-3 sm:mt-6 sm:px-4">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="#5AAD85"
            stroke="#F1F2F4B2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 shrink-0"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            <path d="m9 12 2 2 4-4" />
          </svg>

          <p className="min-w-0 flex-1 text-[11px] sm:leading-5 text-slate-600 sm:text-[11px] sm:leading-6">
            Mandi Safe Escrow এনক্রিপশন দ্বারা আপনার ফোন নম্বর সুরক্ষিত
          </p>

        </div>

      </div>
    </div>
  );
}

