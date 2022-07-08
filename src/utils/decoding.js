import jwt from 'jsonwebtoken'

export const getUserIdentification = req => {
	// const authHeader = req.get('Authorization')
	// const token = authHeader.replace('Bearer ', '')
	const res = jwt.decode(req)
	return res.identification
}
