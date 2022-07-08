import app from './app.js'
import './database.js'

app.get('/', (req, res) => {
	res.send('Hallo Welt!')
})

app.listen(app.get('port'), app.get('host'))
console.log(`⚡️[server]`)
console.log(`Server is running at https://localhost:${app.get('port')}`)