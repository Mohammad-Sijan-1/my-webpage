
"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  X,
  UserRound,
  Camera,
  ShieldCheck,
  ArrowRight,
  Mail,
} from "lucide-react";

export default function ProfileForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const phone = searchParams.get("phone") || "";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (profileImage) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      setError("শুধুমাত্র JPG অথবা PNG ছবি আপলোড করুন।");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("ছবির সাইজ সর্বোচ্চ 5MB হতে পারবে।");
      event.target.value = "";
      return;
    }

    setProfileImage(URL.createObjectURL(file));
    setProfileImageFile(file);
    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("আপনার পুরো নাম লিখুন।");
      return;
    }

    if (!email.trim()) {
      setError("আপনার ইমেইল অ্যাড্রেস লিখুন।");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("সঠিক ইমেইল অ্যাড্রেস লিখুন।");
      return;
    }

    if (!/^01[3-9]\d{8}$/.test(phone)) {
      setError("ভেরিফাইড মোবাইল নম্বর পাওয়া যায়নি। আবার লগইন করুন।");
      return;
    }

    const formData = new FormData();

    formData.append("fullName", fullName.trim());
    formData.append("email", email.trim());
    formData.append("phone", phone);

    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }

    // TODO: Connect your backend registration API here.
    console.log("Registration data:", {
      fullName: fullName.trim(),
      email: email.trim(),
      phone,
      profileImageFile,
    });

    alert("ফর্মটি সফলভাবে যাচাই করা হয়েছে!");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0F172A99]/60 px-4 py-3 sm:px-4 sm:py-3">

      {/* Main Card */}
      <div className="relative w-full max-w-90 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_10px_50px_rgba(0,0,0,0.07)] sm:max-w-[490px] sm:rounded-2xl md:max-w-[430px] lg:max-w-[410px]">

        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2.5 md:px-4 md:py-2">

          <div className="flex items-center gap-1 rounded-full bg-[#F3F4F6] px-2 py-1 sm:px-2.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#5AAD85] sm:h-3 sm:w-3" />

            <p className="text-[10px] font-semibold text-[#0A6C49] sm:text-[9px]">
              প্রোফাইল সম্পন্নকরণ
            </p>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Close profile page"
            className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F1F2F4] text-slate-500 transition hover:bg-slate-200 sm:h-7 sm:w-7 md:h-6 md:w-6"
          >
            <X className="h-4 w-4 sm:h-4 sm:w-4" />
          </button>
        </div>

        {/* Main Content */}
        <div className="px-3 pb-3 pt-1 sm:px-4 sm:pb-4 sm:pt-0 md:px-4 md:pb-3">

          {/* Heading */}
          <div className="mb-2 sm:mb-2 md:mb-2">

            <h1 className="text-lg font-bold text-gray-900 sm:text-lg md:text-base">
              প্রোফাইল সম্পন্ন করুন
            </h1>

            <p className="mt-0.5 text-[11px] leading-4 text-gray-500 sm:mt-1 sm:text-[11px] sm:leading-4 md:text-[10px] md:leading-4">
              আপনার তথ্য দিয়ে মোবাইল মান্ডির নিরাপদ ট্রেডিং অ্যাকাউন্ট তৈরি সম্পূর্ণ করুন।
            </p>

          </div>

          {/* Profile Image */}
          <div className="mb-2 flex flex-col items-center sm:mb-2">

            <div className="relative">

              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#F3F4F6] shadow-inner sm:h-20 sm:w-20 md:h-16 md:w-16">

                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound className="h-10 w-10 text-[#565E74] sm:h-12 sm:w-12 md:h-10 md:w-10" />
                )}

              </div>

              {/* Camera Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Upload profile picture"
                className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#5AAD85] text-white shadow-md transition hover:bg-[#438F69] sm:h-7 sm:w-7 md:h-6 md:w-6"
              >
                <Camera className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-3 md:w-3" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleImageChange}
                className="hidden"
              />

            </div>

            <p className="mt-1.5 text-[11px] font-semibold text-gray-700 sm:mt-1 sm:text-[11px]">
              আপনার প্রোফাইল পিকচার দিন
            </p>

            <p className="mt-0.5 text-[9px] text-gray-400 sm:text-[9px]">
              JPG বা PNG, সর্বোচ্চ 5MB
            </p>

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="mb-2 sm:mb-2 md:mb-1.5">

              <label
                htmlFor="fullName"
                className="mb-1 ml-1 block text-[11px] font-semibold text-gray-700 sm:text-[11px] md:text-[10px]"
              >
                আপনার পুরো নাম <span className="text-red-500">*</span>
              </label>

              <div className="relative">

                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="আপনার পুরো নাম লিখুন"
                  autoComplete="name"
                  className="h-9 w-full rounded-lg border border-gray-200 px-3 pr-9 text-xs text-gray-800 outline-none transition placeholder:text-[10px] placeholder:text-gray-400 focus:border-[#5AAD85] focus:ring-2 focus:ring-[#5AAD85]/10 sm:h-9 sm:rounded-xl sm:px-3 sm:text-xs sm:placeholder:text-[11px] md:h-8 md:text-[11px]"
                  required
                />

                <UserRound className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 sm:h-3.5 sm:w-3.5" />

              </div>
            </div>

            {/* Email */}
            <div className="mb-2 sm:mb-2 md:mb-1.5">

              <label
                htmlFor="email"
                className="mb-1 ml-1 block text-[11px] font-semibold text-gray-700 sm:text-[11px] md:text-[10px]"
              >
                ইমেইল অ্যাড্রেস <span className="text-red-500">*</span>
              </label>

              <div className="relative">

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="example@email.com"
                  autoComplete="email"
                  className="h-9 w-full rounded-lg border border-gray-200 px-3 pr-9 text-xs text-gray-800 outline-none transition placeholder:text-[10px] placeholder:text-gray-400 focus:border-[#5AAD85] focus:ring-2 focus:ring-[#5AAD85]/10 sm:h-9 sm:rounded-xl sm:px-3 sm:text-xs sm:placeholder:text-[11px] md:h-8 md:text-[11px]"
                  required
                />

                <Mail className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 sm:h-3.5 sm:w-3.5" />

              </div>
            </div>

            {/* Verified Phone */}
            <div className="mb-2 sm:mb-2 md:mb-1.5">

              <div className="mb-1 ml-1 flex items-center justify-between">

                <label
                  htmlFor="phone"
                  className="text-[11px] font-semibold text-gray-700 sm:text-[11px] md:text-[10px]"
                >
                  ভেরিফাইড মোবাইল নম্বর{" "}
                  <span className="text-red-500">*</span>
                </label>

                <span className="flex items-center gap-1 text-[10px] font-semibold text-[#438F69] sm:text-[10px]">
                  <ShieldCheck className="h-3 w-3 sm:h-3 sm:w-3" />
                  ভেরিফাইড
                </span>

              </div>

              <div className="relative">

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  readOnly
                  className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 pr-9 text-xs text-gray-700 outline-none sm:h-9 sm:rounded-xl sm:px-3 sm:text-xs md:h-8 md:text-[11px]"
                />

                <ShieldCheck className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#438F69] sm:h-3.5 sm:w-3.5" />

              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="mb-2 rounded-lg bg-red-50 px-3 py-2 text-[10px] text-red-600 sm:text-[10px]">
                {error}
              </p>
            )}

            {/* Security Information */}
            <div className="mb-2 flex items-center gap-1.5 rounded-lg bg-[#F8FAFC] px-2 py-1.5 sm:mb-3 sm:gap-2 sm:rounded-xl sm:px-2 sm:py-1.5 md:mb-2">

              <img
                src="/margin.svg"
                alt=""
                aria-hidden="true"
                className="h-3.5 w-auto shrink-0 sm:h-3.5"
              />

              <p className="text-[9px] leading-3.5 text-gray-600 sm:text-[9px] sm:leading-3.5">
                <span className="mr-1 font-bold">
                  Mandi Safe Escrow:
                </span>
                আপনার মোবাইল নম্বর ও ব্যক্তিগত তথ্য ক্লাউড এনক্রিপশন দ্বারা ১০০% সুরক্ষিত ও নিরাপদ।
              </p>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-[#5AAD85] text-xs font-semibold text-white shadow-lg shadow-[#5AAD85]/20 transition duration-300 hover:bg-[#479B72] active:scale-[0.98] sm:h-9 sm:rounded-xl sm:text-xs md:h-8 md:text-[11px]"
            >
              রেজিস্ট্রেশন সম্পূর্ণ করুন

              <ArrowRight className="h-3.5 w-3.5 sm:h-3.5 sm:w-3.5" />
            </button>

            {/* Terms and Conditions */}
            <p className="mt-2 text-center text-[9px] leading-3.5 text-gray-400 sm:mt-2 sm:text-[9px] sm:leading-3">

              রেজিস্ট্রেশন করে আপনি মোবাইল মান্ডির{" "}

              <a
                href="/terms"
                className="font-semibold text-[#438F69] hover:underline"
              >
                শর্তাবলী
              </a>

              {" "}ও{" "}

              <a
                href="/privacy"
                className="font-semibold text-[#438F69] hover:underline"
              >
                প্রাইভেসী পলিসি
              </a>

              তে সম্মত হচ্ছেন।

            </p>

          </form>
        </div>
      </div>
    </main>
  );
}
