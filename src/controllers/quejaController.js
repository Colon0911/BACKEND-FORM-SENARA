import Queja from "../models/Queja.js"
import User from "../models/User.js";
import nodemailer from 'nodemailer'
import { PDFQuejas } from "../utils/PDFQuejas.js"

export const agregarQueja = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(401).json({ msg: "Información no suministrada!" })
        }
        const data = req.body
        const user = await User.find({ identification: data.identification })
        delete data.identification
        data["userID"] = user[0]._id
        const newQueja = new Queja(req.body)
        await newQueja.save()
        enviarPDF()
        return res.status(200).json({ msg: "Queja registrada con exito!" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error Inesperado!" })
    }
}

const enviarPDF = async () => {
    try {
        console.log("...")
        let pdf = await PDFQuejas()
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: "milo58@ethereal.email",
                pass: "E3nAMQfJFd6ZMDX8Ek",
            },
        })

        const message = await transporter.sendMail({
            from: "greyson.moore11@ethereal.email",
            to: "whtvr@gmail.com",
            subject: "Reset Password",
            text: "Tu contraseña se cambiará!",
            html: `
					<b> Esto es HTML </b>
					
				`,
            attachments: [{ path: pdf }]
        })

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log("Ocurrio un error!" + err.message);
                return process.exit(1)
            }

            console.log("Mensaje enviado: %s", info.messageId)
            console.log("URL preview: %s", nodemailer.getTestMessageURL(info))
        })
    } catch (error) {
        console.log(error)
    }
}
