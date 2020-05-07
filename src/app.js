const path = require('path'),
      express = require('express'),
      hbs = require('hbs'),
      app = express(),
      port = process.env.PORT || '3000',
     forecast=require('../src/utils/forecast')
//paths
const static = path.join(__dirname,'../public'),
      dynamic = path.join(__dirname,'../templates/views'),
      partial = path.join(__dirname,'../templates/partails')
//setting hbs
app.set('view engine','hbs')
app.set('views',dynamic)
hbs.registerPartials(partial)

app.use(express.static(static))

app.get('',(req,res)=>{
    res.render('index',{})
})

app.get('/weather',(req,res)=>{
    let address = req.query.address
    if(!address){
        return res.send({error:'please write an address'})
    }
    let api = {}
   forecast(address,(e,{current,forecast,location,request,error})=>{
    if(!e){
       if(error != null){
           api = error 
           res.send(api)
       }else{
           api.current = current
           api.forecast = forecast
           api.location = location
           api.request = request
           res.send(api)
       }
    }else{
        res.send(e)
    }
   }) 
})



app.listen(port,()=>{
console.log('serever is up' + port)
})