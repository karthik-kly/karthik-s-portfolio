import { useState } from "react";
import "./Contact.css";

const INIT = { name: "", email: "", subject: "", message: "" };

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Contact() {
  const [form, setForm] = useState(INIT);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    setMsg("");

    try {
      // POST to Express → saved in MongoDB
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMsg("✅ Message sent! Karthik will get back to you soon.");
        setForm(INIT);
        setErrors({});
      } else {
        setStatus("error");
        setMsg("❌ " + (data.error || "Something went wrong."));
      }
    } catch {
      setStatus("error");
      setMsg(
        "❌ Cannot reach server. Make sure backend is running on port 5000.",
      );
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <span className="label reveal">04 — Contact</span>
        <h2 className="title reveal d1">
          Let's Work
          <br />
          <em>Together.</em>
        </h2>

        <div className="contact-grid">
          {/* LEFT — info */}
          <div className="contact-info reveal-left">
            <p className="contact-sub">
              Open to internships, fresher roles &amp; collaborations.
              <br />
              Fill the form 
            </p>

            <div className="info-cards">
              <a href="mailto:vkkarthik2005@gmail.com" className="ic-card">
                <div className="ic-icon">✉️</div>
                <div className="ic-text">
                  <span>Email</span>
                  <strong>vkkarthik2005@gmail.com</strong>
                </div>
              </a>
              <a href="tel:+918838860647" className="ic-card">
                <div className="ic-icon">📞</div>
                <div className="ic-text">
                  <span>Phone</span>
                  <strong>+91 88388 60647</strong>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/karthi-v-11-front-end-deveper/"
                target="_blank"
                rel="noopener noreferrer"
                className="ic-card"
              >
                <div className="ic-icon">
                  <LinkedInIcon />
                </div>
                <div className="ic-text">
                  <span>LinkedIn</span>
                  <strong>karthi-v-11-front-end-deveper</strong>
                </div>
              </a>
            </div>

            <div className="api-badge">
              <span className="api-dot" />
              Node.js + Express + MongoDB
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="contact-form-wrap reveal-right">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className={`form-group ${errors.name ? "has-error" : ""}`}>
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Karthik V"
                    value={form.name}
                    onChange={handleChange}
                    disabled={status === "loading"}
                  />
                  {errors.name && (
                    <span className="field-error">{errors.name}</span>
                  )}
                </div>
                <div
                  className={`form-group ${errors.email ? "has-error" : ""}`}
                >
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={handleChange}
                    disabled={status === "loading"}
                  />
                  {errors.email && (
                    <span className="field-error">{errors.email}</span>
                  )}
                </div>
              </div>

              <div
                className={`form-group ${errors.subject ? "has-error" : ""}`}
              >
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Internship Opportunity"
                  value={form.subject}
                  onChange={handleChange}
                  disabled={status === "loading"}
                />
                {errors.subject && (
                  <span className="field-error">{errors.subject}</span>
                )}
              </div>

              <div
                className={`form-group ${errors.message ? "has-error" : ""}`}
              >
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Hi Karthik, I'd like to discuss..."
                  value={form.message}
                  onChange={handleChange}
                  disabled={status === "loading"}
                />
                {errors.message && (
                  <span className="field-error">{errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                className={`submit-btn ${status === "loading" ? "loading" : ""}`}
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <span className="spinner" /> Sending...
                  </>
                ) : (
                  "Send Message →"
                )}
              </button>

              {msg && (
                <div
                  className={`form-feedback ${status === "success" ? "success" : "error"}`}
                >
                  {msg}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
