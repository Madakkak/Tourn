//
// unclaimedInvites.js
//
// Experimental system to store unclaimed invites when invites
// are sent to users who haven't yet signed up through Facebook.
// Currently, it's not working. Sorry to get you excited.
//

const InviteSchema = require('../schemas/unclaimedInvites.js');

// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;

const Invites = module.exports;

Invites.createPendingInvite = (facebookId, tournId, tournName) => new Promise((resolve, reject) => {
  InviteSchema.create({
    facebookId,
    tournId,
    tournName,
  }, (err, result) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(result);
  });
});

Invites.findAllWithFacebookId = (fbid) => new Promise((resolve, reject) => {
  InviteSchema.find({ facebookId: fbid }, (err, result) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(result);
  });
});
