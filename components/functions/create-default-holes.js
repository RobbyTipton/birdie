const createDefaultHoles = () => {
  const holes = {};
  for (let i = 1; i <= 9; i++) {
    holes[i] = {
      playerScore: '',
      statusPlayer: null,
      opponentScore: '',
      statusOpponent: null,
      playerStrokes: '',
      opponentStrokes: '',
    };
  }
  return holes;
};

export default createDefaultHoles;
