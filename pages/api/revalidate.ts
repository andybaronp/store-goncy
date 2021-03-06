import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  response: NextApiResponse
) {
  if (req.headers['x-secret'] === process.env.REVALIDATE) {
    console.log('validate')
    await response.unstable_revalidate('/')

    return response.json({ revalidate: true })
  }
  return response.status(401).end()
}
