import ext from "./ext";



// module.exports = (ext.storage.sync ? ext.storage.sync : ext.storage.local);
module.exports = ext.storage.local;