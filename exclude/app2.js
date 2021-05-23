import express from 'express'

// const app = express()

const router2 = express.Router()

router2.post('/users', (req,res) => {
    res.send('Hi 6000!')
    res.sendStatus(200)
})

export default router2