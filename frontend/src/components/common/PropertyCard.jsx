// import React from "react";
// import { propertyCardStyles as s } from "../../assets/dummyStyles";
// import { useAuth } from "../../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   HiArrowsExpand,
//   HiEye,
//   HiHeart,
//   HiLocationMarker,
//   HiOutlineHeart,
//   HiOutlineHome,
//   HiOutlineUserGroup,
//   HiShieldCheck,
// } from "react-icons/hi";

// const PropertyCard = ({
//   property,
//   renderActions,
//   isWishlisted,
//   onToggleWishlist,
// }) => {
//   if (!property) return null;

//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const handleWishlistClick = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!user) {
//       navigate("/login");
//       return;
//     }
//     if (onToggleWishlist) {
//       onToggleWishlist(property._id);
//     }
//   };

//   const formattedPrice = new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(property.price);

//   const statusBadgeClass = s.badgeStatus(property.status);

//   return (
//     <>
//       <div className={s.card}>
//         <Link to={`/property/${property._id}`} className={s.link}>
//           <div className={s.imageSection}>
//             <img
//               src={property.images?.[0] || "/placeholder-property.jpg"}
//               alt={property.title || "Property"}
//               className={s.image}
//             />

//             {/* top badges */}
//             <div className={s.topBadges}>
//               <div className={s.badgesLeft}>
//                 {renderActions ? (
//                   <span className={statusBadgeClass}>
//                     {property.status === "sale" ? "available" : property.status}
//                   </span>
//                 ) : (
//                   <span className={s.badgeNew}>New</span>
//                 )}
//                 <span className={s.badgeVerified}>
//                   <HiShieldCheck size={14} /> Verified
//                 </span>
//               </div>

//               {(!user || user.role === "buyer") && (
//                 <button
//                   className={s.wishlistButton(isWishlisted)}
//                   onClick={handleWishlistClick}
//                 >
//                   {isWishlisted ? (
//                     <HiHeart size={20} />
//                   ) : (
//                     <HiOutlineHeart size={20} />
//                   )}
//                 </button>
//               )}
//             </div>

//             <div className={s.priceOverlay}>
//               <h3 className={s.price}>{formattedPrice}</h3>
//             </div>

//             <div className={s.content}>
//               <div className="flex justify-between items-center">
//                 <span className={s.propertyType}>{property.propertyType}</span>
//                 {property.views !== undefined && (
//                   <div className={s.views}>
//                     <HiEye size={16} /> {property.views}
//                   </div>
//                 )}
//               </div>

//               <h4 className={s.title}>{property.title}</h4>

//               <div className={s.location}>
//                 <HiLocationMarker className={s.locationIcon} />
//                 <span className=" whitespace-nowrap overflow-hidden text-ellipsis">
//                   {property.area}, {property.city}
//                 </span>
//               </div>

//               <div className={s.specsGrid}>
//                 {property.propertyType?.toLowerCase() === "commercial" ? (
//                   <>
//                     <div className={s.specItem}>
//                       <div className={s.specIcon}>
//                         <HiOutlineHome size={20} />
//                       </div>
//                       <div className={s.specValue}>{property.status}</div>
//                       <div className={s.specLabel}>Type</div>
//                     </div>
//                     <div className={`${s.specItem} ${s.specDivider}`}>
//                       <div className={s.specIcon}>
//                         <HiArrowsExpand size={20} />
//                       </div>
//                       <div className={s.specValue}>{property.areaSize}</div>
//                       <div className={s.specLabel}>Sq Ft</div>
//                     </div>
//                     <div className={s.specItem}>
//                       <div className={s.specIcon}>
//                         <HiShieldCheck size={20} />
//                       </div>
//                       <div className={s.specValue}>OK</div>
//                       <div className={s.specLabel}>Legal</div>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className={s.specItem}>
//                       <div className={s.specIcon}>
//                         <HiOutlineHome size={20} />
//                       </div>
//                       <div className={s.specValue}>{property.bhk}</div>
//                       <div className={s.specLabel}>Beds</div>
//                     </div>
//                     <div className={`${s.specItem} ${s.specDivider}`}>
//                       <div className={s.specIcon}>
//                         <HiOutlineUserGroup size={20} />
//                       </div>
//                       <div className={s.specValue}>
//                         {property.bathrooms ||
//                           Math.max(1, parseInt(property.bhk) - 1 || 0)}
//                       </div>
//                       <div className={s.specLabel}>Baths</div>
//                     </div>
//                     <div className={s.specItem}>
//                       <div className={s.specIcon}>
//                         <HiArrowsExpand size={20} />
//                       </div>
//                       <div className={s.specValue}>{property.areaSize}</div>
//                       <div className={s.specLabel}>Sq Ft</div>
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* view detail action */}
//               {!renderActions && (
//                 <div className={s.viewDetailsButton}>
//                   <button className={s.viewDetailsBtn}>View Details</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </Link>

