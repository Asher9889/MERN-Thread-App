import jwt from "jsonwebtoken";

function generateTokenAndSetCookie(user_id, res) {
  // creating jwt token
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  // setting jwt token into browser cookie storage
  return res.cookie("token", token, {
    httpOnly: true, // now it only accessable by httprequest not using browser. it make cookie more secure
    maxAge: 7 * 24 * 60 * 60 * 1000 , // 7days hour expiration for the cookie. 1000 for converting into miliseconds
    secure: true
  });

  // return token;
}

export default generateTokenAndSetCookie;

