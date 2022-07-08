const whitelist = [process.env.FRONTEND_URL, 'http://localhost:4000']

export const options = {
	origin: (origin, cb) => {
		const exist = whitelist.some(domain => domain === origin)
		if (exist) cb(null, true)
		cb(new Error('NO permitido por CORS!'))
	}
}
