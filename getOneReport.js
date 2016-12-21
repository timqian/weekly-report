#!/usr/bin/env node
const shell = require('shelljs');
const dateformat = require('dateformat');
const readline = require('readline');
const debug = require('debug')('oneReport');
const path = require('path');

module.exports = function oneReport(dirname) {

  // generate shell command and run
  const name = shell.exec('git config user.name', {silent:true}).stdout.trim();
  const sevenDaysAgo = new Date((new Date()).getTime() - (1000 * 60 * 60 * 24 * 7));
  const dateStr = dateformat(sevenDaysAgo, 'yyyy-mm-dd');
  const gitLogCommentToRun = `cd ${dirname} && git log --after ${dateStr} --author ${name}`;
  debug('gitLogCommentToRun: ', gitLogCommentToRun);
  const gitLogs = shell.exec(gitLogCommentToRun, {silent:true}).stdout.trim();

  // reform gitLogs
  const logArr = gitLogs.split('\n');

  for(let i = logArr.length - 1; i >= 0; i--) {
    debug(`${i}th line of raw log: `, logArr[i]);
    if(logArr[i].indexOf('commit') === 0 || logArr[i].indexOf('Author') === 0 || logArr[i].trim() === '') {
      logArr.splice(i, 1);
    }
  }

  let tmpDate = '';

  for(let i = 0; i < logArr.length; i++) {
    if(logArr[i].indexOf('Date') === 0) {
      let today = dateformat(new Date(logArr[i].slice(4)), 'yyyy-mm-dd');
      debug('date compare: ', today, tmpDate);
      if(today === tmpDate) {
        logArr.splice(i, 1);
      } else {
        tmpDate = today;
        logArr[i] = `${today}`;
        logArr.splice(i, 0, '');
      }
    }
  }


  if(logArr.join().trim() !== ''){
    console.log(`\n\n~~~~~~~ Weekly Report for ${path.relative(process.cwd(), dirname)} ~~~~~~~\n\n ${logArr.join('\n')}`);
  }

}
