import React, { createContext, useState } from "react";

const Context = createContext();

const ContextWrapper = ({ children }) => {
  const [contacts, setContacts] = useState([]); // List of all contacts
  const [selectedContact, setSelectedContact] = useState(null); // Currently selected contact
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedContactList, setSelectedContactList] = useState([]); // List of selected contacts and their agendas
  const [editMode, setEditMode] = useState(false); // Edit mode state
  const [editingContact, setEditingContact] = useState(null); // Select Contact to edit
  const [contactName, setContactName] = useState(""); // Contact Name
  const [contactPhone, setContactPhone] = useState(""); // Contact's number
  const [contactEmail, setContactEmail] = useState(""); // Contact's E-mail
  const [contactAddress, setContactAddress] = useState(""); // Contact's Address
  const [newAgendaName, setNewAgendaName] = useState(""); // New agenda's name
  const [showAddContactForm, setShowAddContactForm] = useState(false); // Show/hide add contact form
  const [selectedAgendaSlug, setSelectedAgendaSlug] = useState(""); // Slug of the selected agenda

  return (
    <Context.Provider
      value={{
        contacts,
        setContacts,
        selectedContact,
        setSelectedContact,
        loading,
        setLoading,
        selectedContactList,
        setSelectedContactList,
        editMode,
        setEditMode,
        editingContact,
        setEditingContact,
        contactName,
        setContactName,
        contactPhone,
        setContactPhone,
        contactEmail,
        setContactEmail,
        contactAddress,
        setContactAddress,
        newAgendaName,
        setNewAgendaName,
        showAddContactForm,
        setShowAddContactForm,
        selectedAgendaSlug,
        setSelectedAgendaSlug,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextWrapper };