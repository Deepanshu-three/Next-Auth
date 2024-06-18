import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'

export const sendEmail = async({email, emailType, userId} : any) => {

    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if(emailType === "VERIFY"){

            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}
            ) 

        }else if(emailType === "RESET"){

            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000}
            ) 

        }

        var transport = nodemailer.createTransport({

            host: "sandbox.smtp.mailtrap.io",
          
            port: 2525,
          
            auth: { 
          
              user: "209100d2945be1",
          
              pass: "aa1b7432721461"
          
            }
          
          });


        const mailOptions = {
            from: 'abc@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
                emailType === "VERIFY" ? "Verify your email" : "reset your password"
            } or copy the link in the browser.
            <br>
            "${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
        }

        const mailResponse = await transport.sendMail(mailOptions)
        
        return mailResponse

    } catch (error: any) {

        throw new Error(error.message)

    }

}

