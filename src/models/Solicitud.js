import mongoose from 'mongoose'

const { model, Schema } = mongoose

const solicitudSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    trim: true,
  },

  nParcela: {
    type: String,
    required: true,
    trim: true,
  },
  proyecto: {
    type: String,
    required: true,
    trim: true,
  },
  subDistrito: {
    type: String,
    required: true,
    trim: true,
  },
  area: {
    type: String,
    required: true,
    trim: true,
  },
  cultivo: {
    type: String,
    required: true,
    trim: true,
  },
  variedad: {
    type: String,
    required: true,
    trim: true,
  },
  rendimientoAnterior: {
    type: String,
    trim: true,
  },
  fechaReciboRiego: {
    type: Date,
    required: true,
  },
  fax: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  observaciones: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  exactAddress: {
    type: String,
    required: true,
    trim: true,
  },
})
export default model('Solicitud', solicitudSchema)
