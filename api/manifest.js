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
    "logo": "https://orion-dlna.vercel.app/images/orion.png",
    "resources": [
      "stream",
      "catalog"
    ],
    "types": [
      "movie",
      "series"
    ],
    "catalogs": [
      {
        "type": "movie",
        "id": "orionmovie",
        "name": "Orion Movies"
      },
      {
        "type": "series",
        "id": "orionseries",
        "name": "Orion Series"
      }
    ]
  });
};
