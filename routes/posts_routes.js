const express = require('express')
const router = express.Router()
const db = require('../db')
const ensureLoggedIn = require('../middlewares/ensure_logged_in')
const upload = require('../middlewares/upload')

router.get('/new', ensureLoggedIn, (req, res) => {
    res.render('new_post')
})
router.post('/', ensureLoggedIn, upload.single('image_url'), (req, res) => {
    let content = req.body.content;
    let imageUrl = req.file.path;
    let videoUrl = req.body.video_url;
    let like = 0;
    let dislike = 0;
    const sql = `INSERT INTO posts (content, image_url, video_url, likes, dislikes, user_id) VALUES ($1,$2,$3,$4,$5,$6);`
    db.query(sql, [content,imageUrl, videoUrl, like, dislike, res.locals.user.id], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/')
    })
})
router.get('/mypage', ensureLoggedIn, (req, res) => {
    db.query(`SELECT posts.id as pid, * FROM posts INNER JOIN users on posts.user_id = users.id WHERE posts.user_id = '${res.locals.user.id}';`, (err, result) => {
        if(err) {
            console.log(err);
        }
        let posts = result.rows;
        console.log(posts)
        res.render('mypage', {posts: posts});
    })
})
router.get('/user/:id/post', (req, res) => {
    db.query(`SELECT posts.id as pid, * FROM posts INNER JOIN users on posts.user_id = users.id WHERE posts.user_id = '${req.params.id}';`, (err, result) => {
        if(err) {
            console.log(err);
        }
        let posts = result.rows;
        db.query(`SELECT users.username, users.id FROM users INNER JOIN posts on users.id = posts.user_id WHERE users.id = posts.user_id;`, (err, result2) => {
            if(err) {
                console.log(err);
            }
            let username = result2.rows[0];
            res.render('otheruser_page', {posts: posts, username: username});
        })
    })
})
router.delete('/:id', ensureLoggedIn, (req, res) => {
    const sql = `DELETE FROM posts WHERE id = ${req.params.id};`
    db.query(sql, (err, dbRes) => {
        if(err) {
            console.log(err);
        }
        res.redirect('/')
    })
})
router.get('/:id', (req, res) => {
    const sql = `SELECT * FROM users INNER JOIN posts on users.id = posts.user_id WHERE posts.id = $1;`
    const values = [req.params.id] //prevent sql injection
    console.log(values)
    db.query(sql, values, (err, dbRes) => {
        if(err) {
            console.log(err);
        }
        let post = dbRes.rows[0];
        res.render('show', {post});
    })
})
router.get('/:id/edit', (req, res) => {
    const sql = `SELECT * FROM posts WHERE id = $1`
    const values = [req.params.id] 
    db.query(sql, values, (err, dbRes) => {
        if(err) {
            console.log(err);
        }
            let post = dbRes.rows[0];
            res.render('edit_form', { post });
    })
})
router.put('/:id/edit', upload.single('image_url'), (req, res) => {
    const sql = `UPDATE posts SET content = $1, 
    image_url = $2, video_url = $3, comment = $4 WHERE id = $5;`
    const values = [req.body.content,req.file.path,req.body.video_url,req.body.comment,req.params.id]
    db.query(sql, values, (err, dbRes) => {
        if(err) {
            console.log(err);
        }
        res.redirect(`/posts/${req.params.id}`)
    })
})
router.put('/:id/like', ensureLoggedIn, (req, res) => {
    const sql = `UPDATE posts SET likes = likes + 1 WHERE id = $1;`
    const values = [req.params.id]
    db.query(sql, values, (err, dbRes) => {
        if(err) {
            console.log(err);
        }
        res.redirect('/')
    })
})
router.put('/:id/dislike', ensureLoggedIn, (req, res) => {
    const sql = `UPDATE posts SET dislikes = dislikes + 1 WHERE id = $1;`
    const values = [req.params.id]
    db.query(sql, values, (err, dbRes) => {
        if(err) {
            console.log(err);
        }
        res.redirect('/')
    })
})
router.put('/:id/comment', ensureLoggedIn, (req, res) => {
    const sql = `UPDATE posts SET comment = $1 WHERE id = $2;`
    const values = [req.body.comment,req.params.id]
    db.query(sql, values, (err, dbRes) => {
        if(err) {
            console.log(err);
        }
        res.redirect('/')
    })
})
module.exports = router