'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// var contactpersonprimary = new Schema({
//       ContactPerson : String,
//       ContactOrganization : String
// });
//
// var contactaddress = new Schema({
//   AddressType : String,
//   Address : String,
//   City : String,
//   StateOrProvince : String,
//   PostCode : String,
//   Country : String
// });
//
// /**
//  * Contact Information Schema
//  * The Contact Information is used in the Capabilities document of the WMS server
//  * , and is publicly accessible.
//  */
// var contactinformation = new Schema({
//     ContactPersonPrimary : [contactpersonprimary],
//     ContactPosition : String,
//     ContactAddress : [contactaddress],
//     ContactVoiceTelephone : String,
//     ContactFacsimileTelephone : String,
//     ContactElectronicMailAddress : String
// });
//
// var Contact = new Schema({
//   ContactInformation : [contactinformation]
// });

// var Contact = new Schema({
//    ContactInformation : [{
//          ContactPersonPrimary : [{
//            ContactPerson : String,
//            ContactOrganization : String
//          }],
//          ContactPosition : String,
//          ContactAddress : [{
//              AddressType : String,
//              Address : String,
//              City : String,
//              StateOrProvince : String,
//              PostCode : String,
//              Country : String
//          }],
//          ContactVoiceTelephone : String,
//          ContactFacsimileTelephone : String,
//          ContactElectronicMailAddress : String
//    }]
// });

// TODO sperimentare 1! object
var Contact = new Schema({
   ContactInformation : {}
});


/**
 * Validations
 */
// ????

mongoose.model('Contact', Contact);
