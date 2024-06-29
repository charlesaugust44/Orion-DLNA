<?php

// Set content type for JSON
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
//header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
file_put_contents("log.txt", $_SERVER['REQUEST_URI'] . " - " . $_SERVER['REQUEST_METHOD'], FILE_APPEND);
// Function to handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 201 OK");
    exit();
}


if ($_SERVER['REQUEST_URI'] === '/manifest.json' || $_SERVER['REQUEST_URI'] === '/') {
    readfile('manifest-addon.json');
    exit();
}

// Route for /stream/:type(series|movies)/:id([a-zA-Z0-9%]+).json
if (preg_match('#^/stream/(series|movies)/([a-zA-Z0-9%]+)\.json$#', $_SERVER['REQUEST_URI'], $matches)) {
    $type = $matches[1];
    $id = $matches[2];

    // Example response data (adjust as needed)
    $response = [
        'streams' => [
            [
                'name' => 'ORION',
                'title' => 'Snowpiercer.S01E08.720p.WEB-DL.DUAL.COMANDO.TO',
                'url' => 'http://192.168.2.104:8200/MediaItems/486.mkv',
                'isFree' => true
            ]
        ]
    ];

    echo json_encode($response);
    exit();
}

// Default route: 404 Not Found
http_response_code(404);
echo json_encode(['error' => 'Not Found']);
