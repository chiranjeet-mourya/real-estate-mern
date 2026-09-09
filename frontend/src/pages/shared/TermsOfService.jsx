import React from "react";
import {
  HiShieldCheck,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiOutlineHome,
  HiOutlineLockClosed,
  HiOutlineExclamationCircle,
  HiOutlineScale,
  HiOutlineMail,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import Navbar from "../../components/common/Navbar";

const TermsOfService = () => {
  const sections = [
    { id: "acceptance", title: "Acceptance of Terms",path:"/privacy-policy" },
    { id: "platform", title: "Our Platform" },
    { id: "eligibility", title: "User Eligibility" },
    { id: "accounts", title: "User Accounts" },
    { id: "listings", title: "Property Listings" },
    { id: "enquiries", title: "Enquiries & Leads" },
    { id: "conduct", title: "Acceptable Use" },
    { id: "verification", title: "Property Verification" },
    { id: "intellectual", title: "Intellectual Property",path:"/properties" },
    { id: "disclaimer", title: "Disclaimer" },
    { id: "liability", title: "Limitation of Liability" },
    { id: "termination", title: "Termination" },
    { id: "law", title: "Governing Law" },
    { id: "contact", title: "Contact Us", path:"/contact" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0d9488]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 mt-10 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              <HiShieldCheck size={20} />
              Clear & Transparent Terms
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Terms of Service
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-teal-50">
              These terms explain the rules and responsibilities that apply when
              you use our real estate platform, browse properties, create
              listings or contact property owners.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <span className="rounded-full bg-white/10 px-4 py-2 text-teal-50">
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2 text-teal-50">
                Effective Immediately
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Notice */}
        <div className="mb-10 rounded-2xl border border-teal-100 bg-white p-6 shadow-sm md:p-8">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0d9488]">
              <HiOutlineDocumentText size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Please read these terms carefully
              </h2>

              <p className="mt-2 leading-7 text-slate-600">
                By accessing or using our website, creating an account, posting
                a property, submitting an enquiry or using any of our services,
                you agree to comply with these Terms of Service and our Privacy
                Policy.
              </p>
            </div>
          </div>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
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
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-teal-50 hover:text-[#0d9488] cursor-pointer"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="min-w-0 space-y-8">
            <TermsSection
              id="acceptance"
              icon={<HiOutlineDocumentText />}
              title="1. Acceptance of Terms"
            >
              <p>
                By accessing, browsing or using our real estate platform, you
                acknowledge that you have read, understood and agree to be bound
                by these Terms of Service.
              </p>

              <p>
                If you do not agree with any part of these Terms, you should
                stop using the platform immediately.
              </p>
            </TermsSection>

            <TermsSection
              id="platform"
              icon={<HiOutlineHome />}
              title="2. Our Platform"
            >
              <p>
                Our platform provides online tools that allow users to discover,
                advertise and enquire about residential and commercial
                properties.
              </p>

              <p>
                Unless specifically stated otherwise, the platform acts as a
                technology and property-listing service and does not itself
                become a party to transactions between buyers, sellers,
                landlords, tenants, builders or agents.
              </p>
            </TermsSection>

            <TermsSection
              id="eligibility"
              icon={<HiOutlineUserGroup />}
              title="3. User Eligibility"
            >
              <p>
                You must provide accurate information and have the legal
                capacity to use our services and enter into agreements under
                applicable law.
              </p>

              <ul>
                <li>You must provide truthful registration information.</li>
                <li>You must keep your account information updated.</li>
                <li>
                  You must not create an account using another person's
                  identity.
                </li>
                <li>
                  You must comply with all applicable laws and regulations.
                </li>
              </ul>
            </TermsSection>

            <TermsSection
              id="accounts"
              icon={<HiOutlineLockClosed />}
              title="4. User Accounts"
            >
              <p>
                Some features may require you to create an account. You are
                responsible for maintaining the confidentiality of your login
                credentials and for activities performed through your account.
              </p>

              <div className="mt-5 rounded-xl border border-teal-100 bg-teal-50 p-5">
                <p className="font-medium text-[#0d766e]">
                  🔐 Never share your password, OTP, banking credentials or
                  other sensitive authentication information with another
                  person.
                </p>
              </div>
            </TermsSection>

            <TermsSection
              id="listings"
              icon={<HiOutlineHome />}
              title="5. Property Listings"
            >
              <p>
                Users who post properties are responsible for ensuring that
                their listing information is accurate, current and
                non-misleading.
              </p>

              <ul>
                <li>Property descriptions should be accurate.</li>
                <li>
                  Prices and availability should be updated when necessary.
                </li>
                <li>
                  Users must have appropriate authority to advertise a property.
                </li>
                <li>
                  Uploaded photographs and documents must not violate
                  third-party rights.
                </li>
                <li>
                  False, fraudulent or misleading listings are prohibited.
                </li>
              </ul>
            </TermsSection>

            <TermsSection
              id="enquiries"
              icon={<HiOutlineUserGroup />}
              title="6. Enquiries & Leads"
            >
              <p>
                When a user submits an enquiry about a property, the information
                provided may be shared with the relevant property owner, seller,
                landlord, builder or authorized agent for the purpose of
                responding to the enquiry.
              </p>

              <p>
                Users should independently verify the identity of the person
                they communicate with before sharing sensitive information or
                making payments.
              </p>
            </TermsSection>

            <TermsSection
              id="conduct"
              icon={<HiOutlineExclamationCircle />}
              title="7. Acceptable Use"
            >
              <p>You agree not to use the platform to:</p>

              <ul>
                <li>Publish fraudulent or misleading property information.</li>
                <li>Impersonate another person or organization.</li>
                <li>Upload unlawful, abusive or discriminatory content.</li>
                <li>Attempt to gain unauthorized access to another account.</li>
                <li>Distribute malware or malicious links.</li>
                <li>Scrape or misuse platform data without permission.</li>
                <li>Use the platform for illegal activities.</li>
              </ul>
            </TermsSection>

            <TermsSection
              id="verification"
              icon={<HiOutlineShieldCheck />}
              title="8. Property Verification"
            >
              <p>
                We may review, moderate or remove property listings when
                necessary. However, verification features, badges or platform
                checks should not be treated as a guarantee of ownership, title,
                approvals, pricing, legality or transaction safety.
              </p>

              <p>
                Buyers and tenants are responsible for performing their own due
                diligence before entering into any property transaction.
              </p>
            </TermsSection>

            <TermsSection
              id="intellectual"
              icon={<HiOutlineDocumentText />}
              title="9. Intellectual Property"
            >
              <p>
                The website design, branding, logos, software, graphics, text
                and other original platform materials are protected by
                applicable intellectual property laws.
              </p>

              <p>
                You may not copy, reproduce, distribute, modify or commercially
                exploit platform content without appropriate authorization.
              </p>
            </TermsSection>

            <TermsSection
              id="disclaimer"
              icon={<HiOutlineExclamationCircle />}
              title="10. Disclaimer"
            >
              <p>
                Property information is generally provided by users, owners,
                agents, builders or other third parties. We do not guarantee
                that every listing is accurate, complete, available or suitable
                for a particular purpose.
              </p>

              <p>
                Users should independently verify property ownership, documents,
                approvals, measurements, pricing, availability and other
                transaction details before proceeding.
              </p>
            </TermsSection>

            <TermsSection
              id="liability"
              icon={<HiOutlineScale />}
              title="11. Limitation of Liability"
            >
              <p>
                To the maximum extent permitted by applicable law, we will not
                be responsible for losses arising from transactions,
                communications or arrangements made directly between users,
                including losses caused by inaccurate third-party information.
              </p>

              <p>
                Nothing in these Terms is intended to exclude or limit any
                liability that cannot lawfully be excluded or limited.
              </p>
            </TermsSection>

            <TermsSection
              id="termination"
              icon={<HiOutlineLockClosed />}
              title="12. Suspension & Termination"
            >
              <p>
                We may suspend, restrict or terminate access to an account or
                remove a listing if we reasonably believe that the user has
                violated these Terms, applicable law or platform policies.
              </p>

              <p>
                We may also take action to protect users, the platform or third
                parties from fraud, abuse or security threats.
              </p>
            </TermsSection>

            <TermsSection
              id="law"
              icon={<HiOutlineScale />}
              title="13. Governing Law"
            >
              <p>
                These Terms shall be interpreted in accordance with the
                applicable laws of India, subject to any mandatory rights or
                protections available to users under applicable law.
              </p>

              <p>
                Any dispute relating to the platform or these Terms shall be
                handled through the dispute-resolution process and jurisdiction
                specified by the platform's applicable legal arrangements.
              </p>
            </TermsSection>

            {/* Contact */}
            <section
              id="contact"
              className="scroll-mt-24 rounded-2xl bg-[#0d9488] p-7 text-white shadow-lg md:p-9"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <HiOutlineMail size={25} />
              </div>

              <h2 className="mt-5 text-2xl font-bold">14. Contact Us</h2>

              <p className="mt-3 max-w-2xl leading-7 text-teal-50">
                If you have questions about these Terms of Service or need
                assistance with your account, listings or platform usage, please
                contact our support team.
              </p>

              <div className="mt-6 rounded-xl bg-white/10 p-5">
                <p className="font-semibold">Legal & Support</p>

                <p className="mt-1 text-teal-50">
                  Email: legal@yourrealestate.com
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

const TermsSection = ({ id, icon, title, children }) => {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0d9488]">
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

export default TermsOfService;
