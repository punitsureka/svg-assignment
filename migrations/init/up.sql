CREATE DATABASE simple_viral_games;

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
