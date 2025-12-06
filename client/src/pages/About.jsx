import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import aboutImage from "../assets/images/download.jfif";

const About = () => {
  return (
    <div>
      <Navbar />

      {/* HERO – Minimal Premium Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #5e1212, #a94444)",
          padding: "130px 20px 150px",
          color: "#fff",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Circles */}
        <div
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            top: "-40px",
            left: "-40px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "50%",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            width: "280px",
            height: "280px",
            bottom: "-60px",
            right: "-80px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "50%",
          }}
        ></div>

        <h1 className="fw-bold display-4">About Artisan Shop</h1>
        <p
          className="lead mt-3"
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.7",
            color: "#fbeaea",
            fontSize: "1.25rem",
          }}
        >
          Celebrating the beauty of handmade craft, culture, and creativity.
        </p>
      </section>

      {/* CIRCLE IMAGE + STORY */}
      <section style={{ padding: "80px 20px" }}>
        <div className="container text-center">
          <img
            src={aboutImage}
            alt="Artisan"
            style={{
              width: "230px",
              height: "230px",
              objectFit: "cover",
              borderRadius: "50%",
              border: "8px solid #fff",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              marginBottom: "30px",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.07)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          />

          <h2 className="fw-bold mb-3" style={{ color: "#6F1D1D" }}>
            Our Story
          </h2>

          <p
            style={{
              maxWidth: "750px",
              margin: "0 auto",
              color: "#555",
              fontSize: "1.1rem",
              lineHeight: "1.8",
            }}
          >
            Artisan Shop was born with a vision to support local craftsmanship
            and preserve traditional art. Every item we feature carries a piece
            of culture, heritage, and the heartfelt dedication of skilled
            artisans.
          </p>
        </div>
      </section>

      {/* GLASS MISSION CARD */}
      <section
        style={{
          padding: "80px 20px",
          background: "#f9e4e4",
        }}
      >
        <div className="container">
          <div
            className="shadow-lg p-5 mx-auto"
            style={{
              maxWidth: "900px",
              background: "rgba(255, 255, 255, 0.7)",
              borderRadius: "22px",
              backdropFilter: "blur(8px)",
            }}
          >
            <h2
              className="fw-bold text-center mb-4"
              style={{ color: "#721f1f" }}
            >
              Our Mission
            </h2>

            <p
              style={{
                textAlign: "center",
                lineHeight: "1.7",
                fontSize: "1.15rem",
                color: "#444",
              }}
            >
              We aim to bring handmade excellence to the modern world.
              By supporting artisans globally, we help preserve unique art forms
              and create sustainable opportunities for traditional craftsmen.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES SECTION – Modern Cards */}
      <section className="container py-5">
        <h2
          className="fw-bold text-center mb-5"
          style={{ color: "#6F1D1D", fontSize: "2rem" }}
        >
          What We Stand For
        </h2>

        <div className="row g-4">
          {[
            {
              title: "Authenticity",
              text: "Every product stays true to its origin and tradition.",
            },
            {
              title: "Sustainability",
              text: "We value eco-friendly practices and conscious crafting.",
            },
            {
              title: "Artisan Empowerment",
              text: "Your purchase directly supports local artisans.",
            },
          ].map((card, i) => (
            <div className="col-md-4" key={i}>
              <div
                className="p-4 shadow-sm rounded-4 h-100 text-center"
                style={{
                  background: "#fff",
                  transition: "0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-12px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <h5
                  className="fw-bold mb-3"
                  style={{ color: "#7c2222", fontSize: "1.2rem" }}
                >
                  {card.title}
                </h5>
                <p
                  style={{
                    color: "#666",
                    lineHeight: "1.6",
                  }}
                >
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
