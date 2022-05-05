const db = require('../../database/index.js');

const scorecardController = {};

scorecardController.getPlayerName = (req, res, next) => {
  const text = `
  SELECT players.name
  FROM players
  INNER JOIN scorecards ON players._id=scorecards.player_id
  WHERE scorecards._id=$1`;
  const values = [req.params.scorecardId];

  db.query(text, values)
    .then((sqlRes) => {
      res.locals.playerName = sqlRes.rows[0].name;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error in scorecardController.getPlayerName middleware.',
        message: {
          err: 'Error in scorecardController.getPlayerName middleware.',
        },
      });
    });
};

scorecardController.getOpponentName = (req, res, next) => {
  const text = `
    SELECT players.name
    FROM players
    INNER JOIN scorecards ON players._id=scorecards.opponent_id
    WHERE scorecards._id=$1`;
  const values = [req.params.scorecardId];

  db.query(text, values)
    .then((sqlRes) => {
      res.locals.opponentName = sqlRes.rows[0].name;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error in scorecardController.getOpponentName middleware.',
        message: {
          err: 'Error in scorecardController.getOpponentName middleware.',
        },
      });
    });
};

scorecardController.getDate = (req, res, next) => {
  const text = `
    SELECT matches.date
    FROM matches
    INNER JOIN scorecards ON matches._id=scorecards.match_id
    WHERE scorecards._id=$1`;
  const values = [req.params.scorecardId];

  db.query(text, values)
    .then((sqlRes) => {
      res.locals.date = sqlRes.rows[0].date.toString().slice(0, 10);
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error in scorecardController.getDate middleware.',
        message: {
          err: 'Error in scorecardController.getDate middleware.',
        },
      });
    });
};

scorecardController.getTime = (req, res, next) => {
  const text = `
    SELECT matches.tee_time
    FROM matches
    INNER JOIN scorecards ON matches._id=scorecards.match_id
    WHERE scorecards._id=$1`;
  const values = [req.params.scorecardId];

  db.query(text, values)
    .then((sqlRes) => {
      res.locals.time = sqlRes.rows[0].tee_time.slice(0, 5);
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error in scorecardController.getTime middleware.',
        message: {
          err: 'Error in scorecardController.getTime middleware.',
        },
      });
    });
};

scorecardController.getPlayerScore = (req, res, next) => {
  const text = `
    SELECT hole_1_score, hole_2_score, hole_3_score, hole_4_score, hole_5_score, hole_6_score, hole_7_score, hole_8_score, hole_9_score
    FROM scorecards
    WHERE _id=$1`;
  const values = [req.params.scorecardId];

  db.query(text, values)
    .then((sqlRes) => {
      const scores = sqlRes.rows[0];
      const formattedScores = {};
      for (let i = 1; i <= 9; i++) {
        if (scores[`hole_${i}_score`]) {
          formattedScores[i] = scores[`hole_${i}_score`];
        } else {
          formattedScores[i] = 'static';
        }
      }
      res.locals.playerScore = formattedScores;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error in scorecardController.getPlayerScore middleware.',
        message: {
          err: 'Error in scorecardController.getPlayerScore middleware.',
        },
      });
    });
};

scorecardController.getOpponentScore = (req, res, next) => {
  const text = `
    SELECT hole_1_opponent_score, hole_2_opponent_score, hole_3_opponent_score, hole_4_opponent_score, hole_5_opponent_score, hole_6_opponent_score, hole_7_opponent_score, hole_8_opponent_score, hole_9_opponent_score
    FROM scorecards
    WHERE _id=$1`;
  const values = [req.params.scorecardId];

  db.query(text, values)
    .then((sqlRes) => {
      const scores = sqlRes.rows[0];
      const formattedScores = {};
      for (let i = 1; i <= 9; i++) {
        if (scores[`hole_${i}_opponent_score`]) {
          formattedScores[i] = scores[`hole_${i}_opponent_score`];
        } else {
          formattedScores[i] = 'static';
        }
      }
      res.locals.opponentScore = formattedScores;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error in scorecardController.getOpponentScore middleware.',
        message: {
          err: 'Error in scorecardController.getOpponentScore middleware.',
        },
      });
    });
};

scorecardController.updatePlayerScore = (req, res, next) => {
  const text = `
  UPDATE scorecards
  SET hole_${req.body.hole}_score = $2
  WHERE _id = $1`;
  const values = [req.params.scorecardId, req.body.score];

  db.query(text, values)
    .then((sqlRes) => next())
    .catch((err) => {
      return next({
        log: 'Error in scorecardController.updatePlayerScore middleware.',
        message: {
          err: 'Error in scorecardController.updatePlayerScore middleware.',
        },
      });
    });
};

scorecardController.updateOpponentScore = (req, res, next) => {
  const text = `
  UPDATE scorecards
  SET hole_${req.body.hole}_opponent_score = $2
  WHERE _id = $1`;
  const values = [req.params.scorecardId, req.body.score];

  db.query(text, values)
    .then((sqlRes) => next())
    .catch((err) => {
      return next({
        log: 'Error in scorecardController.updateOpponentScore middleware.',
        message: {
          err: 'Error in scorecardController.updateOpponentScore middleware.',
        },
      });
    });
};

module.exports = scorecardController;
