import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../models/Users.js'

export const register = async (req, res) => {
try {
    const {firstName, lastName, email, password, picturePath, friends, location, occupation} = req.body
} catch (error) {
    console.log(error);
}
}