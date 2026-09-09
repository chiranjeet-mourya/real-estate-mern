import React, { useEffect, useState } from "react";
import { sellerDashboardStyles as s } from "../../assets/dummyStyles";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import API_URL from "../../config";

import {
  HiOutlineBell,
  HiOutlineCheckCircle,
  HiOutlineDownload,
  HiOutlineEye,
  HiOutlineLibrary,
  HiOutlinePencilAlt,
  HiOutlineSearch,
  HiOutlineTrash,
  HiOutlineUserGroup,
  HiPlay,
} from "react-icons/hi";

import { Link } from "react-router-dom";
import PropertyCard from "../../components/common/PropertyCard";

const SellerDashboard = () => {
  const { token } = useAuth();

  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListing: 0,
    soldProperties: 0,
    totalInquires: 0,
    totalViews: 0,
  });

  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
 

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);
 

      try {
        const statsRes = await axios.get(
          `${API_URL}/api/property/seller/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        if (statsRes.data?.success) {
          setStats(
            statsRes.data.stats || {
              totalProperties: 0,
              activeListing: 0,
              soldProperties: 0,
              totalInquiries: 0,
              totalViews: 0,
            }
          );
        }
      } catch (error) {
        console.error(
          "❌ Stats API Error:",
          error.response?.data || error.message
        );
      }
 

      try {
        const propsRes = await axios.get(
          `${API_URL}/api/property/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle all possible response formats
        let propertiesData = [];

        if (Array.isArray(propsRes.data)) {
          propertiesData = propsRes.data;
        } else if (Array.isArray(propsRes.data?.properties)) {
          propertiesData = propsRes.data.properties;
        } else if (Array.isArray(propsRes.data?.data)) {
          propertiesData = propsRes.data.data;
        }

        setProperties(propertiesData);
      } catch (error) {
        console.error(
          "❌ Properties API Error:",
          error.response?.data || error.message
        );

        setProperties([]);
      }
 
      try {
        const inqRes = await axios.get(
          `${API_URL}/api/inquiry/seller`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let inquiriesData = [];

        if (Array.isArray(inqRes.data)) {
          inquiriesData = inqRes.data;
        } else if (Array.isArray(inqRes.data?.inquiries)) {
          inquiriesData = inqRes.data.inquiries;
        } else if (Array.isArray(inqRes.data?.data)) {
          inquiriesData = inqRes.data.data;
        }

        setInquiries(inquiriesData.slice(0, 3));
      } catch (error) {
        console.error(
          "❌ Inquiry API Error:",
          error.response?.data || error.message
        );

        setInquiries([]);
      }


      setLoading(false);
    };

    fetchDashboardData();
  }, [token]);


  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this listing?"
      )
    ) {
      return;
    }

    try {
      const res = await axios.delete(
        `${API_URL}/api/property/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setProperties((prev) =>
        prev.filter((p) => p._id !== id)
      );
    } catch (error) {
      console.error(
        "❌ Delete Property Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete property."
      );
    }
  };


  const handleStatusUpdate = async (
    id,
    currentStatus
  ) => {
    const newStatus =
      currentStatus === "sold" ? "sale" : "sold";

    try {
      const res = await axios.patch(
        `${API_URL}/api/property/${id}/status`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.success) {
        setProperties((prev) =>
          prev.map((property) =>
            property._id === id
              ? {
                  ...property,
                  status: newStatus,
                }
              : property
          )
        );
      }
    } catch (error) {
      console.error(
        "❌ Status Update Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to update property status."
      );
    }
  };


  const handleExport = () => {
    if (!properties.length) {
      alert("No properties available to export.");
      return;
    }

    const headers = [
      "Title",
      "Location",
      "Type",
      "Price",
      "Status",
      "Views",
    ];

    const csvRows = properties.map((p) => [
      p.title || "",
      `${p.area || ""}, ${p.city || ""}`,
      p.propertyType || "",
      p.price || "",
      p.status || "",
      p.views || 0,
    ]);

    const csvContent = [
      headers,
      ...csvRows,
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "property_listings.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="loader-full-page">
        <div className="loader"></div>
      </div>
    );
  }


  const statCards = [
    {
      title: "Total Views",
      value:
        stats.totalViews?.toLocaleString() || "0",
      icon: HiOutlineEye,
      color: "#0d6e59",
    },
    {
      title: "Active Leads",
      value:
        stats.totalInquiries?.toLocaleString() || "0",
      icon: HiOutlineUserGroup,
      color: "#0d6e59",
    },
    {
      title: "Live Listings",
      value:
        stats.activeListing?.toLocaleString() || "0",
      icon: HiOutlineLibrary,
      color: "#0d6e59",
    },
    {
      title: "Properties Sold",
      value:
        stats.soldProperties?.toLocaleString() || "0",
      icon: HiOutlineCheckCircle,
      color: "#0d6e59",
    },
  ];


  const filteredProperties =
    Array.isArray(properties)
      ? properties
          .filter((p) => {
            const search =
              searchTerm.toLowerCase();

            const title =
              (p.title || "").toLowerCase();

            const city =
              (p.city || "").toLowerCase();

            const area =
              (p.area || "").toLowerCase();

            return (
              title.includes(search) ||
              city.includes(search) ||
              area.includes(search)
            );
          })
          .sort(
            (a, b) =>
              new Date(b.createdAt || 0) -
              new Date(a.createdAt || 0)
          )
      : [];

  return (
    <>

      <header className={s.header}>
        <div className={s.headerLeft}>
          <h1 className={s.headerTitle}>
            Seller Dashboard
          </h1>

          <p className={s.headerSubtitle}>
            Manage your property portfolio and
            track performance.
          </p>
        </div>

        <div className={s.headerActions}>
          <button
            onClick={handleExport}
            className={s.exportButton}
          >
            <HiOutlineDownload size={20} />
            Export
          </button>

          <Link
            to="/add-property"
            className={s.addButton}
          >
            <HiPlay size={20} />
            Add New
          </Link>
        </div>
      </header>

      <div className={s.statsGrid}>
        {statCards.map((card, i) => {
          const Icon = card.icon;

          return (
            <div
              key={i}
              style={{
                "--card-color": card.color,
              }}
              className={s.statCard}
            >
              <div className={s.statIconWrapper}>
                <Icon size={20} />
              </div>

              <div className={s.statTitle}>
                {card.title}
              </div>

              <div className={s.statValue}>
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      <div className={s.listingsSection}>
        <div className={s.listingsHeader}>
          <h2 className={s.listingsTitle}>
            Property Listing
          </h2>

          <div className={s.searchWrapper}>
            <HiOutlineSearch
              className={s.searchIcon}
            />

            <input
              type="text"
              placeholder="Search listing..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className={s.searchInput}
            />
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <div className={s.emptyListings}>
            {searchTerm
              ? `No Properties found matching "${searchTerm}"`
              : "No Properties found."}
          </div>
        ) : (
          <>

            <div className={s.propertiesGrid}>
              {filteredProperties
                .slice(0, 3)
                .map((p) => (
                  <PropertyCard
                    key={p._id}
                    property={p}
                    renderActions={() => (
                      <div
                        className={
                          s.propertyActions
                        }
                      >

                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            handleStatusUpdate(
                              p._id,
                              p.status
                            );
                          }}
                          className={s.statusButton(
                            p.status
                          )}
                          title={
                            p.status === "sold"
                              ? "Mark as Available"
                              : "Mark as Sold"
                          }
                        >
                          <HiOutlineCheckCircle
                            size={14}
                          />

                          {" "}

                          {p.status === "sold"
                            ? "Available"
                            : "Sold"}
                        </button>

                        <Link
                          to={`/edit-property/${p._id}`}
                          className={s.editButton}
                        >
                          <HiOutlinePencilAlt
                            size={14}
                          />

                          {" "}
                          Edit
                        </Link>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            handleDelete(p._id);
                          }}
                          className={
                            s.deleteButton
                          }
                        >
                          <HiOutlineTrash
                            size={14}
                          />

                          {" "}
                          Delete
                        </button>
                      </div>
                    )}
                  />
                ))}
            </div>

            {filteredProperties.length > 3 && (
              <div
                className={
                  s.showMoreWrapper
                }
              >
                <Link
                  to="/my-properties"
                  className={
                    s.showMoreButton
                  }
                >
                  Show More Listing

                  <HiOutlinePencilAlt
                    size={18}
                    style={{
                      transform:
                        "rotate(90deg)",
                    }}
                  />
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      <div className={s.widgetsGrid}>

        <div className={s.inquiriesWidget}>
          <h2 className={s.widgetTitle}>
            Recent Lead Inquiries
          </h2>

          <p className={s.widgetSubtitle}>
            New Message from potential buyers.
          </p>

          <div className={s.inquiriesList}>
            {inquiries.map((inq) => (
              <div
                key={inq._id}
                className={s.inquiryItem}
              >
                <div className={s.inquiryLeft}>
                  <div
                    className={
                      s.inquiryIcon
                    }
                  >
                    <HiOutlineBell
                      size={18}
                      color="var(--primary)"
                    />
                  </div>

                  <div>
                    <div
                      className={
                        s.inquiryName
                      }
                    >
                      {inq.buyer?.name ||
                        "Potential Buyer"}
                    </div>

                    <div
                      className={
                        s.inquiryProperty
                      }
                    >
                      {inq.property?.title
                        ? inq.property.title.length >
                          30
                          ? `${inq.property.title.slice(
                              0,
                              30
                            )}...`
                          : inq.property.title
                        : "Property Inquiry"}
                    </div>
                  </div>
                </div>

                <div
                  className={
                    s.inquiryRight
                  }
                >
                  <div
                    className={
                      s.inquiryDate
                    }
                  >
                    {inq.createdAt
                      ? new Date(
                          inq.createdAt
                        ).toLocaleDateString()
                      : "-"}
                  </div>

                  <span
                    className={s.inquiryStatus(
                      inq.status
                    )}
                  >
                    {inq.status === "read"
                      ? "Read"
                      : "New"}
                  </span>
                </div>
              </div>
            ))}

            {inquiries.length === 0 && (
              <p className={s.noInquiries}>
                No recent inquiries
              </p>
            )}
          </div>
        </div>

        <div className={s.tipsWidget}>
          <h2 className={s.widgetTitle}>
            Quick Tips
          </h2>

          <div className={s.tipsList}>
            <div
              className={
                s.tipCardHighViews
              }
            >
              <h4
                className={
                  s.tipTitleHighViews
                }
              >
                <HiOutlineEye
                  size={16}
                />

                High Views!
              </h4>

              <p
                className={
                  s.tipTextHighViews
                }
              >
                Your listings are trending.
                Try adding video tours to
                increase interest.
              </p>
            </div>

            <div
              className={
                s.tipCardMarket
              }
            >
              <h4
                className={
                  s.tipTitleMarket
                }
              >
                Market Insight
              </h4>

              <p
                className={
                  s.tipTextMarket
                }
              >
                Properties in your area are
                selling fast. Your prices are
                competitive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;