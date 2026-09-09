import React, { useEffect, useState } from "react";
import { adminContactsStyles as s } from "../../assets/dummyStyles";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import API_URL from "../../config";
import { HiOutlineClock, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setloading] = useState(true);
  const { token } = useAuth();

  // fetch the contacts
  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setContacts(res.data.contacts);
      }
      setloading(false);
    } catch (error) {
      console.error("Failed to load contacts:", error);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [token]);

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
        <h1 className={s.heading}>Contact Requests</h1>
        <p className={s.subheading}>
          Read and message inquiries from platform users.
        </p>
      </div>

      <div className={s.card}>
        <div className={s.cardHeader}>
          <h2 className={s.cardTitle}>Inbox ({contacts.length})</h2>
        </div>

        {contacts.length === 0 ? (
          <div className={s.emptyState}>
            <HiOutlineMail size={48} className={s.emptyIcon} />
            <p>No Contact messages yet. Inbox is clear.</p>
          </div>
        ) : (
          <div className={s.contactList}>
            {contacts.map((con, i) => (
              <div key={con._id} className={s.contactItem(i, contacts.length)}>
                <div className={s.contactHeader}>
                  <div className="flex gap-5">
                    <div className={s.avatarWrapper(con.role)}>
                      {con.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <div className={s.nameBadgeContainer}>
                        <h3 className={s.name}>{con.name}</h3>
                        <span className={s.roleBadge(con.role)}>
                          {con.role}
                        </span>
                      </div>

                      <div className={s.contactDetails}>
                        <div className={s.detailItem}>
                          <HiOutlineMail size={16} /> {con.email}
                        </div>
                        {con.phone && (
                          <div className={s.detailItem}>
                            <HiOutlinePhone size={16} /> {con.phone}
                          </div>
                        )}

                        <div className={s.detailItem}>
                          <HiOutlineClock size={16} />{" "}
                          {new Date(con.createdAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={s.messageBox}>{con.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminContact;
