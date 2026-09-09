import React, { useEffect, useState } from "react";
import {
  HiOutlineCog,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineAdjustments,
  HiOutlineSpeakerphone,
  HiOutlineInformationCircle,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import Navbar from "../../components/common/Navbar";

const CookiesSettings = () => {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    functional: false,
    marketing: false,
  });

  const [saved, setSaved] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const savedPreferences = localStorage.getItem("cookiePreferences");

    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error("Invalid cookie preferences");
      }
    }
  }, []);

  const handleToggle = (type) => {
    if (type === "necessary") return;

    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));

    setSaved(false);
  };

  const savePreferences = () => {
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify(preferences)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const acceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
    };

    setPreferences(allPreferences);

    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify(allPreferences)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const rejectOptional = () => {
    const requiredOnly = {
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false,
    };

    setPreferences(requiredOnly);

    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify(requiredOnly)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const cookieOptions = [
    {
      id: "necessary",
      title: "Necessary Cookies",
      description:
        "These cookies are required for essential website functions such as authentication, security, session management and property browsing.",
      icon: HiOutlineShieldCheck,
      required: true,
    },
    {
      id: "analytics",
      title: "Analytics Cookies",
      description:
        "These cookies help us understand how visitors use our website, which pages are popular and how we can improve the user experience.",
      icon: HiOutlineChartBar,
      required: false,
    },
    {
      id: "functional",
      title: "Functional Cookies",
      description:
        "These cookies remember your preferences and settings, such as saved properties, search preferences and other personalized features.",
      icon: HiOutlineAdjustments,
      required: false,
    },
    {
      id: "marketing",
      title: "Marketing Cookies",
      description:
        "These cookies may be used to provide relevant property recommendations, advertisements and measure the effectiveness of marketing campaigns.",
      icon: HiOutlineSpeakerphone,
      required: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
        <Navbar/>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0d9488]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">

            <div className="mb-5 mt-10 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              <HiOutlineCog size={20} />
              Privacy Preferences
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Cookies Settings
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-teal-50">
              Choose which types of cookies you allow us to use. You can
              change your preferences at any time.
            </p>

            <p className="mt-6 text-sm font-medium text-teal-100">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>

          </div>
        </div>
      </section>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-6 py-12 lg:px-8">

        {/* Intro Card */}
        <div className="mb-8 rounded-2xl border border-teal-100 bg-white p-6 shadow-sm md:p-8">

          <div className="flex gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0d9488]">
              <HiOutlineInformationCircle size={25} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Manage Your Cookie Preferences
              </h2>

              <p className="mt-2 leading-7 text-slate-600">
                Cookies help us provide a better real estate experience,
                remember your preferences and understand how our website
                is being used. You can enable or disable optional cookies
                below.
              </p>
            </div>

          </div>

        </div>

        {/* Cookie Settings */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5 md:px-8">
            <h2 className="text-xl font-bold">
              Cookie Preferences
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select the cookies you want to allow.
            </p>
          </div>

          <div className="divide-y divide-slate-100">

            {cookieOptions.map((cookie) => {
              const Icon = cookie.icon;

              return (
                <div
                  key={cookie.id}
                  className="flex flex-col gap-5 p-6 transition hover:bg-slate-50 sm:flex-row sm:items-start md:px-8"
                >

                  {/* Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0d9488]">
                    <Icon size={23} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="font-bold text-slate-900">
                        {cookie.title}
                      </h3>

                      {cookie.required && (
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                          Always Active
                        </span>
                      )}

                    </div>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                      {cookie.description}
                    </p>

                  </div>

                  {/* Toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggle(cookie.id)}
                    disabled={cookie.required}
                    aria-label={`Toggle ${cookie.title}`}
                    className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${
                      preferences[cookie.id]
                        ? "bg-[#0d9488]"
                        : "bg-slate-300"
                    } ${
                      cookie.required
                        ? "cursor-not-allowed opacity-80"
                        : "cursor-pointer"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        preferences[cookie.id]
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>

                </div>
              );
            })}

          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 p-6 sm:flex-row sm:justify-end md:px-8">

            <button
              onClick={rejectOptional}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 cursor-pointer"
            >
              Reject Optional
            </button>

            <button
              onClick={savePreferences}
              className="rounded-xl border border-[#0d9488] bg-white px-5 py-3 text-sm font-semibold text-[#0d9488] transition hover:bg-teal-50 cursor-pointer"
            >
              Save Preferences
            </button>

            <button
              onClick={acceptAll}
              className="rounded-xl bg-[#0d9488] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0f766e] cursor-pointer"
            >
              Accept All
            </button>

          </div>

        </div>

        {/* Saved Message */}
        {saved && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">

            <HiOutlineCheckCircle size={22} />

            <p className="text-sm font-medium">
              Your cookie preferences have been saved successfully.
            </p>

          </div>
        )}

        {/* Bottom Info */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

          <h2 className="text-lg font-bold">
            About Cookies
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Cookies are small files stored on your device when you visit
            a website. They help websites remember information about your
            visit and provide a smoother experience.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            You can update your preferences whenever you want from this
            Cookies Settings page.
          </p>

        </div>

      </main>
    </div>
  );
};

export default CookiesSettings;