import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */

export const extractUserData = (data) => {
  try {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      picturePath: data.picturePath,
      friends: data.friends,
      location: data.location,
      occupation: data.occupation,
    }
  } catch (error) {
    throw new Error(`Couldn't extract user data: ${error.message}`)
  }
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

export const createUser = async (userData, hashedPassword) => {
  try {
    const newUser = new User({
      ...userData,
      password: hashedPassword,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    return await newUser.save();
  } catch (error) {
    throw new Error(`Cannot create new user: ${error.message}`);
  }
}

export const register = async (req, res) => {
  try {
    const userData = extractUserData(req.body);
    const hashedPassword = await hashPassword(userData.password);
    const savedUser = await createUser(userData, hashedPassword);
   
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/* LOGGING IN */


export const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email: email });
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};


export const verifyPassword = async (inputPassword, storedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, storedPassword);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const generateAuthToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }
    
    const isMatch = await verifyPassword(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = generateAuthToken(user._id);
    delete user.password;    
    return res.status(200).json({ token, user });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}