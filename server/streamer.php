<?php
// Base directory where audio files are stored
$baseDir = __DIR__ . '/music/';

// Get the requested relative file path
$relativePath = $_GET['file'];

// Resolve the full path using the base directory and the relative path
$realFilePath = realpath($baseDir . $relativePath);

// Validate the resolved path
// Ensure the file exists and is within the base directory
if ($realFilePath === false || strpos($realFilePath, $baseDir) !== 0 || !file_exists($realFilePath)) {
    header("HTTP/1.1 404 Not Found");
    exit;
}

// Get the file size and open the file
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

// Stream the requested portion of the file
fseek($handle, $start);
echo fread($handle, $length);

// Close the file handle
fclose($handle);
exit;
?>
