import React, { useEffect, useState } from "react";
import {
  HiOutlineCog,
  HiOutlineGlobeAlt,
  HiOutlineUser,
  HiOutlineShieldCheck,
  HiOutlineMail,
  HiOutlineKey,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import axios from "axios";

import API_URL from "../../config";
import { useAuth } from "../../context/AuthContext";

const AdminSettings = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [userError, setUserError] = useState("");

  const { token } = useAuth();

  // Fetch users from database
  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        setLoadingUsers(false);
        setUserError("Authentication token not found.");
        return;
      }

      try {
        setLoadingUsers(true);
        setUserError("");

        const res = await axios.get(
          `${API_URL}/api/admin/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setUsers(
            Array.isArray(res.data.users)
              ? res.data.users
              : []
          );
        } else {
          setUsers([]);
          setUserError(
            res.data.message || "Failed to load users."
          );
        }
      } catch (error) {
        console.error("❌ Failed to load users:", error);

        setUsers([]);

        setUserError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load users."
        );
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [token]);

  // Get icon according to role
  const getRoleIcon = (role) => {
    if (role?.toLowerCase() === "admin") {
      return HiOutlineShieldCheck;
    }

    return HiOutlineUser;
  };

  // Format role
  const formatRole = (role) => {
    if (!role) return "User";

    return (
      role.charAt(0).toUpperCase() +
      role.slice(1)
    );
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto">

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ccfbf1] text-[#0d9488]">
                <HiOutlineCog size={26} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                  Admin Settings
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Manage website settings and account information
                </p>
              </div>

            </div>

            <div className="flex items-center gap-2 rounded-full border border-teal-100 bg-[#ccfbf1] px-4 py-2 text-sm font-medium text-[#0d9488]">
              <HiOutlineCheckCircle size={18} />
              System Active
            </div>

          </div>
        </div>

        {/* ================= WEBSITE SETTINGS ================= */}
        <section className="mb-8">

          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-800">
              Website Settings
            </h2>

            <p className="text-sm text-slate-500">
              Basic information about your real estate platform
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

            {/* Website Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">

              <div className="mb-4 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ccfbf1] text-[#0d9488]">
                  <HiOutlineGlobeAlt size={21} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    Website Information
                  </h3>

                  <p className="text-xs text-slate-500">
                    Platform details
                  </p>
                </div>

              </div>

              <div className="space-y-4">

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Website Name
                  </label>

                  <input
                    type="text"
                    defaultValue="Real Estate Platform"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0d9488] focus:ring-2 focus:ring-[#ccfbf1]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Website URL
                  </label>

                  <input
                    type="text"
                    defaultValue="https://yourwebsite.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0d9488] focus:ring-2 focus:ring-[#ccfbf1]"
                  />
                </div>

              </div>
            </div>

            {/* Website Status */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">

              <div className="mb-4 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ccfbf1] text-[#0d9488]">
                  <HiOutlineShieldCheck size={21} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    Website Status
                  </h3>

                  <p className="text-xs text-slate-500">
                    Current platform status
                  </p>
                </div>

              </div>

              <div className="rounded-xl bg-[#ccfbf1] p-4">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="font-semibold text-[#0d9488]">
                      Website Online
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Your website is currently operational.
                    </p>
                  </div>

                  <div className="h-3 w-3 rounded-full bg-[#0d9488] shadow-[0_0_0_4px_#99f6e4]" />

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ================= ACCOUNT CREDENTIALS ================= */}
        <section>

          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Account Credentials
              </h2>

              <p className="text-sm text-slate-500">
                User accounts fetched directly from the database
              </p>
            </div>

            {!loadingUsers && !userError && (
              <div className="w-fit rounded-full bg-[#ccfbf1] px-3 py-1 text-xs font-semibold text-[#0d9488]">
                {users.length}{" "}
                {users.length === 1 ? "User" : "Users"}
              </div>
            )}

          </div>

          {/* ================= LOADING ================= */}
          {loadingUsers && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >

                  <div className="border-b border-slate-100 p-5">

                    <div className="flex items-center gap-3">

                      <div className="h-11 w-11 rounded-xl bg-slate-200" />

                      <div className="flex-1">

                        <div className="mb-2 h-4 w-32 rounded bg-slate-200" />

                        <div className="h-3 w-24 rounded bg-slate-200" />

                      </div>

                    </div>

                  </div>

                  <div className="space-y-4 p-5">

                    <div>
                      <div className="mb-2 h-3 w-16 rounded bg-slate-200" />
                      <div className="h-12 rounded-xl bg-slate-100" />
                    </div>

                    <div>
                      <div className="mb-2 h-3 w-20 rounded bg-slate-200" />
                      <div className="h-12 rounded-xl bg-slate-100" />
                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}

          {/* ================= ERROR ================= */}
          {!loadingUsers && userError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">

              <HiOutlineShieldCheck
                size={40}
                className="mx-auto text-red-400"
              />

              <h3 className="mt-3 font-semibold text-red-700">
                Failed to Load Users
              </h3>

              <p className="mt-1 text-sm text-red-600">
                {userError}
              </p>

            </div>
          )}

          {/* ================= USERS ================= */}
          {!loadingUsers &&
            !userError &&
            users.length > 0 && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                {users.map((account) => {

                  const Icon = getRoleIcon(account.role);

                  return (
                    <div
                      key={account._id}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >

                      {/* Card Header */}
                      <div className="border-b border-slate-100 p-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ccfbf1] text-[#0d9488]">
                            <Icon size={23} />
                          </div>

                          <div className="min-w-0">

                            <h3 className="truncate font-bold text-slate-800">
                              {account.name || "Unnamed User"}
                            </h3>

                            <p className="text-xs text-slate-500">
                              {formatRole(account.role)} Account
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* Credentials */}
                      <div className="space-y-4 p-5">

                        {/* Email */}
                        <div>

                          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <HiOutlineMail size={15} />
                            Email
                          </label>

                          <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">

                            <p className="break-all text-sm font-medium text-slate-700">
                              {account.email || "No email"}
                            </p>

                          </div>

                        </div>

                        {/* Password */}
                        <div>

                          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <HiOutlineKey size={15} />
                            Password
                          </label>

                          <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">

                            <p className="text-sm font-medium tracking-widest text-slate-600">
                              ••••••••
                            </p>

                          </div>

                        </div>

                        {/* Account Type */}
                        <div className="flex items-center justify-between border-t border-slate-100 pt-4">

                          <span className="text-xs text-slate-500">
                            Account Type
                          </span>

                          <span className="rounded-full bg-[#ccfbf1] px-3 py-1 text-xs font-semibold text-[#0d9488]">
                            {formatRole(account.role)}
                          </span>

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>
            )}

          {/* ================= EMPTY ================= */}
          {!loadingUsers &&
            !userError &&
            users.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

                <HiOutlineUser
                  size={45}
                  className="mx-auto text-slate-300"
                />

                <h3 className="mt-3 font-semibold text-slate-700">
                  No Users Found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  No user accounts are available in the database.
                </p>

              </div>
            )}

        </section>

        {/* ================= SECURITY NOTICE ================= */}
        <div className="mt-8 flex gap-3 rounded-2xl border border-teal-100 bg-[#ccfbf1] p-5">

          <HiOutlineShieldCheck
            className="mt-0.5 shrink-0 text-[#0d9488]"
            size={22}
          />

          <div>

            <h3 className="font-semibold text-[#0d9488]">
              Security Notice
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              User account information is loaded securely from
              the database. Passwords are intentionally hidden
              because they are stored securely on the server.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminSettings;