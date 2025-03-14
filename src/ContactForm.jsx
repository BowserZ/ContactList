import React from "react";
import Button from "./Button";

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
  // Function to validate input length
  const validateInput = (value, fieldName, maxLength) => {
    if (value.length > maxLength) {
      alert(`${fieldName} cannot exceed ${maxLength} characters.`);
      return false;
    }
    return true;
  };

  // Function to handle save with validation
  const handleSaveWithValidation = () => {
    if (
      !validateInput(contactName, "Name", 30) ||
      !validateInput(contactPhone, "Phone", 40) ||
      !validateInput(contactEmail, "Email", 40) ||
      !validateInput(contactAddress, "Address", 40)
    ) {
      return; // Stop the process if any validation fails
    }
    onSave(); // Call the onSave function if everything is valid
  };

  return (
    <div className="edit-form-overlay">
      <div className="edit-form">
        <h3>{title}</h3>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="Contact Name"
            maxLength={30}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder="Phone Number"
            maxLength={40}
          />
        </div>
        <div>
          <label>E-mail:</label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="E-mail"
            maxLength={40}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={contactAddress}
            onChange={(e) => setContactAddress(e.target.value)}
            placeholder="Address"
            maxLength={40}
          />
        </div>
        <div className="form-buttons">
          <Button
            label={saveButtonLabel}
            onClick={handleSaveWithValidation}
            className="btn-success"
          />
          <Button
            label={cancelButtonLabel}
            onClick={onCancel}
            className="btn-secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
