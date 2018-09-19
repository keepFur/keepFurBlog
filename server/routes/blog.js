var express = require('express');
var router = express.Router();

router.get('/get_blog_list', function (req, res, next) {
    res.send({
        total: 1000,
        rows: [{
            id: 1,
            createTime: new Date(),
            title: '12313',
            content_simple: 'asdadnasd',
            author: 'casdad'
        }, {
            id: 2,
            createTime: new Date(),
            title: '12313',
            content_simple: 'asdadnasd',
            author: 'casdad'
        }]
    });
});

module.exports = router;
