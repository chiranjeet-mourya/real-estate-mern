import React from "react";
import {
  HiShieldCheck,
  HiOutlineInformationCircle,
  HiOutlineLockClosed,
  HiOutlineUserGroup,
  HiOutlineGlobeAlt,
  HiOutlineMail,
} from "react-icons/hi";
import Navbar from "../../components/common/Navbar";

const PrivacyPolicy = () => {
  const sections = [
    { id: "information", title: "Information We Collect" },
    { id: "usage", title: "How We Use Your Information" },
    { id: "listings", title: "Property Listings & Leads" },
    { id: "cookies", title: "Cookies & Tracking" },
    { id: "sharing", title: "Information Sharing" },
    { id: "security", title: "Data Security" },
    { id: "rights", title: "Your Rights" },
    { id: "changes", title: "Policy Changes" },
    { id: "contact", title: "Contact Us", path: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0d9488]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 mt-15 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              <HiShieldCheck size={20} />
              Your Privacy Matters
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-teal-50">
              We respect your privacy and are committed to protecting your
              personal information while providing a safe and trusted real
              estate experience.
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

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Intro */}
        <div className="mb-10 rounded-2xl border border-teal-100 bg-white p-6 shadow-sm md:p-8">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0d9488]">
              <HiOutlineInformationCircle size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Welcome to our Real Estate Platform
              </h2>

              <p className="mt-2 leading-7 text-slate-600">
                This Privacy Policy explains how we collect, use, store and
                protect information when you use our website, create an account,
                browse properties, contact property owners or submit a property
                listing.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 self-start rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
                On this page
              </h3>

              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={section.path}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-teal-50 hover:text-[#0d9488]"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-8">
            {/* Information */}
            <PolicySection
              id="information"
              icon={<HiOutlineInformationCircle />}
              title="1. Information We Collect"
            >
              <p>
                We may collect information that you provide directly when you
                register, create a property listing, contact another user or
                communicate with our support team.
              </p>

              <ul>
                <li>Name and contact information</li>
                <li>Email address and phone number</li>
                <li>Account login information</li>
                <li>Property details and listing information</li>
                <li>Messages and enquiries submitted through our platform</li>
                <li>Location and city information provided by you</li>
              </ul>
            </PolicySection>

            {/* Usage */}
            <PolicySection
              id="usage"
              icon={<HiOutlineUserGroup />}
              title="2. How We Use Your Information"
            >
              <p>
                We use collected information to provide, maintain and improve
                our real estate services.
              </p>

              <ul>
                <li>To create and manage user accounts</li>
                <li>To publish and manage property listings</li>
                <li>To connect buyers and sellers</li>
                <li>To respond to enquiries and support requests</li>
                <li>To improve website functionality and user experience</li>
                <li>
                  To detect and prevent fraudulent or unauthorized activity
                </li>
              </ul>
            </PolicySection>

            {/* Listings */}
            <PolicySection
              id="listings"
              icon={<HiOutlineGlobeAlt />}
              title="3. Property Listings & Leads"
            >
              <p>
                Property information submitted by sellers or property owners may
                be displayed publicly on our platform. This may include property
                photos, location, price, description, amenities and other
                listing details.
              </p>

              <p>
                When you submit an enquiry or lead, certain information such as
                your name, phone number or email may be shared with the relevant
                property owner or authorized agent so they can respond to your
                enquiry.
              </p>
            </PolicySection>

            {/* Cookies */}
            <PolicySection
              id="cookies"
              icon={<HiOutlineInformationCircle />}
              title="4. Cookies & Tracking Technologies"
            >
              <p>
                We may use cookies and similar technologies to remember your
                preferences, maintain login sessions, understand website usage
                and improve our services.
              </p>

              <p>
                You can control or disable cookies through your browser
                settings. Some features of the website may not function properly
                if cookies are disabled.
              </p>
            </PolicySection>

            {/* Sharing */}
            <PolicySection
              id="sharing"
              icon={<HiOutlineUserGroup />}
              title="5. Information Sharing"
            >
              <p>
                We do not sell your personal information. We may share
                information when necessary to operate our services, including
                with authorized service providers, property owners or agents
                when you submit an enquiry, or when required by applicable law.
              </p>
            </PolicySection>

            {/* Security */}
            <PolicySection
              id="security"
              icon={<HiOutlineLockClosed />}
              title="6. Data Security"
            >
              <p>
                We take reasonable technical and organizational measures to
                protect your personal information from unauthorized access,
                alteration, disclosure or destruction.
              </p>

              <div className="mt-5 rounded-xl border border-teal-100 bg-teal-50 p-5">
                <p className="font-medium text-[#0d766e]">
                  🔒 We recommend that you never share your password, OTP,
                  banking credentials or other sensitive information with anyone
                  through our platform.
                </p>
              </div>
            </PolicySection>

            {/* Rights */}
            <PolicySection
              id="rights"
              icon={<HiOutlineUserGroup />}
              title="7. Your Rights"
            >
              <p>
                Depending on applicable law, you may have rights regarding your
                personal information, including requesting access, correction or
                deletion of certain information associated with your account.
              </p>

              <p>
                You may contact us if you believe your information is inaccurate
                or if you have questions about how your information is handled.
              </p>
            </PolicySection>

            {/* Changes */}
            <PolicySection
              id="changes"
              icon={<HiOutlineInformationCircle />}
              title="8. Changes to This Privacy Policy"
            >
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our services, technology or legal requirements.
                Updated versions will be published on this page with a revised
                “Last Updated” date.
              </p>
            </PolicySection>

            {/* Contact */}
            <section
              id="contact"
              className="rounded-2xl bg-[#0d9488] p-7 text-white shadow-lg md:p-9"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <HiOutlineMail size={25} />
              </div>

              <h2 className="mt-5 text-2xl font-bold">9. Contact Us</h2>

              <p className="mt-3 max-w-2xl leading-7 text-teal-50">
                If you have any questions, concerns or requests regarding this
                Privacy Policy, please contact our support team.
              </p>

              <div className="mt-6 rounded-xl bg-white/10 p-5">
                <p className="font-semibold">Privacy Support</p>
                <p className="mt-1 text-teal-50">
                  Email: privacy@yourrealestate.com
                </p>
                <p className="text-teal-50">Phone: +91 XXXXX XXXXX</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

const PolicySection = ({ id, icon, title, children }) => {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-[#0d9488]">
          {React.cloneElement(icon, { size: 22 })}
        </div>

        <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
      </div>

      <div className="space-y-4 text-[15px] leading-7 text-slate-600 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_li]:pl-1">
        {children}
      </div>
    </section>
  );
};

export default PrivacyPolicy;
