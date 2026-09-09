import React, { useEffect, useState } from "react";

import { wishlistStyles as s } from "../../assets/dummyStyles";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/common/Navbar";
import axios from "axios";
import API_URL from "../../config";
import { HiHeart, HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import PropertyCard from "../../components/common/PropertyCard";

const Wishlist = () => {
  const { token } = useAuth();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${API_URL}/api/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      const items =
        res.data?.wishlist ||
        res.data?.wishlists ||
        res.data?.data ||
        res.data ||
        [];

      setWishlistItems(Array.isArray(items) ? items : []);
    } catch (error) {
      console.error("Fetch wishlist error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load wishlist"
      );

      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async (propertyId) => {
    if (!propertyId) {
      alert("Invalid property ID");
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/api/wishlist/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWishlistItems((prev) =>
        prev.filter((item) => {
          const id =
            item?.property?._id ||
            item?.property?.id ||
            item?.propertyId;

          return id?.toString() !== propertyId.toString();
        })
      );

    } catch (error) {
      console.error("Remove wishlist error:", error);

      const errMsg =
        error.response?.data?.message ||
        "Failed to remove from wishlist";

      alert(errMsg);
    }
  }; 

  if (loading) {
    return (
      <div className={s.loaderFullPage}>
        <div className={s.loader}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={s.pageContainer}>
        <Navbar />

        <main className={s.mainContainer}>
          <div className={s.emptyCard}>
            <div className={s.emptyIconWrapper}>
              <HiHeart size={40} />
            </div>

            <h2 className={s.emptyTitle}>
              Unable to load wishlist
            </h2>

            <p className={s.emptyText}>
              {error}
            </p>

            <button
              onClick={fetchWishlist}
              className={s.browseButton}
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={s.pageContainer}>
      <Navbar />

      <main className={s.mainContainer}>
        <div className={s.headingWrapper}>
          <h1 className={s.heading}>
            Your Wishlist
          </h1>

          <p className={s.subheading}>
            Properties you've saved for later.
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className={s.emptyCard}>
            <div className={s.emptyIconWrapper}>
              <HiHeart size={40} />
            </div>

            <h2 className={s.emptyTitle}>
              Your Wishlist is empty
            </h2>

            <p className={s.emptyText}>
              Start exploring properties and save your
              favorites!
            </p>

            <Link
              to="/"
              className={s.browseButton}
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className={s.gridContainer}>
            {wishlistItems
              .filter((item) => item?.property)
              .map((item) => {
                const propertyId = item?.property?._id;

                if (!propertyId) {
                  return null;
                }

                return (
                  <PropertyCard
                    key={item._id || propertyId}
                    property={item.property}

                    renderActions={() => (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          removeWishlist(propertyId);
                        }}
                        className={s.removeButton}
                      >
                        <HiTrash size={18} />
                        <span>
                          Remove From Wishlist
                        </span>
                      </button>
                    )}
                  />
                );
              })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
