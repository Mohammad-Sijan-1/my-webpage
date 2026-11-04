import { Suspense } from "react";
import ProfileForm from "./profile-form";

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-[#0F172A99]/60 px-4">
          <div className="rounded-2xl bg-white px-8 py-6 text-sm text-gray-600">
            Loading profile...
          </div>
        </main>
      }
    >
      <ProfileForm />
    </Suspense>
  );
}