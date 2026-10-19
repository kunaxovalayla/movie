import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Contact.module.css";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqList = [
    { q: "On how many devices can i watch at the same time?", a: "You can watch up to 3 devices simultaneously depending on your plan." },
    { q: "First launch of Vodi", a: "Simply sign up with your email and start exploring our movie collection." },
    { q: "What is a Vodi?", a: "Vodi is your ultimate streaming platform for movies, series, and blogs." },
    { q: "Failure to login Vodi on Mobile", a: "Please check your internet connection or reset your password." },
    { q: "Access to Vodi + packages in European Union Countries", a: "Yes, our packages are accessible across all EU countries seamlessly." },
  ];

  return (
    <>
      <Header />

      <div className={styles.contactPage}>
       
        <div className={styles.topHeader}>
          <h1>Contact</h1>
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            <span>›</span>
            <span className={styles.current}>Contact</span>
          </div>
        </div>

       
        <div className={styles.container}>
          <div className={styles.gridWrapper}>
            
        
            <div className={styles.formSection}>
              <h2>Write to us E-mail message</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    placeholder="Your E-mail"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <textarea
                    placeholder="Your Message"
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button type="submit" className={styles.submitBtn}>SEND MESSAGE</button>
              </form>
            </div>

          
            <div className={styles.infoSection}>
              <div className={styles.faqBox}>
                <h2>Frequently Asked Questions</h2>
                <div className={styles.faqList}>
                  {faqList.map((item, index) => (
                    <div key={index} className={styles.faqItem}>
                      <button onClick={() => toggleFaq(index)} className={styles.faqQuestion}>
                        + {item.q}
                      </button>
                      {openFaq === index && <p className={styles.faqAnswer}>{item.a}</p>}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.officeWorkingRow}>
                <div className={styles.officeBox}>
                  <h3>Our Office</h3>
                  <p>Brooklyn, New York</p>
                  <p>849 Diamond Str, 112th Floor</p>
                  <p>NY 10012 New York, United Stated America</p>
                </div>
                <div className={styles.workingBox}>
                  <h3>Working Hours</h3>
                  <p>Mon-Sat: 8:00 - 17:00</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

          </div>
        </div>

       
        <div className={styles.mapSection}>
          <iframe
            title="Office Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596073366!2d-74.25986548483879!3d40.69767006788206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2saz!4v1628000000000!5m2!1sen!2saz"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

       
        <div className={styles.globalSlogan}>
          <h2>We Are Always Thinking Global</h2>
        </div>
      </div>

      <Footer />
    </>
  );
};