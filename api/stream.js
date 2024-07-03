import {parse} from 'url';
import {sql} from "@vercel/postgres";
//TODO: Add catalogue support, change icon and banner
/**
 * @param {IncomingMessage} req
 * @param res
 * @returns {Promise<void>}
 */
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    const {pathname} = parse(req.url, true);
    const match = pathname.match(/^\/stream\/(series|movie)\/([a-zA-Z0-9%]+)\.json$/);

    if (!match) {
        res.status(404).send('Not Found');
        return;
    }

    const type = match[1];
    const decodedId = decodeURIComponent(match[2]);
    const id = decodedId.split(':')[0];
    const season = parseInt(decodedId.split(':')[1]) ?? null;
    const episode = parseInt(decodedId.split(':')[2]) ?? null;

    let result = null;
console.log(match);
    if (type === 'movie') {
        result = await sql`SELECT title, url, filename
                                 FROM dlna
                                 where imdb_id = ${id}`;
    } else {
        result = await sql`SELECT title, url, filename
                                 FROM dlna
                                 where imdb_id = ${id}
                                   and season = ${season}
                                   and episode = ${episode}`;
    }

    if (result.rows.length === 0) {
        res.status(404).send("NOT FOUND");
        return;
    }

    let response = {streams: []};

    result.rows.forEach(v => {
        let title = `${v.title}\n${v.filename}`;

        if (type === 'series') {
            title = `${v.title} S${season}E${episode}\n${v.filename}`;
        }

        response.streams.push({
            name: 'ORION',
            title: title,
            url: v.url,
        });
    })

    res.status(200).send(response);
};
