'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });

  function getNameHandler(agent) {
    let name = agent.parameters.name;
    let email = agent.parameters.email;
    db.collection("userDetails").add({ 
      name: name,
      email: email,
      password:password
    });
    agent.add('Data added successfully!!');
  }

  let intentMap = new Map();
  intentMap.set('setDetails', getNameHandler);
  agent.handleRequest(intentMap);
});