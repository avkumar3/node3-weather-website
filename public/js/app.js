console.log("client side javascript file")

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

// messageOne.textContent = "From JavaScript"

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    const location = search.value

    fetch('/weather?address=' + location + "'").then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                messageOne.textContent = data.error
            }
            else {
                console.log(data.location)
                console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
            console.log(data)
        })
    })

    console.log(location)
})


