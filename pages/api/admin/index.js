import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export default async function handler (req, res) {
  const { username, password } = req.body

  const result = await bcrypt.compare(password, process.env.ADMIN_PASSWORD)

  if (result && username === process.env.ADMIN_USERNAME) {
    const sesionjwt = jwt.sign({ username }, process.env.ADMIN_JWT_SECRET, { expiresIn: '1h' })

    res.status(200).json({
      status: 'success',
      data: {
        token: sesionjwt
      }
    })
  } else {
    res.status(401).json({
      status: 'error',
      error: 'Usuario o contraseña incorrectos'
    })
  }
}
