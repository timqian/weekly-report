#!/usr/bin/env node
const shell = require('shelljs');
const dateformat = require('dateformat');
const readline = require('readline');
const debug = require('debug')('weekly');

// generate shell command and run
const name = shell.exec('git config user.name', {silent:true}).stdout;
const sevenDaysAgo = new Date((new Date()).getTime() - (1000 * 60 * 60 * 24 * 7));
const dateStr = dateformat(sevenDaysAgo, 'yyyy-mm-dd');
const gitLogs = shell.exec(`git log --after ${dateStr} --author ${name}`, {silent:true}).stdout;

// reform gitLogs
const logArr = gitLogs.split('\n');

for(let i = logArr.length-1; i >= 0; i--) {
  if(logArr[i].indexOf('commit') === 0 || logArr[i].indexOf('Author') === 0 || logArr[i] === '') {
    logArr.splice(i, 1);
  }
}

let tmpDate = '';

for(let i = 0; i < logArr.length; i++) {
  if(logArr[i].indexOf('Date') === 0) {
    let today = dateformat(new Date(logArr[i].slice(4)), 'yyyy-mm-dd');
    debug(today, tmpDate);
    if(today === tmpDate) {
      logArr.splice(i, 1);
    } else {
      tmpDate = today;
      logArr[i] = `${today}`;
    }
  }
}

// TODO: support upper folder
console.log('~~~Weekly Report~~~ \n\n' + logArr.join('\n'));
