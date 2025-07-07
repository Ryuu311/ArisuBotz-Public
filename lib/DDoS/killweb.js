const { exec } = require('child_process');

module.exports = async function runKillWeb(target, duration) {
    const command = `node ./lib/DDoS/miku_ninja.js "${target}" "${duration}"`;

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error('[KILLWEB ERROR]', err.message);
            return;
        }
        if (stdout) console.log('[KILLWEB STDOUT]', stdout);
        if (stderr) console.warn('[KILLWEB STDERR]', stderr);
    });
};