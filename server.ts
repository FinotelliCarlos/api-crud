import { app } from './src/app'

const PORT = process.env.PORT || 5050

app.listen(PORT, () => {
  console.log(`Server it's running in PORT: http://localhost:${PORT}`)
})
