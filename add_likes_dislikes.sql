-- SQL para agregar columnas de likes y dislikes a la tabla post
ALTER TABLE post ADD COLUMN IF NOT EXISTS likes integer DEFAULT 0;
ALTER TABLE post ADD COLUMN IF NOT EXISTS dislikes integer DEFAULT 0;

-- SQL para crear la tabla user_post_vote para controlar los votos de cada usuario
CREATE TABLE IF NOT EXISTS user_post_vote (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    post_id INTEGER NOT NULL REFERENCES post(id) ON DELETE CASCADE,
    vote INTEGER NOT NULL, -- 1 para like, -1 para dislike
    UNIQUE(user_id, post_id)
);
