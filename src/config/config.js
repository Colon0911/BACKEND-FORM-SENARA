import dotenv from 'dotenv'

dotenv.config()

export default {
	SECRET: process.env.SECRET || 'secrettoken',
	EXPIRES: {
		REGISTER: process.env.ONE || '90d',
		LOGIN: process.env.TWO || '3h'
	},
	MONGO_DATABASE: process.env.MONGO_DATABASE || 'testenBackend',
	MONGO_HOST: process.env.MONGO_HOST || 'localhost',
	PORT: process.env.PORT || 4000,
	FRONTEND: {
		URL: 'http://localhost:3000'
	}
}
