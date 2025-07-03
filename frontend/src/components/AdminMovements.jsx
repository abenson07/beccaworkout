import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const movementFields = [
  "movement_name",
  "type",
  "machine_name",
  "description",
  "image_url",
  "video_url",
  "gif_url"
];

export default function AdminMovements() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slideoutOpen, setSlideoutOpen] = useState(false);
  const [activeView, setActiveView] = useState("movements");
  // Add Movement form state
  const [form, setForm] = useState({
    type: "",
    machine_name: "",
    movement_name: "",
    description: "",
    image_url: "",
    video_url: "",
    gif_url: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchMovements();
  }, []);

  async function fetchMovements() {
    setLoading(true);
    const { data, error } = await supabase.from("movements").select();
    if (!error) setMovements(data);
    setLoading(false);
  }

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: undefined });
  }

  async function handleAddMovement(e) {
    e.preventDefault();
    // Validate movement_name
    const errors = {};
    if (!form.movement_name.trim()) {
      errors.movement_name = "Movement name is required.";
    }
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    const { data, error } = await supabase.from("movements").insert([form]);
    if (error) {
      setSubmitError(error.message);
      setSubmitting(false);
      return;
    }
    setSlideoutOpen(false);
    setForm({ type: "", machine_name: "", movement_name: "", description: "", image_url: "", video_url: "", gif_url: "" });
    setSubmitting(false);
    fetchMovements();
    // Show toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f8fa" }}>
      {/* Toast Notification */}
      <div
        style={{
          position: "fixed",
          top: showToast ? 32 : -60,
          left: 0,
          right: 0,
          margin: "0 auto",
          width: 320,
          zIndex: 200,
          transition: "top 0.5s cubic-bezier(.4,2,.6,1)",
          display: "flex",
          justifyContent: "center"
        }}
      >
        {showToast && (
          <div
            style={{
              background: "#2563eb",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: 8,
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
              fontWeight: 600,
              fontSize: 16,
              textAlign: "center"
            }}
          >
            Movement Added
          </div>
        )}
      </div>
      {/* Sidebar */}
      <aside style={{ width: 220, background: "#fff", borderRight: "1px solid #eee", padding: 24 }}>
        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <button
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  border: "none",
                  background: activeView === "movements" ? "#e0e7ff" : "none",
                  color: activeView === "movements" ? "#2563eb" : "#222",
                  borderRadius: 6,
                  fontWeight: 600,
                  cursor: "pointer",
                  marginBottom: 4
                }}
                onClick={() => setActiveView("movements")}
                aria-current={activeView === "movements" ? "page" : undefined}
              >
                Movements
              </button>
            </li>
            {/* Future nav items here */}
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main style={{ flex: 1, padding: 32 }}>
        {activeView === "movements" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2>Movements</h2>
              <button onClick={() => setSlideoutOpen(true)} style={{ padding: "8px 16px", borderRadius: 4, background: "#2563eb", color: "#fff", border: "none" }}>Add Movement</button>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: 24 }}>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {movementFields.map((field) => (
                        <th key={field} style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee", fontWeight: 600 }}>{field.replace(/_/g, " ")}</th>
                      ))}
                      <th>id</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movements.map((m) => (
                      <tr key={m.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                        {movementFields.map((field) => (
                          <td key={field} style={{ padding: 8, fontSize: 14 }}>{m[field]}</td>
                        ))}
                        <td style={{ padding: 8, fontSize: 14 }}>{m.id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </main>
      {/* Slideout Panel */}
      {slideoutOpen && (
        <div style={{ position: "fixed", top: 0, right: 0, width: 400, height: "100vh", background: "#fff", boxShadow: "-2px 0 8px rgba(0,0,0,0.08)", zIndex: 100, padding: 32, transition: "transform 0.3s", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h3>Add Movement</h3>
            <button onClick={() => setSlideoutOpen(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>&times;</button>
          </div>
          <form onSubmit={handleAddMovement} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {movementFields.map((field) => (
              <label key={field} style={{ marginBottom: 12 }}>
                {field.replace(/_/g, " ")}
                <input
                  name={field}
                  value={form[field]}
                  onChange={handleFormChange}
                  style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 4, border: "1px solid #ddd" }}
                />
                {formErrors[field] && (
                  <span style={{ color: "red", fontSize: 13, marginLeft: 8 }}>{formErrors[field]}</span>
                )}
              </label>
            ))}
            {submitError && <div style={{ color: "red", marginBottom: 8 }}>{submitError}</div>}
            <button type="submit" disabled={submitting} style={{ marginTop: 16, padding: "10px 0", background: "#2563eb", color: "#fff", border: "none", borderRadius: 4, fontWeight: 600 }}>
              {submitting ? "Adding..." : "Add Movement"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
} 