import mongoose from 'mongoose'

const { model, Schema } = mongoose

const planSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    standardNumber: {
        type: Number,
        required: true,
        trim: true
    },
    subDistrict: {
        type: Number,
        required: true,
        trim: true
    },
    hydraulicSector: {
        type: Number,
        required: true,
        trim: true
    },
    irrigableSurface: {
        type: Number,
        required: true,
        trim: true
    },
    dateNow: {
        type: Date,
        default: Date.now,
        required: true,
        trim: true
    },
    crops: {
        type: Array,
        crop: [{
            cultivo: String,
            toma: Number,
            area: Number,
            fecha: Date
        }],
        required: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    exactAddress: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
}, {
    versionKey: false
})

export default model('Plan', planSchema)