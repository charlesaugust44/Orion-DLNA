import {sql} from "@vercel/postgres";
import {promises as fs} from 'fs';
import path from "path";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  const configPath = path.join(process.cwd(), 'config.json');
  const data = await fs.readFile(configPath, 'utf8');
  const config = JSON.parse(data);

  if (req.headers['x-orion-api-key'] !== config.api_key) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    const body = req.body;

    if (!Array.isArray(body)) {
      res.status(400).send("Invalid input, expected an array of objects");
      return;
    }

    await sql`DELETE FROM dlna`;

    for (const item of body) {
      await sql`INSERT INTO dlna(title, filename, url, imdb_id, season, episode)
                VALUES (${item.title}, ${item.filename}, ${item.url}, ${item.imdb_id}, ${item.season}, ${item.episode})`;
    }

    res.status(200).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
