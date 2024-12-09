const fullname = document.getElementById('fullname')
const email = document.getElementById('email')
const message = document.getElementById('message')
const form = document.getElementById('form')
const errorMsg = document.getElementById('error')
const success = document.getElementById('success')
const btn = document.getElementById('btn')

// const BASEURL = 'http://localhost:3000';
const BASEURL = 'https://emailsubs.vercel.app/';
let isLoading = false;

form.addEventListener('submit', async(e) => {
    success.classList.add('hidden');
    errorMsg.classList.add('hidden');
    isLoading = true
    if(isLoading){
     btn.setAttribute('disabled', true);
     btn.innerText = 'Subscribing....'
    }
   e.preventDefault();
   const newUser = {
    fullname: fullname.value,
    email: email.value,
    message: message.value
   }
   try {
    const response = await axios.post(`${BASEURL}/api/v1/email/subscribe`, newUser)
    console.log(response.data);
    success.classList.remove('hidden');
    success.innerText = `Successfully you subscribed the channel. We've sent an email ${email.value}`

   } catch (error) {
     console.log("Catch Error: ", error.message);
     errorMsg.classList.remove('hidden');
     errorMsg.innerText = error.response.data.error
   } finally{
    isLoading = false
    if(!isLoading){
        btn.removeAttribute('disabled');
        btn.innerText = 'Subscribe'
       }
   }
})