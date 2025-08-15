
const now = new Date();

// Format components
const day = String(now.getDate()).padStart(2, '0');
const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
const year = now.getFullYear();

const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

// Combine into desired format
const formattedDateTime = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;



module.exports = formattedDateTime;