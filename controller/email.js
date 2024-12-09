const nodemailer = require("nodemailer");
const path = require("path");
const User  = require("../models/users");

const logo_path = path.join(__dirname, 'logo.png');

const sendEmail = async(req, res) => {
    const { fullname, email, message } = req.body;
   try{

    if(!fullname || !email || !message){
        return res.status(400).json({error: "Fullname, Email and Message are required fields"})
    }

    const htmlTemplate = `
     <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>template</title>
    <style>
       .bgColor{
        background: #131010;
        padding: 2rem;
        display: flex; 
        justify-content: center;
        align-items: center;
       }
       .main{
        max-width: 550px;
        min-width: 230px;
        background: #a8a8a8;
        border-radius: 12px;
        padding: 10px;
        margin: 1rem 10px;
       }
       .image{
        text-align: center;
       }
       .image img{
        width: 120px;
        height: 90px;
        width: 90px;
        height: 90px;
        border-radius: 100%;
       }
       .content{
        text-align: center;
       }
       p{
        font-size: 17px;
        font-weight: bold;
        font-family: Georgia, 'Times New Roman', Times, serif;
       }
       .msg{
        background-color: whitesmoke;
        padding: 10px;
        border-radius: 10px;
        text-align: left;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 500;
       }
       button{
        background-color: red;
        color: white;
        border-radius: 10px;
        padding: 10px 10px;
        border: none;
        margin: 1rem;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
       }
    </style>
</head>
 <body class="bgColor">
    <div class="main">
        <div class="image">
        <img src="cid:logo" alt="logo">
        </div>
        <div class="content">
            <h1>Hello 👋 ${fullname}</h1>
             <p>Thanks 🙏 for subscribing Undefined Programming 😃</p>
             <p>This is what I've gotten from you.</p>
             <div class="msg">
                ${message}
             </div>
             <a href="https://www.youtube.com/@pgrabhilash24"><button>Go to my channel</button></a>
        </div>
    </div>
</body>
</html>
    `

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASS,
        },
      });

      const sendOptions = {
          from: '"Undefined Programming 👻" <pgrabhilash@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "Message from Undefined Programming", // Subject line
          html: htmlTemplate, // html body
          attachments: [
            {
                filename: 'logo.png',
                path: logo_path,
                cid: 'logo'
            }
          ]

        }
    await transporter.sendMail(sendOptions, async(error, info) => {
        if(error){ 
            console.log(error)
            return res.status(400).json({ error: error.message})
        }
        console.log("Message sent: %s", info.messageId);
         const user = await User.create({
            fullname,
            email,
            message
         })
        res.status(201).json(user);
    });

   } catch(error) {
    console.log(error.message);
    res.status(400).json({error: error.message});
   }
}

module.exports = sendEmail