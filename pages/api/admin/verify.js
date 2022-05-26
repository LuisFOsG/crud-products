import jwt from 'jsonwebtoken'

export default function handler (req, res) {
  const { token } = req.body

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET)
    console.log(decoded)

    res.status(200).json({
      status: 'success',
      data: {
        token
      }
    })
  } catch (error) {
    res.status(401).json({
      status: 'error',
      error: 'Token inválido'
    })
  }
}
