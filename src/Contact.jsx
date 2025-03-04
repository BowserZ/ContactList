import React, { useState, useEffect } from 'react';
import './App.css';
import { getAgenda, getContacts, updateContact, deleteContact, createAgenda, createContact, deleteAgenda } from './Services/api';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import AgendaControls from './AgendaControls';

//all the fucking logic is here except for all the api's functions... 
const Contact = () => {
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

  // Fetch contacts when the component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const fetchedContacts = await getContacts();
        setContacts(fetchedContacts);
      } catch (error) {
        console.error('Error loading contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Handle contact selection from dropdown
  const handleSelectContact = (event) => {
    const contactId = event.target.value;
    const contact = contacts.find((contact) => contact.id === parseInt(contactId));
    setSelectedContact(contact);
  };

  // Fetch agenda for the selected contact
  const handleGetAgenda = async () => {
    if (!selectedContact) {
      alert('Select a contact first');
      return;
    }

    try {
      const agendaData = await getAgenda(selectedContact.slug);
      const existingContactIndex = selectedContactList.findIndex(
        (item) => item.contact.id === selectedContact.id
      );

      if (existingContactIndex !== -1) {
        const updatedContactList = [...selectedContactList];
        updatedContactList[existingContactIndex] = {
          contact: selectedContact,
          agenda: agendaData,
        };
        setSelectedContactList(updatedContactList);
      } else {
        setSelectedContactList([
          ...selectedContactList,
          { contact: selectedContact, agenda: agendaData }
        ]);
      }
    } catch (error) {
      console.error('Error loading agenda contacts:', error);
    }
  };

  // Update a contact in the agenda
  const handleUpdateContact = async (contactId) => {
    if (!contactName || !contactPhone || !contactEmail || !contactAddress) {
      alert("Please fill in all fields");
      return;
    }

    const updatedData = {
      name: contactName,
      phone: contactPhone,
      email: contactEmail,
      address: contactAddress,
    };

    try {
      await updateContact(selectedContact.slug, contactId, updatedData);
      alert("Contact updated successfully");

      setSelectedContactList(prevList =>
        prevList.map(item =>
          item.contact.id === contactId
            ? {
              ...item,
              agenda: item.agenda.map(contact =>
                contact.id === contactId ? { ...contact, ...updatedData } : contact
              )
            }
            : item
        )
      );

      const updatedContacts = await getContacts();
      setContacts(updatedContacts);

      const updatedAgendaData = await getAgenda(selectedContact.slug);
      setSelectedContactList(prevList =>
        prevList.map(item =>
          item.contact.id === selectedContact.id
            ? { ...item, agenda: updatedAgendaData }
            : item
        )
      );

      setEditMode(false);
      setEditingContact(null);
      setContactName("");
      setContactPhone("");
      setContactEmail("");
      setContactAddress("");
    } catch (error) {
      console.error("Error updating contact:", error);
      alert("There was a problem updating the contact");
    }
  };

  // Handle edit button click
  const handleEditClick = (contact) => {
    setEditMode(true);
    setEditingContact(contact);
    setContactName(contact.name);
    setContactPhone(contact.phone);
    setContactEmail(contact.email);
    setContactAddress(contact.address);
  };

  // Delete a contact from the agenda
  const handleDeleteContact = async (agendaName, contactId) => {
    try {
      await deleteContact(agendaName, contactId);
      setSelectedContactList(prevList =>
        prevList.map(item =>
          item.contact.id === selectedContact.id
            ? {
              ...item,
              agenda: item.agenda.filter(contact => contact.id !== contactId)
            }
            : item
        )
      );
      alert('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact');
    }
  };

  // Create a new agenda
  const handleCreateAgenda = async () => {
    if (!newAgendaName) {
      alert('Please enter a name for the agenda');
      return;
    }

    try {
      await createAgenda(newAgendaName);
      alert('Agenda created successfully');
      setNewAgendaName("");
    } catch (error) {
      console.error('Error creating agenda:', error);
      alert('Failed to create agenda');
    }
  };

  // Delete an agenda
  const handleDeleteAgenda = async (contactSlug) => {
    try {
      await deleteAgenda(contactSlug);
      alert('Agenda deleted successfully');
      setSelectedContactList((prevList) =>
        prevList.filter((item) => item.contact.slug !== contactSlug)
      );
    } catch (error) {
      console.error('Error deleting agenda:', error);
      alert('Failed to delete agenda');
    }
  };

  // Create a new contact in the selected agenda
  const handleCreateContact = async () => {
    if (!selectedAgendaSlug) {
      alert("First, select an agenda");
      return;
    }
    if (!contactName || !contactPhone || !contactEmail || !contactAddress) {
      alert("Please fill in all fields for the contact");
      return;
    }

    try {
      const newContact = await createContact(
        selectedAgendaSlug,
        contactName,
        contactPhone,
        contactEmail,
        contactAddress
      );

      alert("Contact added successfully");

      const updatedAgendaData = await getAgenda(selectedAgendaSlug);
      setSelectedContactList((prevList) =>
        prevList.map((item) =>
          item.contact.slug === selectedAgendaSlug
            ? { ...item, agenda: updatedAgendaData }
            : item
        )
      );

      setContactName("");
      setContactPhone("");
      setContactEmail("");
      setContactAddress("");
      setShowAddContactForm(false);
    } catch (error) {
      console.error("Error creating contact:", error);
      alert("There was a problem creating the contact");
    }
  };

  // Clear the form fields
  const clearForm = () => {
    setContactName("");
    setContactPhone("");
    setContactEmail("");
    setContactAddress("");
  };

  // Show the add contact form and set the selected agenda
  const handleShowAddContactForm = (agendaSlug) => {
    setSelectedAgendaSlug(agendaSlug);
    setShowAddContactForm(true);
  };

  return (
    <footer className="footer mt-auto text-center">
      <section className="position-absolute top-50 start-50 translate-middle">
        <div className="card">
          <div>
            <h1 className="title">Agenda</h1>
            <div className="blinkdiv"></div>

            {loading ? (
              <p>Loading information...</p>
            ) : (
              <>
                <AgendaControls
                  selectedContact={selectedContact}
                  handleSelectContact={handleSelectContact}
                  handleGetAgenda={handleGetAgenda}
                  newAgendaName={newAgendaName}
                  setNewAgendaName={setNewAgendaName}
                  handleCreateAgenda={handleCreateAgenda}
                  contacts={contacts}
                />
                <div className="blinkdiv2"></div>

                {selectedContactList.length > 0 && (
                  <ContactList
                    selectedContactList={selectedContactList}
                    handleEditClick={handleEditClick}
                    handleDeleteContact={handleDeleteContact}
                    handleShowAddContactForm={handleShowAddContactForm}
                    handleDeleteAgenda={handleDeleteAgenda}
                    selectedContact={selectedContact}
                  />
                )}

                {editMode && (
                  <ContactForm
                    title="Editing Contact"
                    contactName={contactName}
                    setContactName={setContactName}
                    contactPhone={contactPhone}
                    setContactPhone={setContactPhone}
                    contactEmail={contactEmail}
                    setContactEmail={setContactEmail}
                    contactAddress={contactAddress}
                    setContactAddress={setContactAddress}
                    onSave={() => handleUpdateContact(editingContact.id)}
                    onCancel={() => {
                      setEditMode(false);
                      clearForm();
                    }}
                    saveButtonLabel="Save Changes"
                    cancelButtonLabel="Cancel"
                  />
                )}

                {showAddContactForm && (
                  <ContactForm
                    title="Add New Contact"
                    contactName={contactName}
                    setContactName={setContactName}
                    contactPhone={contactPhone}
                    setContactPhone={setContactPhone}
                    contactEmail={contactEmail}
                    setContactEmail={setContactEmail}
                    contactAddress={contactAddress}
                    setContactAddress={setContactAddress}
                    onSave={async () => {
                      await handleCreateContact();
                      setShowAddContactForm(false);
                    }}
                    onCancel={() => setShowAddContactForm(false)}
                    saveButtonLabel="Save"
                    cancelButtonLabel="Cancel"
                  />
                )}
              </>
            )}
          </div>
          <div className="extra-space"></div>
        </div>
      </section>
    </footer>
  );
};

export default Contact;
