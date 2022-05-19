// kon perticular user a kon perticular tour create koreche seta determined  korar jonno  ei middleware

import jwt from 'jsonwebtoken'
import UserModel from '../models/user.js'
const secret = 'test'

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] //frontend theke j token ta patabe tar 1 no index ta nibe
    const isCustomAuth = token.length < 500 // token ta custom kina chewck korbe. karon google j token generate kore setar length 500 theke beshi hoi
    let decodedData
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret)
      req.userId = decodedData?.id
    } else {
      decodedData = jwt.decode(token)
      const googleId = decodedData?.sub.toString()
      const user = await UserModel.fineOne({ googleId })
      req.userId = user?._id
    }
    next()
  } catch (error) {
    console.log(error)
  }
}

export default auth
