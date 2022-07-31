import Queja from "../models/Queja.js"
import User from "../models/User.js";
import nodemailer from 'nodemailer'
import { PDFQuejas } from "../utils/PDFQuejas.js"
import config from "../config/config.js"

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const agregarQueja = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(401).json({ msg: "Información no suministrada!" })
        }
        const data = req.body
        const user = await User.find({ identification: data.identification}, { _id: 1, email: 1})

        data["userID"] = user[0]._id
        const newQueja = new Queja(data)
        await newQueja.save()
        enviarPDF(data, user[0].email)
        return res.status(200).json({ msg: "Queja registrada con exito!" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error Inesperado!" })
    }
}

const enviarPDF = async (data, email) => {
    try {
        const date = new Date().toLocaleDateString()
        let pdf = await PDFQuejas(data)
        const transporter = nodemailer.createTransport({
            host: config.EMAIL.HOST,
            port: 587,
            auth: {
                user: config.EMAIL.USER,
                pass: config.EMAIL.PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        const imgPath = path.join(__dirname, '../img/logo_letra.png')

        const message = await transporter.sendMail({
            from: config.EMAIL.USER,
            to: email,
            subject: "Formulario Quejas",
            text: "Formulario Quejas",
            html: `
                <img src="cid:logo_letra.png" />
                <p>Buenos días.</p>
                <p>De la presente forma se le adjunta una copia del formulario de quejas.</p>
                <p>Por favor no responder este correo.</p>      
            `,
            attachments: [
                { path: pdf, filename: `FormularioQuejas_${data.identification}_${date}.pdf`},
                {
                    filename: 'logo_letra.png',
                    path: imgPath,
                    cid: 'logo_letra.png'
                }
            ]
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
