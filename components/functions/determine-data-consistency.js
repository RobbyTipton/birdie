const determineDataConsistency = (playerScorecard, opponentScorecard, hole) => {
  return playerScorecard === opponentScorecard
    ? '✅'
    : '❌';
};

export default determineDataConsistency;
