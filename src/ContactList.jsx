//falta que haya un boton para borrar solo la vista, (no el contacto ni Agenda solo ocultar toda la agenda)

import React from 'react';
import Button from './Button';

// Component to display the list of contacts and their agendas
const ContactList = ({
  selectedContactList, // List of selected contacts and their agendas
  handleEditClick, // Function to handle edit button click
  handleDeleteContact, // Function to handle delete button click
  handleShowAddContactForm, // Function to show the add contact form
  handleDeleteAgenda, // Function to handle agenda deletion
  selectedContact, // Currently selected contact
}) => (
  <div>
    {selectedContactList.map((item, index) => (
      <div key={index}>
        <div className="contact-container">
          <div className="contact-img-container">
            <h3 className="txtAbove">{item.contact.slug}'s Agenda</h3> {/* Display the contact's slug (agenda name) */}
            <img
              src="https://abwahospital.pk/wp-content/uploads/2025/01/nopic.jpg"
              alt="profilePhoto"
              className="contact-img"
            />
          </div>
          <div className="contact-info">
            <div className="contact-header">
              <h4>Contacts:</h4>
              {/* Button to add a new contact to the agenda */}
              <Button
                label="Add Contact"
                onClick={() => handleShowAddContactForm(item.contact.slug)} // Pass the agenda slug
                className="addContact"
                icon="fa-solid fa-user-plus"
              />
              {/* Button to delete the entire agenda */}
              <Button
                label="Erase Agenda"
                onClick={() => handleDeleteAgenda(item.contact.slug)}
                className="eraseAgenda"
              />
            </div>
            <ul>
              {/* Map through the agenda to display each contact */}
              {item.agenda.map((contact) => (
                <li key={contact.id} className="contact-item">
                  <div className="contact-details">
                    <strong>{contact.name}</strong> {/* Contact name */}
                    <br />
                    <i className="fa-solid fa-phone"></i> {contact.phone} {/* Contact phone */}
                    <br />
                    <i className="fa-solid fa-envelope"></i> {contact.email} {/* Contact email */}
                    <br />
                    <i className="fa-solid fa-location-dot"></i> {contact.address} {/* Contact address */}
                  </div>
                  <div className="button-container">
                    {/* Button to edit the contact */}
                    <Button
                      label="Edit"
                      onClick={() => handleEditClick(contact)}
                      className="addContact"
                    />
                    {/* Button to delete the contact */}
                    <Button
                      label="Erase"
                      onClick={() => handleDeleteContact(item.contact.slug, contact.id)}
                      className="eraseAgenda"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="blinkdiv2"></div> {/* Visual separator */}
      </div>
    ))}
  </div>
);

export default ContactList;
