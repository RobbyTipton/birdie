function matchHandicaps() {
  // These should be moved into function parameters later on.
  const playerHandicap = 1.11;
  const opponentHandicap = 3.33;
  const holesByHandicap = [6, 8, 1, 9, 2, 3, 5, 4, 7];

  // Declare and initialize all player and opponent strokes to 0.
  let playerTotalStrokes = 0;
  let opponentTotalStrokes = 0;
  const playerStrokes = {};
  const opponentStrokes = {};

  for (let i = 1; i <= 9; i++) {
    playerStrokes[i] = 0;
    opponentStrokes[i] = 0;
  }

  // Calculate total strokes and strokes per hole for each player.
  if (playerHandicap > opponentHandicap) {
    playerTotalStrokes = Math.floor(playerHandicap - opponentHandicap);
    opponentTotalStrokes = 0;
    let i = playerTotalStrokes;
    let j = 0;
    while (i >= 0) {
      playerStrokes[holesByHandicap[j]] += 1;
      i--;
      j = (j + 1) % 9;
    }
  } else {
    opponentTotalStrokes = Math.floor(opponentHandicap - playerHandicap);
    playerTotalStrokes = 0;
    let i = opponentTotalStrokes;
    let j = 0;
    while (i >= 0) {
      opponentStrokes[holesByHandicap[j]] += 1;
      i--;
      j = (j + 1) % 9;
    }
  }

  return {
    playerTotalStrokes,
    opponentTotalStrokes,
    playerStrokes,
    opponentStrokes,
  };
}

export default matchHandicaps;
