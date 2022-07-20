import Solicitud from '../models/Solicitud.js'
import User from '../models/User.js'

export const solicitudCreate = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(401).json({ msg: 'La informacion no existe' })
    }
    console.log('...')
    const solicitud = req.body
    const user = await User.find(
      { identification: solicitud.identification },
      { _id: 1 }
    )

    delete solicitud.identification

    solicitud['userID'] = user[0]._id

    const newSolicitud = new Solicitud(solicitud)

    await newSolicitud.save()
    return res
      .status(200)
      .json({ msg: 'Formulario de solicitud registrado con exito!' })
  } catch (error) {
    return res.status(500).send({ msg: 'Error inesperado!' })
  }
}
