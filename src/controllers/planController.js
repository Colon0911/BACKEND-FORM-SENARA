import Plan from "../models/Plan.js"
import User from '../models/User.js'

// Register New Plan
export const addPlanRiego = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(401).json({ msg: "Información a agregar no suministrada!" })
        }

        const data = req.body
        const user = await User.find(
            { identification: data.identification },
            { _id: 1 }
        )

        delete data.identification
        data['userID'] = user[0]._id
        const newPlan = new Plan(req.body)
        await newPlan.save()
        return res.status(200).json({ msg: "Plan Riego registrado con exito!" })
    } catch (error) {
        return res.status(500).send({ msg: "Error inesperado!" })
    }
}