//         {renderActions && (
//           <div
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//             }} 
//             onMouseDown={(e)=> e.stopPropagation()} 
//             className={s.actionsContainer}
//           >{renderActions(property)}</div>
//         )}
//       </div>
//     </>
//   );
// };

// export default PropertyCard;


import React from "react";
import { propertyCardStyles as s } from "../../assets/dummyStyles";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import {
  HiArrowsExpand,
  HiEye,
  HiHeart,
  HiLocationMarker,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineUserGroup,
  HiShieldCheck,
} from "react-icons/hi";

const PropertyCard = ({
  property,
  renderActions,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!property) return null;

  const navigate = useNavigate();
  const { user } = useAuth();

  // ==========================================
  // WISHLIST
  // ==========================================

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    if (onToggleWishlist) {
      onToggleWishlist(property._id);
    }
  };

  // ==========================================
  // PRICE
  // ==========================================

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(property.price || 0));

  // ==========================================
  // STATUS
  // ==========================================

  const isSold = property.status?.toLowerCase() === "sold";

  const statusBadgeClass = s.badgeStatus
    ? s.badgeStatus(property.status)
    : "";

  // ==========================================
  // PROPERTY TYPE
  // ==========================================

  const propertyType =
    property.propertyType || "Flat";

  const isCommercial =
    propertyType.toLowerCase() === "commercial";

  // ==========================================
  // IMAGE
  // ==========================================

  const propertyImage =
    Array.isArray(property.images) &&
    property.images.length > 0
      ? property.images[0]
      : "/placeholder-property.jpg";

  // ==========================================
  // BATHROOMS
  // ==========================================

  const bathrooms =
    property.bathrooms ||
    Math.max(
      1,
      parseInt(property.bhk) - 1 || 0
    );

  return (
    <div className={s.card}>
      {/* ========================================
          PROPERTY LINK
      ======================================== */}

      <Link
        to={`/properties/${property._id}`}
        className={s.link}
      >
        {/* ======================================
            IMAGE SECTION
        ====================================== */}

        <div className={s.imageSection}>
          <img
            src={propertyImage}
            alt={property.title || "Property"}
            className={s.image}
            onError={(e) => {
              e.currentTarget.src =
                "/placeholder-property.jpg";
            }}
          />

          {/* ====================================
              TOP BADGES
          ==================================== */}

          <div className={s.topBadges}>
            <div className={s.badgesLeft}>
              {/* STATUS */}

              {renderActions ? (
                <span className={statusBadgeClass}>
                  {isSold
                    ? "SOLD"
                    : "AVAILABLE"}
                </span>
              ) : (
                <span className={s.badgeNew}>
                  New
                </span>
              )}

              {/* VERIFIED */}

              <span className={s.badgeVerified}>
                <HiShieldCheck size={14} />
                Verified
              </span>
            </div>

            {/* ==================================
                WISHLIST
            ================================== */}

            {(!user || user.role === "buyer") && (
              <button
                type="button"
                className={s.wishlistButton(
                  isWishlisted
                )}
                onClick={handleWishlistClick}
              >
                {isWishlisted ? (
                  <HiHeart size={20} />
                ) : (
                  <HiOutlineHeart size={20} />
                )}
              </button>
            )}
          </div>

          {/* ====================================
              PRICE OVERLAY
          ==================================== */}

          <div className={s.priceOverlay}>
            <h3 className={s.price}>
              {formattedPrice}
            </h3>
          </div>
        </div>

        {/* ======================================
            CONTENT SECTION
        ====================================== */}

        <div className={s.content}>
          {/* TYPE + VIEWS */}

          <div className="flex justify-between items-center">
            <span className={s.propertyType}>
              {propertyType}
            </span>

            <div className={s.views}>
              <HiEye size={18} />

              <span>
                {property.views || 0}
              </span>
            </div>
          </div>

          {/* TITLE */}

          <h4 className={s.title}>
            {property.title ||
              "Luxury Property"}
          </h4>

          {/* LOCATION */}

          <div className={s.location}>
            <HiLocationMarker
              className={s.locationIcon}
            />

            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              {property.area || "New"},{" "}
              {property.city || "Noida"}
            </span>
          </div>

          {/* ====================================
              PROPERTY SPECIFICATIONS
          ==================================== */}

          <div className={s.specsGrid}>
            {isCommercial ? (
              <>
                {/* COMMERCIAL TYPE */}

                <div className={s.specItem}>
                  <div className={s.specIcon}>
                    <HiOutlineHome size={20} />
                  </div>

                  <div className={s.specValue}>
                    {property.status || "Sale"}
                  </div>

                  <div className={s.specLabel}>
                    Type
                  </div>
                </div>

                {/* AREA */}

                <div
                  className={`${s.specItem} ${s.specDivider}`}
                >
                  <div className={s.specIcon}>
                    <HiArrowsExpand size={20} />
                  </div>

                  <div className={s.specValue}>
                    {property.areaSize || 0}
                  </div>

                  <div className={s.specLabel}>
                    Sq Ft
                  </div>
                </div>

                {/* LEGAL */}

                <div className={s.specItem}>
                  <div className={s.specIcon}>
                    <HiShieldCheck size={20} />
                  </div>

                  <div className={s.specValue}>
                    OK
                  </div>

                  <div className={s.specLabel}>
                    Legal
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* ==================================
                    BEDROOMS
                ================================== */}

                <div className={s.specItem}>
                  <div className={s.specIcon}>
                    <HiOutlineHome size={20} />
                  </div>

                  <div className={s.specValue}>
                    {property.bhk || 0}
                  </div>

                  <div className={s.specLabel}>
                    Beds
                  </div>
                </div>

                {/* ==================================
                    BATHROOMS
                ================================== */}

                <div
                  className={`${s.specItem} ${s.specDivider}`}
                >
                  <div className={s.specIcon}>
                    <HiOutlineUserGroup
                      size={20}
                    />
                  </div>

                  <div className={s.specValue}>
                    {bathrooms}
                  </div>

                  <div className={s.specLabel}>
                    Baths
                  </div>
                </div>

                {/* ==================================
                    AREA
                ================================== */}

                <div className={s.specItem}>
                  <div className={s.specIcon}>
                    <HiArrowsExpand size={20} />
                  </div>

                  <div className={s.specValue}>
                    {property.areaSize || 0}
                  </div>

                  <div className={s.specLabel}>
                    Sq Ft
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ======================================
              BUYER VIEW DETAILS
          ====================================== */}

          {!renderActions && (
            <div className={s.viewDetailsButton}>
              <button
                type="button"
                className={s.viewDetailsBtn}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  navigate(`/properties/${property._id}`
                  );
                }}
              >
                View Details
              </button>
            </div>
          )}
        </div>
      </Link>

      {/* ==========================================
          SELLER ACTIONS
      ========================================== */}

      {renderActions && (
        <div
          className={s.actionsContainer}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onMouseDown={(e) =>
            e.stopPropagation()
          }
        >
          {renderActions(property)}
        </div>
      )}
    </div>
  );
};

export default PropertyCard;