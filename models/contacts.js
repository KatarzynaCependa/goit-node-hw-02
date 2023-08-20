const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const foundId = contacts.find((contact) => contact.id === contactId);

    return foundId;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const initialLength = contacts.length;
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    if (initialLength === filteredContacts.length) {
      return false;
    }

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const newContact = { id: nanoid(), name, email, phone };

    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      return false;
    } else {
      const contact = contacts[index];
      const updatedContact = { ...contact, ...body };
      contacts[index] = updatedContact;

      await fs.writeFile(contactsPath, JSON.stringify(contacts));

      return updatedContact;
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
