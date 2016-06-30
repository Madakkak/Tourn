require('babel-register');
const TournamentSchema = require('../schemas/tournaments.js');
const BracketHelper = require('../../client/src/utilities/bracket_helpers.jsx');

const users = require('./users.js');

const Tournaments = module.exports;

Tournaments.create = (organizerid, name, type) => new Promise((resolve, reject) => {
  console.log(organizerid, name, type);
  TournamentSchema.create({
    organizerid,
    name,
    type,
    bracketSize: 1,
    registrationOpen: true,
    roster: [{
      playerId: organizerid,
    }],
    start: false,
    invite: true,
  }, (err, result) => {
    if (err) reject(err);

    users.findById(organizerid)
      .then((user) => {
        user.tournamentIds.push({
          tournId: result._id,
          tournName: result.name,
        });
        user.save((saveErr) => {
          if (saveErr) reject(saveErr);
          resolve(result);
        });
      });
  });
});

Tournaments.findById = (tournamentid) => new Promise((resolve, reject) => {
  TournamentSchema.findById(tournamentid, (err, result) => {
    if (err) reject(err);
    resolve(result);
  });
});

Tournaments.findByUser = (userid) => new Promise((resolve, reject) => {
  TournamentSchema.find({ roster: { playerId: userid } }, (err, result) => {
    if (err) reject(err);
    resolve(result);
  });
});

Tournaments.addChatMessage =
  (tournid, authorId, authorName, message, timeStamp) => new Promise((resolve, reject) => {
    TournamentSchema.findById(tournid, (err, result) => {
      if (err) {
        console.log('addChatMessage error');
        reject(err);
        return;
      }

      if (!result) {
        console.log('Tournament doesnt exist');
        reject('Tournament doesnt exist!');
        return;
      }

      result.chatHistory.push({ authorId, authorName, message, timeStamp });

      result.save((saveErr, saveResult) => {
        if (saveErr) {
          console.log('Chat Message save error', saveErr);
          reject(saveErr);
          return;
        }
        resolve(saveResult);
      });
    });
  });

Tournaments.startTourn = (tournid) => new Promise((resolve, reject) => {
  TournamentSchema.findById(tournid, (err, result) => {
    console.log('startTourn');
    if (err) {
      console.log('startTourn: err =', err);
      reject(err);
      return;
    }

    if (!result) {
      console.log('startTourn: tournament not found!');
      reject('tournament not found');
      return;
    }

    const endResult = result;

    endResult.start = true;
    endResult.invite = false;
    console.log('startTourn: saving...!');
    endResult.save((saveErr, saveResult) => {
      console.log('startTourn: saveResult =', saveResult);
      console.log('startTourn: saveErr =', saveErr);
      if (saveErr) reject(saveErr);
      resolve(saveResult);
    });
  });
});

Tournaments.addRosterPlayer = (tournid, playerId) => new Promise((resolve, reject) => {
  users.findById(playerId)
    .then((playerObject) => {
      TournamentSchema.findById(tournid, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        if (!result) {
          reject('Couldnt find tournament!');
          return;
        }
        const endResult = result;

        endResult.roster.push({ playerId });
        endResult.bracketSize = result.bracketSize ?
          BracketHelper.getBracketSize(endResult.roster.length) :
          2;
        endResult.save(() => {
          Tournaments.fillOutBracket(tournid)
            .then((finalResult) => {
              if (!finalResult.bracket[Math.floor(finalResult.roster.length / 2)].playerA) {
                finalResult.bracket[Math.floor(finalResult.roster.length / 2)].playerA =
                {
                  playerName: playerObject.name,
                  playerPic: playerObject.picture,
                  playerId: playerObject._id,
                };
              } else {
                finalResult.bracket[Math.floor(finalResult.roster.length / 2)].playerB =
                {
                  playerName: playerObject.name,
                  playerPic: playerObject.picture,
                  playerId: playerObject._id,
                };
              }

              finalResult.save((saveErr, saveResult) => {
                if (saveErr) {
                  reject(saveErr);
                  return;
                }
                
                resolve(saveResult);
              });
            });
        });
      });
    });
});

Tournaments.fillOutBracket = (tournid) => new Promise((resolve, reject) => {
  tournaments.findById(tournid)
    .then((tourn) => {
      while (tourn.bracket.length < tourn.bracketSize - 1) {
        tourn.bracket.push({
          playerA: null,
          playerB: null,
          winner: null,
        });
      }

      tourn.save((err, res) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(res);
      });
    });
});

Tournaments.advancePlayer = (tournid, playerId, match) => new Promise((resolve, reject) => {
  users.findById(playerId)
    .then((playerObject) => {
      TournamentSchema.findById(tournid, (err, result) => {
        if (err) reject(err);

        const endResult = result;

        const someFurtherMatch = BracketHelper.getNextMatch(match, result.bracketSize);

        endResult.bracket[match].winner = playerObject;
        if (!endResult.bracket[someFurtherMatch]) {
          endResult.bracket[someFurtherMatch] = {};
          endResult.bracket[someFurtherMatch].playerA = 
            { playerName: playerObject.name, playerId: playerObject._id };
        } else {
          endResult.bracket[someFurtherMatch].playerB = 
            { playerName: playerObject.name, playerId: playerObject._id };
        }

        endResult.save((saveErr, saveResult) => {
          if (saveErr) reject(saveErr);
          resolve(saveResult);
        });
      });
    });
});
