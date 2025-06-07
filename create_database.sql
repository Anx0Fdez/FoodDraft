-- SQL para crear la base de datos FoodDraft

CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE recipes (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    user_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE posts (
    id VARCHAR(36) PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR(36) NOT NULL,
    recipe_id VARCHAR(36),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

CREATE TABLE ingredients (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    info TEXT
);

CREATE TABLE recipe_ingredients (
    id VARCHAR(36) PRIMARY KEY,
    recipe_id VARCHAR(36) NOT NULL,
    ingredient_id VARCHAR(36) NOT NULL,
    quantity VARCHAR(50),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);
