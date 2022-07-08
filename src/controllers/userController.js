import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

import User from "../models/User.js"
import config from "../config/config.js"
import { getUserIdentification } from "../utils/decoding.js"

// Create token to authenticate
const createToken = (user, time) => {
    return jwt.sign({ identification: user.identification, fullName: user.fullName },
        config.SECRET, { expiresIn: time }
    )
}

// Register New User
export const register = async (req, res) => {
    const { identification, email } = req.body
    try {
        const queryUser = await User.find(
            { $or: [{ identification: identification }, { email: email }] },
            { identification: 1, email: 1, _id: 0 }
        )

        const userExist = queryUser.map((e) => e.identification).some((e) => e === identification)
        const emailExist = queryUser.map((e) => e.email).some((e) => e === email)

        if (userExist && emailExist) {
            return res.status(400).json({ msg: "Tanto identificación como email existen!" })
        }

        if (userExist) return res.status(400).json({ msg: "El usuario ya existe!" })
        if (emailExist) return res.status(400).json({ msg: "El email ya existe!" })

        const token = createToken(req.body, config.EXPIRES.REGISTER)
        const user = { ...req.body, token }
        const newUser = new User(user)
        await newUser.save()
        return res.status(200).json({ msg: "Usuario registrado con exito!" })
    } catch (error) {
        return res.status(500).send({ msg: "Error inesperado!" })
    }
}

// Login User
export const login = async (req, res) => {
    const { emailOrUser, password } = req.body

    try {
        let user = {}

        const userByEmail = await User.findOne({ email: emailOrUser })

        if (!userByEmail) {
            const userByUser = await User.findOne({ userName: emailOrUser })
            if (userByUser) {
                user = userByUser
            }
        } else {
            user = userByEmail
        }

        if (!user) {
            return res.status(401).json({ msg: "Este usuario o correo no fue encontrado" })
        }

        const isMatch = await user.comparePassword(password)

        if (isMatch) {
            const token = createToken(user, config.EXPIRES.LOGIN)
            return res.status(200).json({ token: token })
        }

        return res.status(401).json({ msg: "Contraseña incorrecta!" })
    } catch (error) {
        return res.status(500).json({ msg: "Error Inesperado!" })
    }
}

// Get User Info
export const getUser = async (req, res) => {
    const userData = await User.find(
        { identification: req.params.id },
        { _id: 0, genre: 0, identification: 0, identificationType: 0, token: 0 }
    )

    if (userData) {
        return res.status(200).json(userData)
    }

    return res.status(401).json({ msg: "Error Inesperado!" })
}

// Update User Profile
export const updateUser = async (req, res) => {
    const { id } = req.params
    try {
        if (!id) {
            return res.status(401).json({ msg: "ID no suministrado!" })
        }

        if (!req.body) {
            return res.status(401).json({ msg: "Información a actualizar no suministrada!" })
        }

        const user = await User.findByIdAndUpdate({ identification: req.params.id }, req.body, { new: true })

        if (user) {
            return res.status(200).json({ msg: "Perfil Actualizado!" })
        }

        return res.status(401).json({ msg: "No se actualizó el perfil!" })
    } catch (error) {
        return res.status(500).json({ msg: "Error Inesperado!" })
    }
}

// Check if email exist and send email
export const validateEmail = async (req, res) => {
    const { email } = req.body
    try {
        if (!email) {
            return res.status(401).json({ msg: "Por favor ingrese un correo!" })
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(401).json({ msg: "El correo no existe!" })
        }

        const token = createToken(user, config.EXPIRES.LOGIN)
        const newToken = token.replaceAll('.', '%2E')

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: "waylon.jones55@ethereal.email",
                pass: "3F8HYuGBQ6P6Pd5tye",
            },
        })

        const message = await transporter.sendMail({
            from: "greyson.moore11@ethereal.email",
            to: "whtvr@gmail.com",
            subject: "Reset Password",
            text: "Tu contraseña se cambiará!",
            html: `
					<b> Esto es HTML </b>
					<a href="${config.FRONTEND.URL}/reset-password/${newToken}"> Restablecer Contraseña </a> 
				`,
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
        return res.status(500).json({ msg: "Error inesperado!" })
    }
}

// Update User Password
export const changePassword = async (req, res) => {
    const { password } = req.body
    try {
        if (!password) {
            return res.status(401).json({ msg: "Por favor ingrese una contraseña!" })
        }
        const identification = getUserIdentification(req.params.token)
        const user = await User.findOneAndUpdate(
            { identification: identification },
            { password: password },
            { new: true }
        )

        if (user) {
            return res.status(200).json({ msg: "Actualización exitosa!" })
        }

        return res.status(401).json({ msg: "No se actualizo la contraseña!" })
    } catch (error) {
        return res.status(500).json({ msg: "Error inesperado!" })
    }
}