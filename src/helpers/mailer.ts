// import Error from "next/error";
import nodemailer from "nodemailer"
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"


// send email

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        //try also "uuid" library for hash token generate
        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        if(emailType === "VERIFY") {
          await User.findByIdAndUpdate(userId,
            {
              verifyToken : hashedToken,
              verifyTokenExpiry : Date.now() + 3600000
            }
          )
        }else if(emailType === "RESET") {
          await User.findByIdAndUpdate(userId,
            {
              forgotPasswordToken : hashedToken,
              forgotPasswordTokenExpiry : Date.now() + 3600000
            }
          )
        }


        /*const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 465,
            secure: true, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });*/ 
          
          //chage it into this

          var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "7cce133c6cc5b2", //ye sab yahan nehi hona chayi he tha ,
              pass: "6e64d8f05cbf52"  //ye sab ko ".env" folder me hona chahiye 
            }
          });

          const HtmlInfo = 
          `<p>
              Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}" >here</a> to 
              ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
              or copy and paste the link below in your browser.<br>
              ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}
          </p>`;
                 

          const mailOptions = {
            from: 'sobhansahoo1976@gmail.com', // sender address
            to: email, //  kisko bhejraheho
            subject: emailType === 'VERIFY'  ? "verify your email" : 'Reset your password', // verifycation of email type
            html: HtmlInfo, // html body
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse

        }catch(error:any) {
            throw new Error(error.message)
    }
}