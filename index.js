var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var app = express();

/** DB setting **/
// 환경 변수에 저장된 값을 사용하여 mongoDB에 접속한다
mongoose.connect(process.env.MONGO_DB);
// mongoose의 db object를 가져와 db변수에 넣는다
var db = mongoose.connection;
// db가 성공적으로 연결된 경우 출력
db.once('open', function() {
  console.log("DB connected.");
});
// db 연결 중 에러가 있는 경우 출력
db.on('error', function(err) {
  console.log("DB ERROR : " + err);
});

app.set("view engine", 'ejs');
app.use(express.static(__dirname + "/public"));
// bodyParser로 stream의 form data를 req.body에 옮겨담는다
app.use(bodyParser.json()); // json data 분석
app.use(bodyParser.urlencoded({extended:true}));  // urlencoded data 분석
// _method의 query로 들어오는 값으로 http method 변경
app.use(methodOverride("_method"));

// Routes
app.use('/', require('./routes/home'));
app.use('/contacts', require('./routes/contacts'));

app.listen(3000, function() {
  console.log("server on");
});
