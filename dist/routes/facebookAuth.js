"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const APP_ID = process.env.APP_ID;
const APP_SECRET = process.env.APP_SECRET;
const FACEBOOK_REDIRECT_URI = process.env.FACEBOOK_REDIRECT_URI;
const facebookRouter = (0, express_1.Router)();
// Configure session middleware
facebookRouter.use((0, express_session_1.default)({
    secret: APP_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));
// Initialize Passport
facebookRouter.use(passport_1.default.initialize());
facebookRouter.use(passport_1.default.session());
// Configure Facebook strategy
passport_1.default.use(new passport_facebook_1.default.Strategy({
    clientID: APP_ID,
    clientSecret: APP_SECRET,
    callbackURL: FACEBOOK_REDIRECT_URI
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));
// Serialize user
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
// Deserialize user
passport_1.default.deserializeUser((obj, done) => {
    done(null, obj);
});
// Facebook authentication route
facebookRouter.get('/login', passport_1.default.authenticate('facebook'));
// Facebook authentication callback route
facebookRouter.get('/callback', passport_1.default.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    const user = req.user;
    const encodedUser = encodeURIComponent(JSON.stringify(user));
    res.redirect(`http://localhost:3000/profile?user=${encodedUser}`);
});
// Logout Route
facebookRouter.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.clearCookie('user');
        res.redirect('/login');
    });
});
exports.default = facebookRouter;
// http://localhost:8000/users/auth/facebook/login
