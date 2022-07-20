import Queja from "../models/Queja.js"
import User from "../models/User.js";

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
        return res.status(200).json({ msg: "Queja registrada con exito!" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error Inesperado!" })
    }
}
