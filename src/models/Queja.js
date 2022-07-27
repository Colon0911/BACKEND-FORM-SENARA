import mongoose from 'mongoose'



const { model, Schema } = mongoose

const quejaSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    dateNow: {
        type: Date,
        default: Date.now,
        required: true,
        trim: true
    },
    hourNow: {
        type: String,
        required: true,
        trim: true
    },
    tipoUsuario: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    lugar: {
        type: String,
        required: true,
        trim: true
    },
    nParcela: {
        type: String,
        required: true,
        trim: true
    },
    nToma: {
        type: String,
        required: true,
        trim: true
    },
    problematica: {
        type: String,
        required: true,
        trim: true
    },
    cuando: {
        type: String,
        required: true,
        trim: true
    },
    reportado: {
        type: String,
        required: true,
        trim: true
    },
    respInst: {
        type: String,
        required: true,
        trim: true
    },
    solucion: {
        type: String,
        required: true,
        trim: true
    },
    aporte: {
        type: String,
        required: true,
        trim: true
    },
    nombreQuejoso: {
        type: String,
        required: true,
        trim: true
    },
}, {
    versionKey: false
})

export default model("Queja", quejaSchema)