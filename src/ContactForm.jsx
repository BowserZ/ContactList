import React from "react";
import Button from "./Button";

// Create And Edit Contacts
const ContactForm = ({
  title,
  contactName,
  setContactName,
  contactPhone,
  setContactPhone,
  contactEmail,
  setContactEmail,
  contactAddress,
  setContactAddress,
  onSave,
  onCancel,
  saveButtonLabel = "Save",
  cancelButtonLabel = "Cancel",
}) => {
  return (
    <div className="edit-form-overlay">
      <div className="edit-form">
        <h3>{title}</h3> {/* Título del formulario */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)} // Update name
            placeholder="Contact Name"
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)} // Update phone #
            placeholder="Phone Number"
          />
        </div>
        <div>
          <label>E-mail:</label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)} // Update e-mail
            placeholder="E-mail"
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={contactAddress}
            onChange={(e) => setContactAddress(e.target.value)} // Update Address
            placeholder="Address"
          />
        </div>
        <div className="form-buttons">
          <Button
            label={saveButtonLabel}
            onClick={onSave} // Save Changes
            className="btn-success"
          />
          <Button
            label={cancelButtonLabel}
            onClick={onCancel} // Cancel and close form
            className="btn-secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
