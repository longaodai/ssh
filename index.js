const { Client } = require('ssh2');
const core = require('@actions/core');

async function main() {
    const conn = new Client();
    await new Promise((resolve, reject) => {
        conn.on('ready', () => {
            console.log('SSH connection established');
            conn.exec('ls -la', (err, stream) => {
                if (err) throw err;
                stream.on('close', (code, signal) => {
                    console.log('Stream closed');
                    conn.end();
                    resolve();
                }).on('data', (data) => {
                    console.log('STDOUT:', data.toString());
                }).stderr.on('data', (data) => {
                    console.error('STDERR:', data.toString());
                });
            });
        }).on('error', (err) => {
            console.error('SSH connection error:', err);
            reject(err);
        }).connect({
            host: core.getInput('host'),
            port: 22,
            username: core.getInput('username'),
            password: core.getInput('password'),
        });
    });
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
