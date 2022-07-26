import path from 'path'
import { fileURLToPath } from 'url'

import nodemailer from "nodemailer"

import Plan from "../models/Plan.js"
import User from '../models/User.js'
import { createPDF } from '../utils/PDFPlanRiego.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const enviarPDF = async (data) => {
    try {
        // if (!req.body) {
        //     return res.status(401).json({ msg: "Información no suministrada!" })
        // }

        let pdf = await createPDF(data)

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: "cristobal.hyatt@ethereal.email",
                pass: "7P1fGZ6mzzArXWmUgb",
            },
        })

        const imgPath = path.join(__dirname, '../img/logo_letra.png')

        const message = await transporter.sendMail({
            from: "greyson.moore11@ethereal.email",
            to: "whtvr@gmail.com",
            subject: "Probando PDF",
            text: "Tu contraseña se cambiará!",
            html: `
                <img src="cid:logo_letra.png" />  
            `,
            attachments: [
                { path: pdf },
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

// Register New Plan
export const addPlanRiego = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(401).json({ msg: "Información a agregar no suministrada!" })
        }

        const data = req.body
        const user = await User.find(
            { identification: data.identification },
            { _id: 1, fullName: 1 }
        )

        delete data.identification
        data['userID'] = user[0]._id
        // const newPlan = new Plan(req.body)

        enviarPDF('asd')
        // await newPlan.save()

        return res.status(200).json({ msg: "Plan Riego registrado con exito!" })
    } catch (error) {
        return res.status(500).send({ msg: "Error inesperado!" })
    }
}
