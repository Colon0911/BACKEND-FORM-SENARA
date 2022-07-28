import jwt from 'jsonwebtoken'

export const getUserIdentification = req => {
	const res = jwt.decode(req)
	return res.identification
}
