const express = require('express');
const routerApi = require('./routes')
const cors = require('cors')
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')

const app = express();
const port = 3000;

app.use(express.json())

const whitelist = ['http://localhost:8080', 'https://myapp.co']
const options = {
  origin: (origin, callback)=>{
    if (whitelist.includes(origin)){
      callback(null, true)
    }else {
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors(options));

app.get('/', (req, res)=>{
  res.send('Hola, este es mi server en express!')
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);


app.listen(port, ()=>{
  console.log('server running at http://localhost:'+port)

})
