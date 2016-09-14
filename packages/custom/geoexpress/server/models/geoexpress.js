'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Contact Information Schema
 * The Contact Information is used in the Capabilities document of the WMS server
 * , and is publicly accessible.
 */
var Contact = new Schema({
  ContactInformation: {
          type: Array,
          items: [
            {
              type: Object,
              properties: {
                ContactPersonPrimary: {
                  type: Array,
                  items: [
                    {
                      type: Object,
                      properties: {
                        ContactPerson: {
                          type: String,
                          default: "Claudius Ptolomaeus"
                        }
                      }
                    },
                    {
                      type: Object,
                      properties: {
                        ContactOrganization: {
                          type: String,
                          default: "The ancient geographes INC"
                        }
                      }
                    }
                  ]
                }
              }
            },
            {
              type: Object,
              properties: {
                ContactPosition: {
                  type: String,
                  default: "Chief geographer"
                }
              }
            },
            {
              type: Object,
              properties: {
                ContactAddress: {
                  type: Array,
                  items: [
                    {
                      type: Object,
                      properties: {
                        AddressType: {
                          type: String,
                          default: "Work"
                        }
                      }
                    },
                    {
                      type: Object,
                      properties: {
                        City: {
                          type: String,
                          default: "Alexandria"
                        }
                      }
                    },
                    {
                      type: Object,
                      properties: {
                        Country: {
                          type: String,
                          default: "Egypt"
                        }
                      }
                    }
                  ]
                }
              }
            },
            {
              type: Object,
              properties: {
                ContactElectronicMailAddress: {
                  type: String,
                  default: "claudius.ptolomaeus@gmail.com"
                }
              }
            }
          ]
        }
});
/**
 * Validations
 */
// ????

mongoose.model('Contact', Contact);
