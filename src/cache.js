const util = require('./util');

const cachePath = '.wepycache';
let _buildCache = null;
let _cacheChanged = false;
let _filelistCache = {};

module.exports = {
    setParams (v) {
        this._params = v;
    },
    getParams () {
        return this._params;
    },
    setExt (v) {
        this._ext = v;
    },
    getExt () {
        return this._ext || '.wpy';
    },
    getSrc () {
        return this._src || 'src';
    },
    setSrc (v = 'src') {
        this._src = v;
    },
    getDist () {
        return this._dist || 'dist';
    },
    setDist (v = 'dist') {
        this._dist = v;
    },
    setPages (v = []) {
        this._pages = v;
    },
    getPages () {
        return this._pages || [];
    },
    getConfig () {
        return this._config || null;
    },
    setConfig (v = null) {
        this._config = v;
    },
    setFileList (key, v) {
        _filelistCache[key] = v;
    },
    getFileList (key) {
        return _filelistCache[key] || null;
    },
    getBuildCache (file) {
        if (_buildCache)
            return _buildCache;

        if (util.isFile(cachePath)) {
            _buildCache = util.readFile(cachePath);
            try {
                _buildCache = JSON.parse(_buildCache);
            } catch (e) {
                _buildCache = null;
            }
        }

        return _buildCache || {};
    },
    setBuildCache (file) {
        let cache = this.getBuildCache();
        cache[file] = util.getModifiedTime(file);
        _buildCache = cache;
        _cacheChanged = true;
    },
    clearBuildCache() {
        util.unlink(cachePath);
    },
    saveBuildCache() {
        if (_cacheChanged) {
            util.writeFile(cachePath, JSON.stringify(_buildCache));
            _cacheChanged = false;
        }
    },
    checkBuildCache(file) {
        let cache = this.getBuildCache();
        return cache[file] && cache[file] === util.getModifiedTime(file);
    }
}