const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const isPassportEnabled = process.env.PASSPORT_ENABLED === 'true'
const strategies = [
    {
        name: 'google',
        strategy: GoogleStrategy,
        options: {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
        },
        verify: (accessToken, refreshToken, profile, done) => {
            return done(null, profile)
        },
    },
]
// בדיקה אם Passport פעיל, ואז רישום אסטרטגיות
if (isPassportEnabled) {
    strategies.forEach(({ name, strategy, options, verify }) => {
        if (!options.clientID || !options.clientSecret) {
            console.error(`Missing credentials for ${name} strategy.`)
            return
        }
        passport.use(new strategy(options, verify))
    })
}
passport.serializeUser((user, done) => { done(null, user) })
passport.deserializeUser((user, done) => { done(null, user) })
module.exports = passport
