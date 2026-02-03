// ...existing code...
import React from "react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: "trainer",
    name: "Personal Trainer",
    price: 45,
    duration: "per session (60 min)",
    description:
      "One-on-one tailored workouts, technique coaching, personalized plans and progress tracking to meet your fitness goals.",
  },
  {
    id: "spa",
    name: "Spa & Recovery",
    price: 30,
    duration: "per session (45 min)",
    description:
      "Post-workout recovery and relaxation treatments including massage therapy, hot towel service, and guided stretch routines.",
  },
  {
    id: "cardio",
    name: "Cardio Classes",
    price: 15,
    duration: "per class (45 min)",
    description:
      "High-energy group cardio sessions (HIIT, spin, aerobics) suitable for all levels — burn calories and improve endurance.",
  },
  {
    id: "nutrition",
    name: "Nutrition Consult",
    price: 60,
    duration: "per consultation (60 min)",
    description:
      "Diet analysis and personalized meal planning to support training, weight goals, and overall health.",
  },
];

const styles = {
  page: { padding: 24, fontFamily: "Arial, sans-serif", display: "flex", flexDirection: "column", alignItems: "center" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 16,
    marginTop: 16,
  },
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: 8,
    padding: 16,
    boxShadow: "0 4px 6px rgba(0,0,0,0.04)",
    background: "#fff",
  },
  titleRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline" },
  price: { fontWeight: 700, color: "#1a73e8" },
  desc: { marginTop: 8, marginBottom: 12, color: "#444" },
  meta: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 },
  button: {
    background: "#1a73e8",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default function Services() {

  const navigate = useNavigate();

  const sendDetails = (s) => {
    navigate('/payment', {
      state: {
        amount: s.price,
        service: s.name
      }
    });
  }

  return (
    <div style={styles.page} className="bg-gray-200 w-full min-h-screen p-8">
      <h1 className="text-3xl font-serif">Services</h1>
      <p className="text-gray-900 font-serif mb-5">Select from our available services, see descriptions and prices.</p>

      <div style={styles.grid}>
        {services.map((s) => (
          <article key={s.id} style={styles.card}>
            <div style={styles.titleRow}>
              <h3 style={{ margin: 0, fontFamily: "serif", fontWeight: "bold" }}>{s.name}</h3>
              <span style={styles.price}>${s.price}</span>
            </div>

            <div style={styles.desc}>
              <small>{s.duration}</small>
              <p style={{ marginTop: 8 }}>{s.description}</p>
            </div>

            <div style={styles.meta}>
              <span style={{ color: "#555", fontSize: 14, fontWeight: "bold" }}>{s.id.toUpperCase()}</span>
              <button
                style={styles.button}
                onClick={() => {
                  sendDetails(s)
                }}
              >
                Book
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
// ...existing code...