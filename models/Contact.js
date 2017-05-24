var mongoose = require('mongoose');
// DB schema
var contactSchema = mongoose.Schema({
  name: {type:String, required:true, unique:true},
  email: {type:String},
  phone:{type:String}
});
// contact: mongoDB에서 사용될 document이름
// contactSchema: 설정한 schema
var Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;
