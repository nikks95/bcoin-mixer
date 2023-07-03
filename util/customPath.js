const path = require('path');

const cjoin = (filepath) => {
    const mainModuleDirectory = path.dirname(require.main.filename);
    p = path.join(mainModuleDirectory,filepath);
    return p;
};

module.exports = cjoin;