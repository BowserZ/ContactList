// src/Services/api.js

// Crear una agenda
export async function createAgenda(name) {
  const url = `https://playground.4geeks.com/contact/agendas/${name}`;

  const response = await fetch(url, { method: "POST" });

  if (!response.ok) {
    throw new Error("Error adding user");
  }

  console.log("User added");
}

// Crear un contacto en una agenda
export async function createContact(name, contactName, contactPhone, contactMail, contactAddress) {
  const url = `https://playground.4geeks.com/contact/agendas/${name}/contacts`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name: contactName,
      phone: contactPhone,
      email: contactMail,
      address: contactAddress,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error adding agenda contact");
  }

  console.log("Agenda contact added");
  return await response.json();
}

// Obtener todos los contactos de una agenda
export async function getAgenda(name) {
  const url = `https://playground.4geeks.com/contact/agendas/${name}/contacts`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error en la respuesta de la API: ${response.statusText}`);
  }
  const data = await response.json();
  console.log("Respuesta de la API:", data);

  if (!Array.isArray(data.contacts)) {
    throw new Error("La respuesta no contiene un array válido de contactos");
  }
  return data.contacts;
}

// Obtener todas las agendas
export async function getContacts() {
  const url = `https://playground.4geeks.com/contact/agendas?offset=0&limit=100`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("La respuesta no fue correcta");
    }

    const data = await response.json();

    if (data && data.agendas) {
      return data.agendas;
    } else {
      throw new Error("No se encontraron los datos esperados en la respuesta");
    }
  } catch (error) {
    console.error("Error al obtener los contactos:", error);
    return [];
  }
}

// Actualizar un contacto
export async function updateContact(name, id, updatedData) {
  const url = `https://playground.4geeks.com/contact/agendas/${name}/contacts/${id}`;

  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(updatedData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Error updating contact: ${errorMessage}`);
  }

  return await response.json();
}

// Eliminar una agenda
export async function deleteAgenda(name) {
  const url = `https://playground.4geeks.com/contact/agendas/${name}`;

  const response = await fetch(url, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Error deleting agenda");
  }

  console.log("Agenda deleted");
}

// Eliminar un contacto de una agenda
export async function deleteContact(name, id) {
  const url = `https://playground.4geeks.com/contact/agendas/${name}/contacts/${id}`;

  const response = await fetch(url, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Error deleting contact");
  }

  console.log("Contact deleted");
}