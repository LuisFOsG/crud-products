const DATA = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988'
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984'
  },
  {
    id: 3,
    title: 'Ghostbusters 2.0',
    year: '1985'
  },
  {
    id: 4,
    title: 'Beetlejuice',
    year: '1988'
  },
  {
    id: 5,
    title: 'Ghostbusters',
    year: '1984'
  },
  {
    id: 6,
    title: 'Ghostbusters 2.0',
    year: '1985'
  },
  {
    id: 7,
    title: 'Beetlejuice',
    year: '1988'
  },
  {
    id: 8,
    title: 'Ghostbusters',
    year: '1984'
  },
  {
    id: 9,
    title: 'Ghostbusters 2.0',
    year: '1985'
  },
  {
    id: 10,
    title: 'Beetlejuice',
    year: '1988'
  },
  {
    id: 11,
    title: 'Ghostbusters',
    year: '1984'
  },
  {
    id: 12,
    title: 'Ghostbusters 2.0',
    year: '1985'
  }
]

export default function handler (req, res) {
  res.status(200).json(DATA)
}
