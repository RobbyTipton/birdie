CREATE TABLE leagues (
  "_id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "golf_course_name" varchar,
  "hole_1_handicap" integer,
  "hole_2_handicap" integer,
  "hole_3_handicap" integer,
  "hole_4_handicap" integer,
  "hole_5_handicap" integer,
  "hole_6_handicap" integer,
  "hole_7_handicap" integer,
  "hole_8_handicap" integer,
  "hole_9_handicap" integer,
  "hole_1_par" integer,
  "hole_2_par" integer,
  "hole_3_par" integer,
  "hole_4_par" integer,
  "hole_5_par" integer,
  "hole_6_par" integer,
  "hole_7_par" integer,
  "hole_8_par" integer,
  "hole_9_par" integer
);

CREATE TABLE players (
  "_id" SERIAL PRIMARY KEY,
  "username" varchar NOT NULL UNIQUE,
  "password" varchar NOT NULL,
  "name" varchar,
  "handicap" decimal(4,2)
);

CREATE TABLE teams (
  "_id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "player_1_id" integer REFERENCES players,
  "player_2_id" integer REFERENCES players,
  "league_id" integer REFERENCES leagues
);

CREATE TABLE matches (
  "_id" SERIAL PRIMARY KEY,
  "team_1_id" integer REFERENCES teams,
  "team_2_id" integer REFERENCES teams,
  "p1_vs_p1" boolean,
  "tee_time" time,
  "date" date
);

CREATE TABLE scorecards (
  "_id" SERIAL PRIMARY KEY,
  "match_id" integer REFERENCES matches,
  "player_id" integer REFERENCES players,
  "opponent_id" integer REFERENCES players,
  "player_handicap" decimal(4,2),
  "opponent_handicap" decimal(4,2),
  "hole_1_score" integer,
  "hole_2_score" integer,
  "hole_3_score" integer,
  "hole_4_score" integer,
  "hole_5_score" integer,
  "hole_6_score" integer,
  "hole_7_score" integer,
  "hole_8_score" integer,
  "hole_9_score" integer,
  "hole_1_opponent_score" integer,
  "hole_2_opponent_score" integer,
  "hole_3_opponent_score" integer,
  "hole_4_opponent_score" integer,
  "hole_5_opponent_score" integer,
  "hole_6_opponent_score" integer,
  "hole_7_opponent_score" integer,
  "hole_8_opponent_score" integer,
  "hole_9_opponent_score" integer
);

INSERT INTO leagues VALUES (1, 'Example League', 'Pebble Beach Golf Links', 3, 5, 6, 8, 7, 1, 9, 2, 4, 4, 5, 4, 4, 3, 5, 3, 4, 4);

INSERT INTO players VALUES (1, 'p1username', 'p1password', 'Player 1', 1.11);
INSERT INTO players VALUES (2, 'p2username', 'p2password', 'Player 2', 2.22);
INSERT INTO players VALUES (3, 'p3username', 'p3password', 'Player 3', 3.33);
INSERT INTO players VALUES (4, 'p4username', 'p4password', 'Player 4', 4.44);

INSERT INTO teams VALUES (1, 'Team 1', 1, 2, 1);
INSERT INTO teams VALUES (2, 'Team 2', 3, 4, 1);

INSERT INTO matches VALUES (1, 1, 2, true, '05:30:00', '2022-05-05');

INSERT INTO scorecards VALUES (1, 1, 1, 3, 1.11, 3.33);
INSERT INTO scorecards VALUES (2, 1, 2, 4, 2.22, 4.44);
INSERT INTO scorecards VALUES (3, 1, 3, 1, 3.33, 1.11);
INSERT INTO scorecards VALUES (4, 1, 4, 2, 4.44, 2.22);