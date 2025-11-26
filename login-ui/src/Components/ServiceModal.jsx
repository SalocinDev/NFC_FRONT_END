import React from "react";

function ServiceModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    zIndex: 1000,
  };

  const contentStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default ServiceModal;
