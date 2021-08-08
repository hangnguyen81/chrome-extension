const authorInfo = document.getElementById('author-info')
const dateTime = document.getElementById('datetime')
const crypto = document.getElementById('crypto')
const weather = document.getElementById('weather')

// display date and time of current day
function getCurrentTime(){
    const today = new Date()
    const days = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday')
    const currentDay = days[today.getDay()]
    const months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')
    const currentMonth = months[today.getMonth()]
    const currentTime = today.toLocaleTimeString("en-us", {timeStyle: "short"})
    dateTime.innerHTML = `
        ${currentDay}, ${today.getDate()} ${currentMonth} ${today.getFullYear()}
        <br/>
        <span> ${currentTime} </span>
        `
}
setInterval(getCurrentTime, 1000)

// background picture, from Unsplash APIs
fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
    .then(res => res.json()) 
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        authorInfo.innerHTML = `Copyright<i class="fas fa-at"></i>${data.user.name}`
    })
    .catch(err =>{
        // default background
        document.body.style.backgroundImage = url('https://images.unsplash.com/photo-1523712999610-f7…Hx8fHx8fDE2MjgyNzgxNTI&ixlib=rb-1.2.1&q=80&w=1080')
        authorInfo.innerHTML = `Copyright<i class="fas fa-at"></i>Johannes Plenio`
    })

// Crypto currency
fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
    .then(res => res.json())
    .then(data =>{
        crypto.innerHTML = `
            <img src=${data.image.small}>
            <span>${data.name} </span>
            <p>Current price: $${data.market_data.current_price.usd}</p>
            <p>24-hour high price: $${data.market_data.high_24h.usd}</p>
            <p>24-hour low price: $${data.market_data.low_24h.usd}</p>
            `   
        })
    .catch(err =>
        crypto.innerHTML = 'Crypto currency'
        )

//weather, for now using location of Vantaa, Finland
const lat = 60.29414 
const lon = 25.04099
fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`)
        .then(res =>{
            if (!res.ok)
                throw Error("Weather is not available")
            return res.json()
        })
        .then(data =>{
            console.log(data)
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            let weatherHtml = `
                <img src=${iconUrl} />
                <p>Temp: ${data.main.temp}<sup>o</sup>C - Feels like:${data.main.feels_like}<sup>o</sup>C</p>
                <p>Location: ${data.name}, ${data.sys.country}</p>
            `
            weather.innerHTML = weatherHtml
        })
        .catch(err => console.log(Error))
