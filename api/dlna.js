import {sql} from "@vercel/postgres";
import {promises as fs} from 'fs';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  const data = await fs.readFile('config.json', 'utf8');
  const config = JSON.parse(data);

  if (req.headers['x-orion-api-key'] !== config['api-key']) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    const body = req.body;

    await sql`INSERT INTO dlna(name, filename, url, imdb_id)
              VALUES (${body.name}, ${body.filename}, ${body.url}, ${body.imdb_id})`;
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
