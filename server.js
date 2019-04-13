var express = require('express'); //Sử dụng module express
var app = express(); 
var path = require('path'); //Module quản lý đường dẫn
var adminRouter = express.Router(); //Tạo Router cho admin
var apiRouter = express.Router(); //Tạo Router cho api

app.get ('/', function(req, res) { //Khi có request gửi đến root với method GET thì thực hiện function
    res.sendFile(path.join(__dirname + '/index.html')); // Trả về file /html
});

app.listen(3000); //Khởi động server ở port 3000
console.log('port 3000 is connected');

//TẠO ROUTER CHO ADMIN
adminRouter.get('/', function(req, res) { // Route đầu tiên đến url: localhost:3000/admin
    res.send('Here is the admin dashbroad');
})

adminRouter.get('/post', function(req, res) { //Trang post của admin
    res.send('every post here');
})

app.use('/admin', adminRouter); //Dùng /admin làm adminRouter

//TẠO ROUTER CHO API
apiRouter.get('/', function(req, res) {
    res.send('Welcome Api page');
})
apiRouter.get('/:name', function(req, res) { //Khi nhập url vào router api kèm tên, trả lại Hello + tên
    res.send('Hello ' + req.params.name);
})

app.use('/api', apiRouter);