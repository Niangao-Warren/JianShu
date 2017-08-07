var requireDir = require('require-dir'); 
// 载入 ./gulp/tasks 目录下的所有任务
requireDir('./gulp/tasks', { recurse: true });
