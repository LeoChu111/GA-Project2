const express = require('express')
const router = express.Router()
const db = require('../db')
const ensureLoggedIn = require('../middlewares/ensure_logged_in')

router.get('/new', ensureLoggedIn, (req, res) => {
    res.render('new_post')
})
router.post('/', (req, res) => {
    let content = req.body.content;
    let imageUrl = req.body.image_url;
    let videoUrl = req.body.video_url;
    let like = 0;
    let dislike = 0;
    const sql = `INSERT INTO posts (content, image_url, video_url, likes, dislikes, user_email) VALUES ($1,$2,$3,$4,$5,$6);`
    db.query(sql, [content,imageUrl, videoUrl, like, dislike, req.session.email], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/')
    })
})
router.delete('/:id', (req, res) => {
    console.log(req.params)
    const sql = `DELETE FROM dishes WHERE id = ${req.params.id};`
    db.query(sql, (err, dbRes) => {
        if(err) {
            console.log(err);
        }
        res.redirect('/')
    })
})
router.get('/:id', (req, res) => {
    const sql = `SELECT * FROM posts WHERE id = $1`
    const values = [req.params.id] //prevent sql injection
    db.query(sql, values, (err, dbRes) => {
        if(err) {
            console.log(err);
        }
        let dish = dbRes.rows[0];
        res.render('show', {dish});
    })
})
router.get('/:id/edit', (req, res) => {
    const sql = `SELECT * FROM dishes WHERE id = $1`
    const values = [req.params.id] 
    db.query(sql, values, (err, dbRes) => {
        if(err) {
            console.log(err);
        }
            let dish = dbRes.rows[0];
            res.render('edit_form', { dish });
    })
})
router.put('/:id', (req, res) => {
    const sql = `UPDATE dishes SET title =  $1, 
    image_url = $2 WHERE id = $3;`
    const values = [req.body.title,req.body.image_url,req.params.id]
    db.query(sql, values, (err, dbRes) => {
        if(err) {
            console.log(err);
        }
        res.redirect(`/dishes/${req.params.id}`)
    })
})
module.exports = router