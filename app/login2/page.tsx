import { Suspense } from "react";
import VerifyOtpForm from "./verify-otp";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading OTP verification...</div>}>
      <VerifyOtpForm />
    </Suspense>
  );
}