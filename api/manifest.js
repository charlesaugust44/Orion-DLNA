export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  res.status(200).send({
    "id": "org.charlesaugust44.dlnastream",
    "version": "1.0.0",
    "name": "DLNA Streamer",
    "description": "Streams files from a local DLNA server",
    "logo": "https://www.stremio.com/website/stremio-logo-small.png",
    "resources": [
      "stream"
    ],
    "types": [
      "movie",
      "series"
    ],
    "catalogs": []
  });
};
