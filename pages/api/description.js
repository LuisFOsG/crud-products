export default function handler (_req, res) {
  res.status(200).json({
    title: 'Drogueria Tecuras',
    description: 'Aplicación para la gestión de productos de droguería',
    image: 'https://picsum.photos/seed/random/500/400'
  })
}
