const path = require('path');

const util = require('./util');
const cache = require('./cache');


module.exports = {
    compile (config, opath) {
        let src = cache.getSrc();
        let dist = cache.getDist();
        let target = util.getDistPath(opath, 'json', src, dist);
        util.log('配置: ' + path.relative(util.currentDir, target), '写入');
        util.writeFile(target, JSON.stringify(config));
    }
}