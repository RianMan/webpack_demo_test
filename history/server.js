let express = require('express');
let app = express();

app.get('/api/user',(req, res) => {
    res.json({name:'hello world'})
})

app.listen(9100)