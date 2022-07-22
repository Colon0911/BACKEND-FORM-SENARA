import Solicitud from '../models/Solicitud.js'
import User from '../models/User.js'
import nodemailer from 'nodemailer'
import { solicitudPDF } from '../utils/solicitudPDF.js'

export const solicitudCreate = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(401).json({ msg: 'La informacion no existe' })
    }
    console.log('...')
    const solicitud = req.body
    const user = await User.find(
      { identification: solicitud.identification },
      { _id: 1, fullName: 1 }
    )
    const clonesolicitud = solicitud
    clonesolicitud['fullName'] = user[0].fullName

    delete solicitud.identification

    solicitud['userID'] = user[0]._id

    const newSolicitud = new Solicitud(solicitud)

    //await newSolicitud.save()

    enviarPDF(clonesolicitud)
    return res
      .status(200)
      .json({ msg: 'Formulario de solicitud registrado con exito!' })
  } catch (error) {
    return res.status(500).send({ msg: 'Error inesperado!' })
  }
}

export const enviarPDF = async (clonesolicitud) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'florian.kling@ethereal.email',
        pass: 'hw7htWfxTXURMhBm6b',
      },
    })

    let pdfOutput = await solicitudPDF(clonesolicitud)
    const message = await transporter.sendMail({
      from: 'greyson.moore11@ethereal.email',
      to: 'whtvr@gmail.com',
      subject: 'Solicitud de Riego',
      text: 'Aquí tienes tu solicitud de riego',
      html: `
					<img src='../img/logo_letra.png'>

			
				`,
      attachments: [{ path: pdfOutput }],
    })

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log('Ocurrio un error!' + err.message)
        return process.exit(1)
      }

      console.log('Mensaje enviado: %s', info.messageId)
      console.log('URL preview: %s', nodemailer.getTestMessageURL(info))
    })
  } catch (error) {
    console.log(error)
  }
}
