'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Contacttempl = mongoose.model('Contact'),
    _ = require('lodash'),
    xml = require('xml');

module.exports = function(Contact) {

/**
 * Contact Information - the collection name is the lowercase model name + s
 */

 return {
    all: function(req, res) {
      // use lean() in order to convert the contact object to xml
      // if you don't use lean() the xml(contact) return an invalid format
      // the select('-_id') is used to remove the _id ObjectID from the response
      Contacttempl.find().lean().select('-_id').exec(function(err, contact) {
          if (err) {
              res.render('error', {
                  status: 500
              });
          } else {
              var response = xml(contact);
              res.type('text/xml');

              // This works the response is correctly interpreted in the browser
              res.send(response);
              // TODO this is not working the injected response is not interpreted
              // and appear like text
              // res.render('newtest/contact.html', {contact: response});
          }
      });
    },

    mycontact: function(req, res) {
      Contacttempl.find().exec(function(err, contact) {
          if (err) {
              res.render('error', {
                  status: 500
              });
          } else {
            console.log("--- server controller mycontact ---");
            console.log(contact)
            // res.json(contact[0]);
            res.json(contact);
          }
      });
    },

    create: function(req, res) {

      console.log("--- server controller create ---");
      console.log(req.body);

      // var obj = {
      // ContactInformation: [
      //         { ContactPersonPrimary:[
      //               {ContactPerson: "Claudius Ptolomaeus"},
      //               {ContactOrganization: "The ancient geographes INC"}
      //             ] },
      //             {ContactPosition: "Chief geographer"},
      //             {ContactAddress: [
      //                 {AddressType: "Work"},
      //                 {Address: "Work"},
      //                 {City: "Alexandria"},
      //                 {StateOrProvince: "Alexandria"},
      //                 {PostCode: "Alexandria"},
      //                 {Country: "Egypt"}
      //             ]},
      //             {ContactVoiceTelephone: "claudius.ptolomaeus@gmail.com"},
      //             {ContactFacsimileTelephone: "claudius.ptolomaeus@gmail.com"},
      //             {ContactElectronicMailAddress: "claudius.ptolomaeus@gmail.com"}
      //
      //     ]
      //   };
      //
      //
      // var contact = new Contacttempl(obj);

      var contact = new Contacttempl(req.body);
      console.log("New contact from request body")
      console.log(contact)
      // article.user = req.user;

      contact.save(function(err) {
          if (err) {
              return res.status(500).json({
                  error: 'Cannot save the contact'
              });
          }

          // Articles.events.publish({
          //     action: 'created',
          //     user: {
          //         name: req.user.name
          //     },
          //     url: config.hostname + '/articles/' + article._id,
          //     name: article.title
          // });

          res.json(contact);
      });
    },

    update : function(req, res) {

      // console.log(req.body);
      // console.log(req.params);

      // console.log(req);
      var contact = req.contact;
      contact = _.extend(contact, req.body);
      console.log("New contact from request body")
      console.log(contact)
      // article.user = req.user;

      contact.save(function(err) {
          if (err) {
              return res.status(500).json({
                  error: 'Cannot save the contact'
              });
          }

          // Articles.events.publish({
          //     action: 'created',
          //     user: {
          //         name: req.user.name
          //     },
          //     url: config.hostname + '/articles/' + article._id,
          //     name: article.title
          // });

          res.json(contact);
      });
    }
  };
}
