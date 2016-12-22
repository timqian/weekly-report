#!/usr/bin/env node

// 1. get all the git repos inside dir
// 2. run `oneReport` for each dir
const fs = require('fs');
const shell = require('shelljs');
const debug = require('debug')('index');
const path = require('path');
const getOneReport = require('./getOneReport');


const gitRepoArr = [];

const pwd = process.cwd();

if(isGitRepo(pwd)) {
  debug('generate log for: ', pwd);
  getOneReport(pwd);
} else {
  debug('scaning: ', pwd)
  const folderArr = getAbsolutePathesUnderAbsolutePath(pwd);
  folderArr.forEach(path => {
    if(isGitRepo(path)){
      debug('generate log for: ', path);
      getOneReport(path);
    } else {
      debug('scaning: ', path)
      const nextLayerFolderArr = getAbsolutePathesUnderAbsolutePath(path);
      nextLayerFolderArr.forEach(path => {
        if(isGitRepo(path)){
          debug('generate log for: ', path);
          getOneReport(path);
        } else {
          debug('drop: ', path)
        }
      })
    }
  })
}

function getAbsolutePathesUnderAbsolutePath(currentPath) {
  const dirArr = fs.readdirSync(currentPath);
  const pathArr = [];
  
  for(let i = 0; i < dirArr.length; i++) {
    if(dirArr[i].indexOf('.') !== 0) {
      const absolutePath = path.join(currentPath, dirArr[i])
      if(!fs.statSync(absolutePath).isFile()) {
        pathArr.push(absolutePath)
      }
    }
  }

  return pathArr;
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
