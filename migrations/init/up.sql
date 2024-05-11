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
    SELECT id, name, url, published_date, author FROM game WHERE id = $1 and is_deleted = false;

PREPARE select_all_games AS
    SELECT id, name, url, published_date, author FROM game WHERE is_deleted = false;

PREPARE update_game_by_id (INTEGER, VARCHAR, VARCHAR, DATE, VARCHAR) AS
    UPDATE game SET name = $2, url = $3, published_date = $4, author = $5, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1 and is_deleted = false;

PREPARE delete_game_by_id (INTEGER) AS
    UPDATE game SET is_deleted = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1 and is_deleted = false;
