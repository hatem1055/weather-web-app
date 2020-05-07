//form dom variabls
let form = document.getElementById('searchForm'),
    input = document.getElementById('searchFormInput'),
    //alert message dom variabls
    alertMessage = document.getElementById('alertMessage'),
    alertDiv = document.getElementById('alertDiv'),
    alertCloser = document.getElementById('alertCloser')
    //info dom variabls
    windSpeed = document.getElementById('windSpeed'),
    humidty = document.getElementById('humidty'),
    visibilty = document.getElementById('visibilty'),
    pressure = document.getElementById('pressure'),
    //main dom variabls
    temp = document.getElementById('temp'),
    tempLow = document.getElementById('tempLow'),
    tempHigh = document.getElementById('tempHigh'),
    feelsLike = document.getElementById('feelsLike'),
    desc = document.getElementById('desc'),
    loading = document.getElementById('loadingScreen')
    // stateImg = document.getElementById('stateImg')

alertCloser.onclick = function(){
    alertDiv.style.display = 'none'
}
fetch(`http://192.168.1.7:3000/weather?address=cairo`).then((r)=>{
r.json().then((data)=>{
    if(data.error){
        alert()
        alertDiv.style.display = 'block'
        alertMessage = 'we cant find this address try another one'
    }else{
    //setting info
    windSpeed.innerText = data.current.wind_speed
    pressure.innerText = data.current.pressure
    visibilty.innerText = data.current.visibility
    humidty.innerText = data.current.humidity
    //main info
    // stateImg.src = data.current.weather_icons[0]
    desc.innerText = data.current.weather_descriptions[0]
    tempLow.innerText = data.forecast[Object.keys( data.forecast)[0]].mintemp
    tempHigh.innerText = data.forecast[Object.keys( data.forecast)[0]].maxtemp
    feelsLike.innerText = data.current.feelslike
    temp.innerText = data.current.temperature
    input.value = data.request.query
    loading.style.animation = 'fade 3s'
    loading.style.display = 'none'
    } 
})
})
form.addEventListener('submit',(e)=>{
e.preventDefault()
fetch(`http://192.168.1.7:3000/weather?address=${input.value}`,{
}).then((r)=>{
r.json().then((data)=>{
    if(data.error){
        alertDiv.style.display = 'block'
        alertMessage.innerText = 'we cant find this address try another one'
    }else{
    //setting info
    windSpeed.innerText = data.current.wind_speed
    pressure.innerText = data.current.pressure
    visibilty.innerText = data.current.visibility
    humidty.innerText = data.current.humidity
    //main info
    // stateImg.src = data.current.weather_icons0]
    desc.innerText = data.current.weather_descriptions[0]
    tempLow.innerText = data.forecast[Object.keys(data.forecast)[0]].mintemp
    tempHigh.innerText = data.forecast[Object.keys(data.forecast)[0]].maxtemp
    feelsLike.innerText = data.current.feelslike
    temp.innerText = data.current.temperature
    input.value = data.request.query
    }
})
})
})

