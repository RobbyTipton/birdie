const express = require('express');
const router = express.Router();
const scorecardController = require('../controllers/scorecardController.js');

router.get(
  '/:scorecardId',
  scorecardController.getPlayerName,
  scorecardController.getOpponentName,
  scorecardController.getDate,
  scorecardController.getTime,
  scorecardController.getPlayerScore,
  scorecardController.getOpponentScore,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

router.post('/:scorecardId/player', scorecardController.updatePlayerScore, (req, res) => {
  res.status(200).json('Updated player score in database.');
});

router.post('/:scorecardId/opponent', scorecardController.updateOpponentScore, (req, res) => {
  res.status(200).json('Updated opponent score in database.');
});

module.exports = router;
