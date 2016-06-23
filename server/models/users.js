const UsersSchema = require('../schemas/users.js');
// const uuid = require('uuid');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Users = module.exports;

const Tournaments = require('./tournaments.js');

// Instantiation functions

Users.create = (name, fbid) => new Promise((resolve, reject) => {
  UsersSchema.create({ name, fbid }, (err, result) => {
    if (err) reject(err);
    resolve(result);
  });
});

// Search functions

Users.findById = (userid) => new Promise((resolve, reject) => {
  UsersSchema.findById(userid, (err, result) => {
    if (err) reject(err);
    resolve(result);
  });
});

Users.findByFacebookId = (facebookid) => new Promise((resolve, reject) => {
  UsersSchema.findOne({ fbid: facebookid }, (err, result) => {
    if (err) reject(err);
    resolve(result);
  });
});

Users.findByToken = (sessiontoken) => new Promise((resolve, reject) => {
  UsersSchema.findOne({ sessions: { token: sessiontoken } }, (err, result) => {
    if (err) reject(err);
    resolve(result);
  });
});

Users.createAlert = (userid, tournId, isInvite, message) => new Promise((resolve, reject) => {
  Users.findById(userid)
    .then((result) => {
      result.alerts.push({
        tournId,
        isInvite,
        message,
      });
    })
    .catch((err) => {
      reject(err);
    });
});

Users.deleteAlert = (userid, alertid) => new Promise((resolve, reject) => {
  Users.findById(userid)
    .then((result) => {
      const newResult = result;
      newResult.alert = result.alert.map((alert) => {
        if (alert._id === ObjectId.fromString(alertid)) {
          return null;
        }
        return alert;
      });
      result.save((err, saveResult) => {
        if (err) reject(err);
        resolve(saveResult);
      });
    });
});

Users.acceptInvite = (userid, alertid) => new Promise((resolve, reject) => {
  Users.findById(userid)
    .then((result) => {
      if (!result) {
        console.log('Woe is me. Our user doesn\'t exist', userid);
        reject();
      }

      const newResult = result;
      newResult.alerts = result.alerts.map((alert) => {
        if (alert._id === ObjectId.fromString(alertid)) {
          Tournaments.findById(alert.tournId)
            .then((tourn) => {
              tourn.roster.push({ playerId: result._id });
              tourn.save((err) => {
                if (err) reject(err);
              });
              newResult.tournaments.push({
                tournId: tourn._id,
                tournName: tourn.name,
              });
              newResult.save((err) => {
                if (err) reject(err);
              });
            })
            .catch((err) => {
              reject(err);
            });
          return null;
        }
        return alert;
      });
      result.save((err, saveResult) => {
        if (err) reject(err);
        resolve(saveResult);
      });
    });
});
