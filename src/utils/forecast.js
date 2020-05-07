const req = require('request')
const url = city =>`http://api.weatherstack.com/forecast?access_key=5cc604850487b155f2128a47264c60d9&query=${encodeURIComponent(city)}` 

//the request fuction
let forecast = (address,fn) =>{
   req({url:url(address),json:true},(e,r)=>{
      if(!e){
         let respond = {}
         if(r.body.error){
            respond.error = r.body
            fn(e,respond)
         }else{
            const {request,location,current,forecast} = r.body
            respond.request = request
            respond.current = current
            respond.forecast = forecast
            respond.location = location
            fn(e,respond)
         }
      }else{
         fn(e,{})
      }
})
}

module.exports = forecast