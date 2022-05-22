const putMethod = (req, res) => {}

const postMethod = (req, res) => {}

const deleteMethod = (req, res) => {}

const METHODS = {
  PUT: putMethod,
  POST: postMethod,
  DELETE: deleteMethod
}

export default function handler (req, res) {
  const { method } = req

  if (METHODS[method]) {
    METHODS[method](req, res)
  } else {
    res.status(405).send(`Method ${method} not allowed`)
  }
}
