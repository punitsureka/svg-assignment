CREATE DATABASE simple_viral_games;

\c simple_viral_games;

CREATE TABLE IF NOT EXISTS game (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    published_date DATE NOT NULL,
    author VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_game_name_url_is_deleted ON game(name, url, is_deleted) WHERE is_deleted = FALSE;

CREATE INDEX IF NOT EXISTS idx_game_id_is_deleted ON game (id, is_deleted);

PREPARE insert_game (VARCHAR, VARCHAR, DATE, VARCHAR) AS
    INSERT INTO game (name, url, published_date, author) VALUES ($1, $2, $3, $4);

PREPARE select_game_by_id (INTEGER) AS
    SELECT * FROM game WHERE id = $1;

PREPARE select_all_games AS
    SELECT name, url, published_date, author FROM game;

PREPARE update_game_by_id (INTEGER, VARCHAR, VARCHAR, DATE, VARCHAR) AS
    UPDATE game SET name = $2, url = $3, published_date = $4, author = $5 WHERE id = $1;

PREPARE delete_game_by_id (INTEGER) AS
    DELETE FROM game WHERE id = $1;
