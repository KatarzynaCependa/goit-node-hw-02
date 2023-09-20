const Contact = require("./schemas/contacts");
const User = require("./schemas/users");

// Contacts

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

const createContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact = (id, fields) => {
  return Contact.findOneAndUpdate({ _id: id }, { $set: fields }, { new: true });
};

const updateStatusContact = (id, fields) => {
  return Contact.findOneAndUpdate({ _id: id }, { $set: fields }, { new: true });
};

// Users

const findUser = async (email) => await User.findOne({ email });

const createUser = ({ email, password, avatarURL }) => {
  return User.create({ email, password, avatarURL });
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  createContact,
  updateContact,
  updateStatusContact,
  findUser,
  createUser,
};
