
//const fetch = require('node-fetch')

console.log("Client side loaded")
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')




weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = search.value
    message1.textContent = 'Loading...'
    message2.textContent  =  ''
    
    fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            // console.log(data.error)

            message1.textContent = data.error
            message2.textContent = ''
        }
        else {
            message1.textContent = data.location
            message2.textContent = data.forecast
            // console.log(data.location)
            // console.log(data.forecast)
        }
    })
})

}) 
