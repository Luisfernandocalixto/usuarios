const cors = require('cors');
const { SITE_URL, SITE_URL2, SITE_URL3 } = require('../config/variables');

const ACCEPTED_ORIGINS = [
    SITE_URL,
    SITE_URL2,
    SITE_URL3,
]

const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
    origin: (origin, callback) => {
        if (acceptedOrigins.includes(origin)) {
            return callback(null, true)
        }
        if (!origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed  by CORS'))
    }
})

module.exports = corsMiddleware;
