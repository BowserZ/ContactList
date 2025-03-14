import React from 'react';
import Button from './Button';

const AgendaControls = ({
  selectedContact,
  handleSelectContact,
  handleGetAgenda,
  newAgendaName,
  setNewAgendaName,
  handleCreateAgenda,
  contacts,
}) => {
  // Function to validate the length of the agenda name
  const validateAgendaName = () => {
    if (newAgendaName.length > 20) {
      alert("The agenda name cannot exceed 20 characters.");
      return false;
    }
    return true;
  };

  // Function to handle agenda creation
  const handleCreateAgendaWithValidation = () => {
    if (!validateAgendaName()) {
      return; // Stop the process if validation fails
    }
    handleCreateAgenda(); // Call the handleCreateAgenda function
  };

  return (
    <div className="centered-container">
      <label>
        <select
          className="selector"
          onChange={handleSelectContact}
          value={selectedContact ? selectedContact.id : ""}
        >
          <option value="">Select Contact</option>
          {contacts.map((contact) => (
            <option key={contact.id} value={contact.id}>
              {contact.slug}
            </option>
          ))}
        </select>
      </label>
      <Button
        label="Show Agenda"
        onClick={handleGetAgenda}
        className="showAgButt"
      />
      <label>
        <input
          type="text"
          value={newAgendaName}
          onChange={(e) => setNewAgendaName(e.target.value)}
          placeholder="Type Agenda's name"
          className="newDelModAgInpt"
          maxLength={20} // Limit to 20 characters
        />
      </label>
      <Button
        label="Create Agenda"
        onClick={handleCreateAgendaWithValidation}
        className="newAccBtn"
      />
    </div>
  );
};

export default AgendaControls;