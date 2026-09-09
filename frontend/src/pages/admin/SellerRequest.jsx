import React, { useEffect, useState } from "react";
import { sellerRequestsStyles as s } from "../../assets/dummyStyles";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import API_URL from "../../config";
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";

const SellerRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  // fetch the requests(made by seller)
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/pending-seller`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setRequests(res.data.pendingSellers);
        }
        setLoading(false);
      } catch (error) {
        console.log("Failed to load sellers requests:", error);
        setLoading(false);
      }
    };
    fetchRequest();
  }, [token]);

  // approve a seller
  // const handleApprove = async (id) => {
  //   try {
  //     const res = await axios.patch(
  //       `${API_URL}/api/admin/approve-seller/${id}`,
  //       {},
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       },
  //     );
  //     if (res.data.success) {
  //       setRequests(requests.filter((req) => req._id !== id));
  //       alert("Seller approved successfully!");
  //     }
  //   } catch (error) {
  //     alert("Failed to approve a seller");
  //   }
  // };
  const handleApprove = async (id) => {
    try {
      console.log("Approving seller ID:", id);

      const res = await axios.patch(
        `${API_URL}/api/admin/approve-seller/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Approve seller response:", res.data);

      if (res.data.success) {
        setRequests((prev) => prev.filter((req) => req._id !== id));
        alert("Seller approved successfully!");
      } else {
        alert(res.data.message || "Failed to approve seller");
      }
    } catch (error) {
      console.error("❌ Approve seller error:", error);

      console.error("Status:", error.response?.status);
      console.error("Response:", error.response?.data);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to approve a seller",
      );
    }
  };

  if (loading) {
    return (
      <div className={s.loaderFullPage}>
        <div className={s.loader}></div>
      </div>
    );
  }

  return (
    <>
      <div className={s.container}>
        <div className={s.headerContainer}>
          <h1 className={s.pageTitle}>Seller Verification</h1>
          <p className={s.pageSubtitle}>
            Review and approve new seller registration requests.
          </p>
        </div>

        <div className={s.card}>
          <div className={s.cardInner}>
            <h2 className={s.sectionTitle}>
              Pending Requests ({requests.length})
            </h2>

            {requests.length === 0 ? (
              <div className={s.emptyState}>
                <HiOutlineCheckCircle size={48} className={s.emptyStateIcon} />
                <p>No Pending seller requests at the moment.</p>
              </div>
            ) : (
              <div className={s.requestGrid}>
                {requests.map((req) => (
                  <div className={s.requestCard} key={req._id}>
                    <div className={s.requestHeader}>
                      <div className={s.avatar}>
                        {req.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <div className={s.requestName}>{req.name}</div>
                        <div className={s.requestDate}>
                          <HiOutlineClock /> Joined{" "}
                          {new Date(req.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className={s.contactInfo}>
                      <div className={s.contactItem}>
                        <HiOutlineMail size={18} className="text-primary" />{" "}
                        {req.email}
                      </div>
                      {req.phone && (
                        <div className={s.contactItem}>
                          <HiOutlinePhone size={18} className="text-primary" />{" "}
                          {req.phone}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleApprove(req._id)}
                      className={s.approveButton}
                    >
                      <HiOutlineCheckCircle size={20} />
                      Approve Seller
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerRequest;
