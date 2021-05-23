import router2 from './app2'
import express from 'express'

const app2 = express()

app2.use("/2", router2)

app2.listen(6000, () => console.log('listening on 6000'))

export default app2