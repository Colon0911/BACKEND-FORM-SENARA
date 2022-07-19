import Plan from "../models/Plan.js"

// import { getUserIdentification } from "../utils/decoding.js"

// Register New Plan
export const addPlanRiego = async (req, res) => {
    console.log('...')
    try {
        if (!req.body) {
            return res.status(401).json({ msg: "Información a agregar no suministrada!" })
        }

        const newPlan = new Plan(req.body)
        console.log(newPlan)
        // await newPlan.save()
        return res.status(200).json({ msg: "Plan Riego registrado con exito!" })
    } catch (error) {
        return res.status(500).send({ msg: "Error inesperado!" })
    }
}