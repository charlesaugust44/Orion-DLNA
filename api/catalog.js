import {parse} from 'url';
import {sql} from "@vercel/postgres";

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
    const match = pathname.match(/^\/catalog\/(series|movie)\/([a-zA-Z0-9%]+)\.json$/);

    if (!match) {
        res.status(404).send('Not Found');
        return;
    }

    const type = match[1];
    const id = decodeURIComponent(match[2]);

    let result = null;

    if (type === 'movie') {
        result = await sql`SELECT imdb_id as id, title as name, 'movie' as type
                                 FROM dlna
                                 where season is null`;
    } else {
        result = await sql`SELECT distinct imdb_id as id, title as name, 'series' as type
                                 FROM dlna
                                 where season is not null`;
    }

    if (result.rows.length === 0) {
        res.status(404).send("NOT FOUND");
        return;
    }


    res.status(200).send({
        metas: result.rows
    });
};
