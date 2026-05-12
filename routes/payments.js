const express = require('express')
const router = express.Router()

const{
    createCheckoutSession
} = require('../controllers/payments')

router.post('/create-checkout-session', createCheckoutSession)

module.exports = router