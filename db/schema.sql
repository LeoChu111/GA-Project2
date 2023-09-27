CREATE DATABASE goodfoodhunting;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    content TEXT,
    image_url TEXT,
    video_url TEXT,
    likes INTEGER,
    dislikes INTEGER,
    comment TEXT,
    user_id INTEGER NOT NULL
);
ALTER TABLE table_name ADD COLUMN column_name INTEGER NOT NULL;
update dishes set user_id = 1;
INSERT INTO posts (content, image_url, user_id) 
VALUES ('cake', 'https://stylesweet.com/wp-content/uploads/2022/06/ChocolateCakeForTwo_Featured.jpg', 1),
('pasta', 'https://www.allrecipes.com/thmb/5SdUVhHTMs-rta5sOblJESXThEE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11691-tomato-and-garlic-pasta-ddmfs-3x4-1-bf607984a23541f4ad936b33b22c9074.jpg',1);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    username TEXT,
    password_digest TEXT
);
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT,
    post_id INTEGER
);

INSERT INTO users (email) VALUES ('leo@gmail.com');