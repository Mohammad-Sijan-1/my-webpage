
import React from "react";
import { ArrowUpRight, Smartphone, User, Store } from "lucide-react";

const page = () => {
  const links = [
    {
      title: "Login Page 01",
      description: "Customer phone number login experience.",
      href: "/login",
      icon: Smartphone,
      number: "01",
    },
    {
      title: "Login Page 02",
      description: "Alternative login page design.",
      href: "/login",
      icon: User,
      number: "02",
    },
    {
      title: "Login Page 03",
      description: "Explore another login interface.",
      href: "/login",
      icon: Store,
      number: "03",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-5 py-16 sm:px-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-[#5AAD85]/10 px-4 py-2 text-sm font-semibold text-[#5AAD85]">
            Mobile Mandi
          </span>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Choose Your Login Design
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Explore our different login page designs and choose the experience
            that works best for Mobile Mandi.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {links.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.number}
                href={item.href}
                className="group relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#5AAD85]/50 hover:shadow-xl"
              >

                {/* Number */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold tracking-widest text-slate-300">
                    {item.number}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5AAD85]/10 text-[#5AAD85] transition group-hover:bg-[#5AAD85] group-hover:text-white">
                    <Icon size={23} />
                  </div>
                </div>

                {/* Content */}
                <h2 className="mt-8 text-xl font-bold text-slate-900">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>

                {/* Link */}
                <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="text-sm font-semibold text-[#5AAD85]">
                    Explore Design
                  </span>

                  <ArrowUpRight
                    size={20}
                    className="text-[#5AAD85] transition group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>

              </a>
            );
          })}

        </div>

        {/* Footer */}
        <p className="mt-12 text-center text-xs text-slate-400">
          © 2026 Mobile Mandi. All rights reserved.
        </p>

      </div>
    </main>
  );
};

export default page;
