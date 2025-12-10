import cron from 'node-cron';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const directory = path.join(__dirname, '../uploads');

console.log(`📁 Watching directory for cleanup: ${directory}`);

cron.schedule('*/10 * * * *', () => {
    console.log('---------------------');
    console.log('Running the image cleanup job at:', new Date().toLocaleString());

    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('❌ Could not list the directory.', err);
            process.exit(1);
        }

        files.forEach((file) => {
            const filePath = path.join(directory, file);
            const fileExt = path.extname(file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`❌ Could not get stats for file ${file}:`, err);
                    return;
                }

                const accessTime = stats.atime.getTime();
                const now = Date.now();

                const fileAgeInMinutes = (now - accessTime) / (1000 * 60);

                if (fileExt === '.m3u8') {
                    if (fileAgeInMinutes > 30) {
                        fs.unlink(filePath, (err) => {
                            if (err) return console.error(`❌ Error deleting .m3u8 file ${file}:`, err);
                            console.log(`🟡 Deleted HLS playlist (m3u8): ${file}`);
                        });
                    }
                } else {
                    const fileAgeInHours = fileAgeInMinutes / 60;
                    if (fileAgeInHours > 1) {
                        fs.unlink(filePath, (err) => {
                            if (err) return console.error(`❌ Error deleting file ${file}:`, err);
                            console.log(`🟢 Successfully deleted ${file}`);
                        });
                    }
                }
            });
        });
    });
});
