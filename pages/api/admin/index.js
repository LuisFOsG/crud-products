import bcrypt from 'bcryptjs'

export default async function handler (req, res) {
  const { password } = req.body

  const result = await bcrypt.compare(password, process.env.ADMIN_PASSWORD)

  if (result) {
    res.status(200).json({
      message: 'Login correcto'
    })
  } else {
    res.status(401).send('Usuario o contraseña incorrectos')
  }
}
