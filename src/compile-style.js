const path = require('path');
const fs = require('fs');
const util = require('./util');
const cache = require('./cache');
const notifier = require('node-notifier');

const loader = require('./loader');
const scopedHandler = require('./style-compiler/scoped');

const LANG_MAP = {
    'less': '.less',
    'sass': '.sass;.scss'
};

module.exports = {
    compile (styles, requires, opath, moduleId) {
        let config = util.getConfig();
        let src = cache.getSrc();
        let dist = cache.getDist();
        let ext = cache.getExt();

        opath = requires;
        requires = [];
        moduleId = '';
        style = {
            type: styles,
            scoped: false,
            code: util.readFile(path.join(opath.dir, opath.base)) || ''
        };


        // styles can be an empty array
        let lang = style.type || 'css';
        const content = style.code;
        const scoped = style.scoped;

        if (lang === 'scss')
            lang = 'sass';

        let compiler = loader.loadCompiler(lang);

        if (!compiler) {
            throw `未发现相关 ${lang} 编译器配置，请检查wepy.config.js文件。`;
        }
        let needCompile = content;
        let doNotCompile = '';
        // 对于/\*!#-wx\*/注释后的内容不进行compile，
        const pos = content.indexOf('/*!#-wx*/');
        if (pos!== -1) {
            needCompile = content.substr(0,pos);
            doNotCompile = content.substr(pos);
        }
        const p = compiler(
            needCompile, config.compilers[lang] || {}, path.join(opath.dir, opath.base)
        );
        Promise.all([p]).then(rets => {
            let allContent = rets.join('');
            let target = util.getDistPath(opath, 'wxss', src, dist);
            let plg = new loader.PluginHelper(config.plugins, {
                type: 'css',
                code: allContent + doNotCompile.replace(/.scss/g, '.wxss'),
                file: target,
                output (p) {
                    util.output(p.action, p.file);
                },
                done (rst) {
                    util.output('写入', rst.file);
                    util.writeFile(target, rst.code);
                }
            });
        }).catch((e) => {
            console.log(e);
            notifier.notify({
                wait: true,
                title: 'style编译错误',
                message: `${e.file} [${e.line}:${e.column}]`,
            });
        })
    }
}
