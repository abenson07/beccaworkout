import React, { useState } from "react";
import useMovements from "../useMovements";

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
  const { movements, loading, error } = useMovements();
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
  const [editId, setEditId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);
  const [lastDeleted, setLastDeleted] = useState(null);
  const [movementsState, setMovements] = useState([]); // for optimistic updates

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: undefined });
  }

  function openAddSlideout() {
    setForm({ type: "", machine_name: "", movement_name: "", description: "", image_url: "", video_url: "", gif_url: "" });
    setEditId(null);
    setSlideoutOpen(true);
  }

  function openEditSlideout(movement) {
    setForm({
      type: movement.type || "",
      machine_name: movement.machine_name || "",
      movement_name: movement.movement_name || "",
      description: movement.description || "",
      image_url: movement.image_url || "",
      video_url: movement.video_url || "",
      gif_url: movement.gif_url || ""
    });
    setEditId(movement.id);
    setSlideoutOpen(true);
  }

  function openDeleteModal(movement) {
    setDeleteTarget(movement);
    setShowDeleteModal(true);
  }

  function closeDeleteModal() {
    setDeleteTarget(null);
    setShowDeleteModal(false);
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
    try {
      let response, data;
      if (editId) {
        // Edit mode
        response = await fetch(`/api/movements/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to update movement");
        setToastMessage("Movement Updated");
      } else {
        response = await fetch("/api/movements", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to add movement");
        setToastMessage("Movement Added");
      }
      setSlideoutOpen(false);
      setEditId(null);
      setForm({ type: "", machine_name: "", movement_name: "", description: "", image_url: "", video_url: "", gif_url: "" });
      setSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      // Optionally, refresh movements list here
      // fetchMovements();
    } catch (err) {
      setSubmitError(err.message);
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setShowDeleteModal(false);
    setToastMessage("Movement Deleted – Undo?");
    setShowToast(true);
    setLastDeleted(deleteTarget);
    try {
      const response = await fetch(`/api/movements/${deleteTarget.id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete movement");
      }
      // Optionally, refresh movements list here
      // fetchMovements();
    } catch (err) {
      setToastMessage(err.message);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }

  async function handleUndoDelete() {
    if (!lastDeleted) return;
    try {
      const response = await fetch("/api/movements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lastDeleted)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to restore movement");
      setToastMessage("Movement Restored");
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setToastMessage(err.message);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
    setLastDeleted(null);
    if (undoTimeout) clearTimeout(undoTimeout);
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
              textAlign: "center",
              display: 'flex',
              alignItems: 'center',
              gap: 16
            }}
          >
            {toastMessage}
            {toastMessage && toastMessage.includes('Undo') && lastDeleted && (
              <button
                onClick={handleUndoDelete}
                style={{ marginLeft: 12, background: '#fff', color: '#2563eb', border: 'none', borderRadius: 4, padding: '6px 16px', fontWeight: 600, cursor: 'pointer' }}
              >
                Undo
              </button>
            )}
          </div>
        )}
      </div>
      {/* Main Content */}
      <main style={{ flex: 1, padding: 32 }}>
        {activeView === "movements" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2>Movements</h2>
              <button onClick={openAddSlideout} style={{ padding: "8px 16px", borderRadius: 4, background: "#2563eb", color: "#fff", border: "none" }}>Add Movement</button>
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
                        <td style={{ padding: 8, fontSize: 14 }}>
                          {m.id}
                          <button
                            style={{ marginLeft: 8, background: "none", border: "none", cursor: "pointer", fontSize: 16 }}
                            title="Edit"
                            onClick={() => openEditSlideout(m)}
                          >
                            ✏️
                          </button>
                          <button
                            style={{ marginLeft: 8, background: "none", border: "none", cursor: "pointer", fontSize: 16, color: '#e11d48' }}
                            title="Delete"
                            onClick={() => openDeleteModal(m)}
                          >
                            🗑️
                          </button>
                        </td>
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
              {submitting ? (editId ? "Saving..." : "Adding...") : (editId ? "Save Changes" : "Add Movement")}
            </button>
          </form>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.18)',
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ background: '#fff', borderRadius: 10, padding: 32, minWidth: 320, boxShadow: '0 2px 16px rgba(0,0,0,0.10)' }}>
            <h3 style={{ marginTop: 0 }}>Delete Movement</h3>
            <div style={{ marginBottom: 24 }}>Are you sure you want to delete this movement?</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button onClick={closeDeleteModal} style={{ background: '#f3f4f6', color: '#222', border: 'none', borderRadius: 4, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleDelete} style={{ background: '#e11d48', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 