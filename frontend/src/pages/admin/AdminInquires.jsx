import React, { useEffect, useState } from "react";
import { adminInquiriesStyles as s } from "../../assets/dummyStyles";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import API_URL from "../../config";

import {
  HiOutlineAnnotation,
  HiOutlineCalendar,
  HiOutlineHome,
} from "react-icons/hi";

const AdminInquires = () => {
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { token } = useAuth();

  useEffect(() => {
    const fetchInquiries = async () => {
      if (!token) {
        setLoading(false);
        setError("Authentication token not found.");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${API_URL}/api/admin/inquires`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("📩 Inquiry API Response:", res.data);

        if (res.data.success) {
          setInquiries(
            Array.isArray(res.data.inquires) ? res.data.inquires : [],
          );
        } else {
          setInquiries([]);
          setError(res.data.message || "Failed to load inquiries.");
        }
      } catch (error) {
        console.error("❌ Failed to load inquiries:", error);

        setInquiries([]);

        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load inquiries.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [token]);

  if (loading) {
    return (
      <div className={s.loaderFullPage}>
        <div className={s.loader}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        <h3 className="text-xl font-semibold">Error loading inquiries</h3>

        <p className="mt-2">{error}</p>

        <button
          type="button"
          className="mt-4 px-4 py-2 rounded-lg bg-red-600 text-white"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={s.headerContainer}>
        <h1 className={s.headerTitle}>Platform Inquiries</h1>

        <p className={s.headerSubtitle}>
          Review communication between buyers and sellers.
        </p>
      </div>

      <div className={s.listContainer}>
        {inquiries.map((inq) => (
          <div key={inq._id} className={s.inquiryCard}>
            <div className={s.cardTopSection}>
              <div className={s.propertyInfoWrapper}>
                <div className={s.propertyIconWrapper}>
                  <HiOutlineHome size={24} />
                </div>

                <div className={s.propertyTextWrapper}>
                  <div className={s.propertyTitle}>
                    {inq.property?.title || "Unknown Property"}
                  </div>

                  <div className={s.propertyId}>
                    Property ID: {inq.property?._id || "N/A"}
                  </div>
                </div>
              </div>

              <div className={s.dateWrapper}>
                <HiOutlineCalendar className={s.dateIcon} />

                {inq.createdAt
                  ? new Date(inq.createdAt).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>

            <div className={s.detailsGrid}>
              <div className={s.detailCard}>
                <div className={s.detailLabel}>Buyer Details</div>

                <div className={s.detailName}>
                  {inq.buyer?.name || "Unknown Buyer"}
                </div>

                <div className={s.detailEmail}>
                  {inq.buyer?.email || "No email"}
                </div>
              </div>

              <div className={s.detailCard}>
                <div className={s.detailLabel}>Seller Details</div>

                <div className={s.detailName}>
                  {inq.seller?.name || "Unknown Seller"}
                </div>

                <div className={s.detailEmail}>
                  {inq.seller?.email || "No email"}
                </div>
              </div>
            </div>

            <div className={s.messageContainer}>
              <div className={s.messageHeader}>
                <HiOutlineAnnotation />
                MESSAGE
              </div>

              <p className={s.messageText}>"{inq.message || "No message"}"</p>
            </div>
          </div>
        ))}

        {inquiries.length === 0 && (
          <div className={s.emptyState}>
            <div className={s.emptyIconWrapper}>
              <HiOutlineAnnotation size={48} className="mx-auto" />
            </div>

            <h2>No Inquiries found.</h2>

            <p className={s.emptyText}>
              There are no inquiries recorded on the platform yet.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminInquires;
