import React, { useEffect, useState } from "react";

import { profileStyles as s } from "../../assets/dummyStyles";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/common/Navbar";

import axios from "axios";
import API_URL from "../../config";

import {
  HiCheck,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineUser,
  HiX,
} from "react-icons/hi";

const Profile = () => {
  const { user, setUser, token } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [removeProfilePic, setRemoveProfilePic] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);

      setFormData((prev) => ({
        ...prev,
        phone: numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Image type validation
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setRemoveProfilePic(false);
    setError("");
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setRemoveProfilePic(true);
  };

  const handleCancel = () => {
    setIsEditing(false);

    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });

    setImageFile(null);
    setImagePreview(null);
    setRemoveProfilePic(false);
    setError("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    if (!formData.name.trim()) {
      setError("Name is required.");
      setLoading(false);
      return;
    }

    if (formData.phone && formData.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();

      data.append("name", formData.name.trim());
      data.append("phone", formData.phone);
      data.append("address", formData.address.trim());

      if (imageFile) {
        data.append("profilePic", imageFile);
      }

      if (removeProfilePic) {
        data.append("removeProfilePic", "true");
      }

      const res = await axios.put(`${API_URL}/api/user/profile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        const updatedUser = res.data.user;

        setUser(updatedUser);

        localStorage.setItem("user", JSON.stringify(updatedUser));

        setIsEditing(false);
        setImageFile(null);
        setImagePreview(null);
        setRemoveProfilePic(false);
        setError("");
      } else {
        setError(res.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Profile update error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update profile. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className={s.containerWrapper(user?.role)}>
      {user?.role !== "seller" && <Navbar />}

      <div className={s.mainContainer(user?.role)}>
        {/* =========================
            PAGE HEADER
        ========================= */}
        <header className={s.header}>
          <h1 className={s.pageTitle}>Personal Profile</h1>

          <p className={s.pageSubtitle}>
            Manage your personal information and account settings.
          </p>
        </header>

        {/* =========================
            PROFILE CARD
        ========================= */}
        <div className={s.card}>
          {/* =========================
              PROFILE TOP SECTION
          ========================= */}
          <div className={s.profileHeader}>
            {/* PROFILE IMAGE */}
            <div className={s.avatarSection}>
              <div className={s.avatarWrapper}>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className={s.avatarImage}
                  />
                ) : !removeProfilePic && user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className={s.avatarImage}
                  />
                ) : (
                  <span className={s.avatarPlaceholder}>
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </span>
                )}
              </div>

              {/* IMAGE BUTTONS */}
              {isEditing && (
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginTop: "10px",
                  }}
                >
                  {/* Upload */}
                  <label className={s.uploadButton}>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="hidden"
                      accept="image/*"
                    />

                    <HiOutlineUser size={20} />
                  </label>

                  {(imagePreview ||
                    (!removeProfilePic && user?.profilePic)) && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className={s.removeButton}
                      title="Remove Profile Picture"
                    >
                      <HiX size={20} />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div>
              <h2 className={s.userName}>{user?.name || "User"}</h2>

              <span className={s.roleBadge}>
                {user?.role?.toUpperCase() || "USER"}
              </span>
            </div>
          </div>

          {error && <div className={s.errorMessage}>{error}</div>}

          {isEditing ? (
            <form onSubmit={handleUpdate} className={s.editForm}>
              <div>
                <label className={s.label}>Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={s.input}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className={s.label}>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  className={s.input}
                  placeholder="Enter your 10 digit phone number"
                />
              </div>

              <div>
                <label className={s.label}>Address</label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={s.textarea}
                  placeholder="Enter your full address"
                  rows={4}
                />
              </div>

              <div className={s.formActions}>
                <button
                  type="submit"
                  disabled={loading}
                  className={s.saveButton}
                >
                  <HiCheck size={20} />

                  {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className={s.cancelButton}
                >
                  <HiX size={20} />
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className={s.infoSection}>
              <div className={s.infoItem}>
                <div className={s.infoIcon}>
                  <HiOutlineMail size={24} />
                </div>

                <div>
                  <div className={s.infoLabel}>Email Address</div>

                  <div className={s.infoValue}>
                    {user?.email || "Not Provided"}
                  </div>
                </div>
              </div>

              <div className={s.infoItem}>
                <div className={s.infoIcon}>
                  <HiOutlinePhone size={24} />
                </div>

                <div>
                  <div className={s.infoLabel}>Phone Number</div>

                  <div className={s.infoValue}>
                    {user?.phone || "Not Provided"}
                  </div>
                </div>
              </div>

              <div className={s.infoItem}>
                <div className={s.infoIcon}>
                  <HiOutlineLocationMarker size={24} />
                </div>

                <div>
                  <div className={s.infoLabel}>Location / Address</div>

                  <div className={s.infoValue}>
                    {user?.address || "Not Provided"}
                  </div>
                </div>
              </div>

              <div className={s.editButtonWrapper}>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(true);
                    setError("");
                  }}
                  className={s.editProfileButton}
                >
                  Edit Profile Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
