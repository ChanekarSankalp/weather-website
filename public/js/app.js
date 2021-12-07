console.log('chalra hai boss.')



const weatherForm = document.querySelector('Form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messsageOne.textContent = ''
//messsageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageTwo.textContent = 'Error'
            }
            else{
                messageTwo.textContent = 'Temperature : ' + data.temperature + ' degree celsius'
            }
        })
    })

    console.log('testing!')
})