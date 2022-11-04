const path           = require('path');
const { fork }       = require('child_process');
const createTestCafe = require('testcafe');

const serverPath    = path.resolve('./nodejs-certificate-auth/server/server.js');
const serverProcess = fork(serverPath);

async function runTests () {
    const testCafe = await createTestCafe();

    await testCafe.createRunner()
        .src('./test.js')
        .browsers('chrome')
        .run();

    await testCafe.close();
    serverProcess.kill();
}

runTests();
