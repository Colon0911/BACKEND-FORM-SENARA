import Queja from "../models/Queja.js"


export const agregarQueja = async (req, res) => {
    console.log("...")
    try {
        if (!req.body) {
            return res.status(401).json({ msg: "Información no suministrada!" })
        }
        const newQueja = new Queja(req.body)
        console.log(newQueja)
        // await newQueja.save()
        return res.status(200).json({ msg: "Queja registrada con exito!" })
    } catch (error) {
        return res.status(500).json({ msg: "Error Inesperado!" })
    }
}
