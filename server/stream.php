<?php
// Base directory where audio files are stored
$baseDir = realpath(__DIR__ . '/media/');

if ($baseDir === false) {
    header("HTTP/1.1 500 Internal Server Error");
    exit;
}

// Allowed audio extensions
$allowedExtensions = ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a', 'wma', 'opus'];

// Get and sanitize the requested file path
$relativePath = isset($_GET['file']) ? trim($_GET['file']) : '';

// Reject empty, absolute, or traversal-containing paths
if ($relativePath === '' || $relativePath[0] === '/' || strpos($relativePath, '..') !== false) {
    header("HTTP/1.1 400 Bad Request");
    exit;
}

// Normalize the path and resolve the full path
$normalizedPath = str_replace(['\\', '//'], '/', $relativePath);
$fullPath = $baseDir . '/' . $normalizedPath;
$realFilePath = realpath($fullPath);

// Validate the resolved path: must exist, be a file, and be strictly inside $baseDir
if ($realFilePath === false || !is_file($realFilePath) || strpos($realFilePath, $baseDir . '/') !== 0) {
    header("HTTP/1.1 404 Not Found");
    exit;
}

// Validate file extension
$extension = strtolower(pathinfo($realFilePath, PATHINFO_EXTENSION));
if (!in_array($extension, $allowedExtensions, true)) {
    header("HTTP/1.1 403 Forbidden");
    exit;
}

// Get the file size
$filesize = filesize($realFilePath);
$handle = fopen($realFilePath, 'rb');

// Handle the "Range" header for partial content delivery
$start = 0;
$end = $filesize - 1;
$length = $filesize;

if (isset($_SERVER['HTTP_RANGE'])) {
    $range = $_SERVER['HTTP_RANGE'];
    list(, $range) = explode('=', $range, 2);
    if (strpos($range, ',') !== false) {
        header('HTTP/1.1 416 Requested Range Not Satisfiable');
        exit;
    }

    if ($range[0] == '-') {
        $start = $filesize - substr($range, 1);
    } else {
        $range = explode('-', $range);
        $start = intval($range[0]);
        $end = isset($range[1]) && is_numeric($range[1]) ? intval($range[1]) : $filesize - 1;
    }
    $length = $end - $start + 1;

    // Send partial content headers
    header('HTTP/1.1 206 Partial Content');
    header("Content-Range: bytes $start-$end/$filesize");
} else {
    header('HTTP/1.1 200 OK');
}

// Set headers for the file
header('Content-Type: audio/mpeg');
header('Accept-Ranges: bytes');
header("Content-Length: $length");

// Stream the requested portion of the file in chunks
fseek($handle, $start);
$chunkSize = 8192; // 8KB per chunk

while (!feof($handle) && ($pos = ftell($handle)) <= $end) {
    if ($pos + $chunkSize > $end) {
        $chunkSize = $end - $pos + 1;
    }
    echo fread($handle, $chunkSize);
    flush(); // Force the output buffer to flush
}

// Close the file handle
fclose($handle);
exit;
?>
