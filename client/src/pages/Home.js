import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f6f8fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
        padding: "0",
      }}
    >
      <header
        style={{
          width: "100%",
          background: "linear-gradient(90deg, #e3f0ff 0%, #f5faff 100%)",
          paddingTop: "68px",
          paddingBottom: "38px",
          boxShadow: "0 2px 16px rgba(44,62,80,0.06)",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "2.8rem",
              fontWeight: "900",
              color: "#243046",
              marginBottom: "18px",
              letterSpacing: "-1px",
              lineHeight: "1.11",
            }}
          >
            Dynamic Forms Generator
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#4a5a6a",
              marginBottom: "22px",
              lineHeight: "1.7",
              fontWeight: "500",
              maxWidth: "660px",
              margin: "0 auto 22px auto",
            }}
          >
            Effortlessly create, manage, and render forms from JSON for your application.<br />
            Built for flexibility and speed.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
            <Link
              to="/forms"
              style={{
                background: "linear-gradient(90deg, #6c63ff 0%, #00bcd4 100%)",
                color: "#fff",
                fontWeight: "700",
                borderRadius: "8px",
                padding: "14px 34px",
                fontSize: "1.08rem",
                boxShadow: "0 2px 16px 0 rgba(108,99,255,0.07)",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "background 0.3s, box-shadow 0.2s",
              }}
              onMouseEnter={e => (e.target.style.background = "linear-gradient(90deg,#00bcd4,#6c63ff)")}
              onMouseLeave={e => (e.target.style.background = "linear-gradient(90deg,#6c63ff,#00bcd4)")}
            >
              Explore Forms
            </Link>
          </div>
        </div>
      </header>

      <section
        style={{
          maxWidth: "900px",
          margin: "36px auto 0 auto",
          background: "#fff",
          borderRadius: "18px",
          boxShadow: "0 6px 32px 0 rgba(44,62,80,0.08)",
          padding: "38px 30px 32px 30px",
          textAlign: "left",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "800",
            color: "#3d4255",
            marginBottom: "16px",
            letterSpacing: "-0.5px",
          }}
        >
          About This Project
        </h2>
        <p
          style={{
            fontSize: "1.12rem",
            color: "#495a6a",
            marginBottom: "16px",
            lineHeight: "1.7",
          }}
        >
          <strong>Dynamic Forms Generator</strong> is a modern solution for building forms from JSON definitions, making it easy to create and manage complex workflows for any application.
        </p>
        <ul
          style={{
            marginLeft: "22px",
            color: "#43536b",
            fontSize: "1.05rem",
            marginBottom: "23px",
            lineHeight: "1.65",
          }}
        >
          <li>✨ <strong>JSON-powered:</strong> Define your forms in simple JSON files and watch them come alive.</li>
          <li>⚡ <strong>Built with MERN stack:</strong> Uses MongoDB, Express.js, React, and Node.js for full-stack functionality.</li>
          <li>🛠️ <strong>Easy customization:</strong> Style and validate forms to fit your needs, with minimal code.</li>
          <li>🔒 <strong>Secure & reliable:</strong> Handle submissions and validation securely on the server.</li>
        </ul>
        <div style={{ marginTop: "18px", fontSize: "1rem", color: "#6c63ff", fontWeight: "600" }}>
          <span>Built with MERN stack</span>
        </div>
        <div style={{ marginTop: "9px" }}>
          <a
            href="https://github.com/Him-Kishan-Das"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#00bcd4",
              background: "#e3f7fa",
              borderRadius: "50%",
              padding: "9px",
              marginRight: "8px",
              display: "inline-block",
              transition: "background 0.3s",
            }}
            onMouseEnter={e => (e.target.style.background = "#6c63ff")}
            onMouseLeave={e => (e.target.style.background = "#e3f7fa")}
            aria-label="GitHub"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.418 2.865 8.167 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.092.39-1.987 1.029-2.686-.103-.254-.446-1.274.098-2.656 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.852.004 1.71.115 2.512.338 1.909-1.296 2.748-1.025 2.748-1.025.546 1.382.202 2.402.099 2.656.64.699 1.028 1.594 1.028 2.686 0 3.847-2.338 4.695-4.566 4.944.359.309.679.919.679 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.579.688.481A10.027 10.027 0 0022 12.017C22 6.484 17.523 2 12 2z" />
            </svg>
          </a>
          <span style={{ color: "#4a5a6a", fontSize: "0.98rem", fontWeight: "500" }}>
            <a
              href="https://github.com/Him-Kishan-Das"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#00bcd4", textDecoration: "underline", marginLeft: "2px" }}
            >
              View on GitHub
            </a>
          </span>
        </div>
      </section>
    </main>
  );
};

export default Home;