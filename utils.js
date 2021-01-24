import express from 'express';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export const isAdmin = (req, res, next) => {
    const cookies = cookie.parse(req.headers.cookie);
    console.log('cookies', cookies)
}

export const generateToken = async (user) => {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    })
};
export const IS_PROD = process.env.NODE_ENV === "production"
export const getCookieDomain = () => IS_PROD ? process.env.COOKIE_DOMAIN_PROD : "localhost";