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
} from "lucide-react";

export default function ProfileForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // Get the verified phone number from the URL
  const phone = searchParams.get("phone") || "";

  // Profile image states
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const [error, setError] = useState("");

  // Clean up the temporary image preview URL
  useEffect(() => {
    return () => {
      if (profileImage) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  // Profile image upload
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate image type
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      setError("শুধুমাত্র JPG অথবা PNG ছবি আপলোড করুন।");
      event.target.value = "";
      return;
    }

    // Validate image size (5MB)
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("ছবির সাইজ সর্বোচ্চ 5MB হতে পারবে।");
      event.target.value = "";
      return;
    }

    // Create image preview
    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
    setProfileImageFile(file);
    setError("");
  };

  // Form submission
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

    // Send these values to your backend API
    const formData = new FormData();

    formData.append("fullName", fullName.trim());
    formData.append("email", email.trim());
    formData.append("phone", phone);

    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }

    console.log("Profile form is ready to submit:", {
      fullName: fullName.trim(),
      email: email.trim(),
      phone,
      profileImageFile,
    });

    // TODO: Send formData to your backend API.
    // Example:
    // await fetch("/api/users/register", {
    //   method: "POST",
    //   body: formData,
    // });

    alert("ফর্মটি সফলভাবে যাচাই করা হয়েছে!");
  };

  return (
    <main className="min-h-screen bg-[#0F172A99]/60 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8">
      <div className="relative w-full max-w-140 bg-white rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.07)] border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="relative flex items-center justify-between px-5 py-5 sm:px-8">
          {/* Header label */}
          <div className="flex items-center gap-2 bg-[#F3F4F6] px-2.5 py-1.5 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="#5AAD85"
              stroke="#F3F4F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="m9 12 2 2 4-4" />
            </svg>

            <p className="text-[10px] sm:text-[11px] font-semibold text-[#0A6C49]">
              প্রোফাইল সম্পন্নকরণ
            </p>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Close profile page"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#F1F2F4] text-slate-500 transition hover:bg-slate-200"
          >
            <X size={19} />
          </button>
        </div>

        {/* Main content */}
        <div className="px-4 pb-6 pt-1 sm:px-5 sm:pb-8">
          {/* Title */}
          <div className="mb-4 text-start">
            <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900">
              প্রোফাইল সম্পন্ন করুন
            </h1>

            <p className="mt-2 text-xs leading-5 sm:text-sm sm:leading-7 text-gray-500">
              আপনার তথ্য দিয়ে মোবাইল মান্ডির নিরাপদ ট্রেডিং অ্যাকাউন্ট তৈরি
              সম্পূর্ণ করুন।
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Profile picture */}
            <div className="mb-4 flex flex-col items-center">
              <div className="relative">
                <div className="flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center overflow-hidden rounded-full bg-[#F3F4F6] shadow-inner">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound
                      size={65}
                      strokeWidth={1.8}
                      className="text-[#565E74]"
                    />
                  )}
                </div>

                {/* Camera button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Choose profile picture"
                  className="absolute bottom-1 right-0 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#5AAD85] text-white shadow-md transition hover:bg-[#438F69]"
                >
                  <Camera size={17} />
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              <p className="mt-2 sm:mt-4 text-[11px] sm:text-[13px] font-semibold text-[#0F172A]">
                আপনার প্রোফাইল পিকচার দিন
              </p>

              <p className="mt-1 text-[10px] sm:text-xs text-[#64748B]">
                JPG বা PNG, সর্বোচ্চ 5MB
              </p>
            </div>

            {/* Full name */}
            <div className="mb-3">
              <label
                htmlFor="fullName"
                className="mb-1 ml-1 block text-xs sm:text-[13px] font-semibold text-gray-700"
              >
                আপনার পুরো নাম <span className="text-red-500">*</span>
              </label>

              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="আপনার পুরো নাম লিখুন"
                autoComplete="name"
                className="h-10 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#5AAD85] focus:ring-2 focus:ring-[#5AAD85]/10 sm:h-12"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label
                htmlFor="email"
                className="mb-1 ml-1 block text-xs sm:text-[13px] font-semibold text-gray-700"
              >
                ইমেইল অ্যাড্রেস <span className="text-red-500">*</span>
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="example@email.com"
                autoComplete="email"
                className="h-10 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#5AAD85] focus:ring-2 focus:ring-[#5AAD85]/10 sm:h-12"
                required
              />
            </div>

            {/* Verified phone */}
            <div className="mb-3 sm:mb-4">
              <label
                htmlFor="phone"
                className="mb-1 ml-1 block text-xs sm:text-[13px] font-semibold text-gray-700"
              >
                ভেরিফাইড মোবাইল নম্বর{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  readOnly
                  className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pr-28 text-sm text-gray-700 outline-none sm:h-12"
                />

                <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1.5 text-xs font-semibold text-[#438F69]">
                  <ShieldCheck size={16} />
                  ভেরিফাইড
                </div>
              </div>
            </div>

            {/* Security information */}
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-[#F8FAFC] px-2 py-2 sm:mb-5">
              <img
                src="/margin.svg"
                alt=""
                aria-hidden="true"
                className="h-4 w-auto shrink-0"
              />

              <p className="text-[10px] font-normal leading-4.5 text-gray-600 sm:leading-5">
                <span className="mr-1 font-bold">
                  Mandi Safe Escrow:
                </span>
                আপনার মোবাইল নম্বর ও ব্যক্তিগত তথ্য ক্লাউড এনক্রিপশন দ্বারা
                ১০০% সুরক্ষিত ও নিরাপদ।
              </p>
            </div>

            {/* Error message */}
            {error && (
              <p
                role="alert"
                className="mb-3 text-center text-xs font-medium text-red-500"
              >
                {error}
              </p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#5AAD85] text-sm font-semibold text-white shadow-md shadow-[#5AAD85]/20 transition hover:bg-[#438F69] sm:h-13 sm:text-base"
            >
              রেজিস্ট্রেশন সম্পূর্ণ করুন
              <ArrowRight size={19} />
            </button>

            {/* Terms and privacy policy */}
            <p className="mt-2.5 text-center text-[10px] leading-4 text-gray-400 sm:leading-5">
              রেজিস্ট্রেশন করে আপনি মোবাইল মান্ডির{" "}
              <a
                href="/terms"
                className="font-semibold text-[#438F69] hover:underline"
              >
                শর্তাবলী
              </a>{" "}
              ও{" "}
              <a
                href="/privacy"
                className="font-semibold text-[#438F69] hover:underline"
              >
                প্রাইভেসী পলিসিতে
              </a>{" "}
              সম্মত হচ্ছেন।
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}