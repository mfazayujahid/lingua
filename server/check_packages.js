const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.resolve('D:/personal/pj/orca/japanlish/server/lingua_mastery.db');
const db = new Database(dbPath);

const rows = db.prepare('SELECT level_code, count(1) as total FROM exam_packages GROUP BY level_code').all();
console.log('Exam packages count by level:');
console.log(JSON.stringify(rows, null, 2));
