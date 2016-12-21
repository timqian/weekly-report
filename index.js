#!/usr/bin/env node

// 1. get all the git repos inside dir
// 2. run `oneReport` for each dir
const fs = require('fs');
const shell = require('shelljs');
const debug = require('debug')('index');
const path = require('path');
const getOneReport = require('./getOneReport');


const gitRepoArr = [];

let depth = 0;
const maxDeep = 2;

reportGenerator(process.cwd());

function reportGenerator(dir) {
  debug('depth:', depth)
  if(depth >= maxDeep) return;

  if(isGitRepo(dir)) {
    getOneReport(dir);
  } else {
    const folderArr = fs.readdirSync(dir);
    debug('folderArr:', folderArr)
    folderArr.forEach(item => {
      if(item.indexOf('.') === 0) return;
      const currentPath = path.join(dir, item);
      const isFile = fs.statSync(currentPath).isFile();
      if(!isFile){
        if(isGitRepo(currentPath)) {
          getOneReport(currentPath);
        } else {
          reportGenerator(currentPath);
        }
      }
    })
  }
  depth++;
}



function isGitRepo(dir) {
  const gitResErr = shell.exec(`git -C ${dir} rev-parse`, {silent:true}).stderr;
  // no err means dir is a git repo
  if(gitResErr === '') {
    return true;
  } else {
    return false;
  }
}
