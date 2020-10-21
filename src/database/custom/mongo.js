const config = require('../../config.json');

const mongoose = require("mongoose");

//------------------------------------------------------------

const FileSchema = mongoose.Schema({
  name: String,
  path: String,
  views: Number,
  uploader: String,
  UploadedAt: String,
  lock: {
    active: Boolean,
    password: String
  }
});

let FileModel = mongoose.model('file', FileSchema);

module.exports.addFileView = async (fileName) => {
  let fileData = await this.getFile(fileName);
  if (!fileData) return null;
  await FileModel.updateOne(fileData, { views: fileData.views++ });
  return true;
};

module.exports.getFile = async (fileName) => {
  let fileData = await FileModel.findOne({ name: fileName });
  return fileData;
};

module.exports.saveFile = async (data) => {
  let fileData = await FileModel.create(data);
  return fileData;
};

module.exports.delFile = async (fileName) => {
  let fileData = await this.getFile(fileName);
  if (!fileData) return false;
  await FileModel.deleteOne(fileData);
  return true;
};

//------------------------------------------------------------

const URLSchema = mongoose.Schema({
  id: String,
  views: Number,
  uploader: String,
  redirect: String,
  CreatedAt: String,
});

let URLModel = mongoose.model('url', URLSchema);

module.exports.addURLView = async (ID) => {
  let URLData = await this.getURL(ID);
  if (!URLData) return null;
  await URLModel.updateOne(URLData, { views: URLData.views++ });
  return true;
};

module.exports.getURL = async (ID) => {
  let URLData = await URLModel.findOne({ id: ID });
  return URLData;
};

module.exports.saveURL = async (data) => {
  let URLData = await URLModel.create(data);
  return URLData;
};

module.exports.delURL = async (ID) => {
  let URLData = await this.getURL(ID);
  if (!URLData) return false;
  await URLModel.deleteOne(URLData);
  return true;
};

//------------------------------------------------------------

const UserSchema = mongoose.Schema({
  key: String,
  name: String,
  owner: Boolean,
  uploads: Number,
  redirects: Number,
  discord: String,
  CreatedAt: String,
});

let UserModel = mongoose.model('users', UserSchema);

module.exports.addUserUpload = async (key) => {
  let userData = await this.getUserFromKey(key);
  if (!userData) return null;
  await UserModel.updateOne(userData, { uploads: userData.uploads++ });
  return true;
};

module.exports.addUserRedirect = async (key) => {
  let userData = await this.getUserFromKey(key);
  if (!userData) return null;
  await UserModel.updateOne(userData, { redirect: userData.redirect++ });
  return true;
};

module.exports.setUserDiscord = async (key, discord) => {
  let userData = await this.getUserFromKey(key);
  if (!userData) return null;
  await UserModel.updateOne(userData, { discord: discord });
  return true;
};

module.exports.getUserFromKey = async (key) => {
  let userData = await UserModel.findOne({ key: key });
  return userData;
};

module.exports.getUserFromDiscord = async (discord) => {
  let userData = await UserModel.findOne({ discord: discord });
  return userData;
};

module.exports.getUserFromName = async (name) => {
  let userData = await UserModel.findOne({ name: name });
  return userData;
};

module.exports.getAllUsers = async () => {
  let userData = await UserModel.find();
  return userData;
};

module.exports.saveUser = async (data) => {
  let userData = await UserModel.create(data);
  return userData;
};

module.exports.delUser = async (key) => {
  let userData = await this.getUserFromKey(key);
  if (!userData) return false;
  await UserModel.deleteOne(userData);
  return true;
};

//------------------------------------------------------------

const defaultOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};

module.exports.init = () => {
  if (!config || !config.mongo || !config.mongo.connectURI || !config.mongo.connectOptions)
    throw new Error('Incorrect config setup.');

  let connectURI = config.mongo.connectURI;
  let connectOptions = Object.assign({}, config.mongo.connectOptions, defaultOptions);
  mongoose.connect(connectURI, connectOptions);
};

//------------------------------------------------------------