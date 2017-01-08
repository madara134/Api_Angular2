

// đây là vùng import tất cả các modules bên ngoài
import * as express from 'express';
import * as body_parser from 'body-parser';


// khai báo app chính
let app = express();

// sử dụng các middleware
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept, Authorization');
  next();
});


// import router

import { CongTyRouter } from './routes/congty.router'
import { NNDRouter } from './routes/nhomnguoidung.router'
import { NDRouter } from './routes/Nguoidung.router'
import { ND_loginRouter } from './routes/Nguoidung_login.router'
import { AboutRouter } from './routes/about.router'
// sử dụng các router được định nghĩa từ các modules

// import router

app.use('/api', new CongTyRouter().GetRouter())
app.use('/api', new ND_loginRouter().GetRouter())
app.use('/api', new NNDRouter().GetRouter())
app.use('/api', new NDRouter().GetRouter())
app.use('/', new AboutRouter().GetRouter())
export default app;
