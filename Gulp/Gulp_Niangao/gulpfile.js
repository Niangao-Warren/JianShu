const requireDir = require('require-dir'); 
// 载入 ./gulp/tasks 目录下的所有任务
requireDir('./gulp/tasks', { recurse: true });

/*
    require-dir https://github.com/aseemk/requireDir
*/