CREATE TABLE user_avatar (
                             user_id      INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
                             content_type VARCHAR(50) NOT NULL,
                             data         BYTEA       NOT NULL,
                             updated_at   TIMESTAMPTZ NOT NULL
);