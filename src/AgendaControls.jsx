import React from 'react';
import Button from './Button';

//Here you can find the select dropdown, Show Agenda Button, input for new agenda, and Button for new agenda
const AgendaControls = ({ selectedContact, handleSelectContact, handleGetAgenda, newAgendaName, setNewAgendaName, handleCreateAgenda, contacts }) => (
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
      />
    </label>
    <Button
      label="Create Agenda"
      onClick={handleCreateAgenda}
      className="newAccBtn"
    />
  </div>
);

export default AgendaControls;
