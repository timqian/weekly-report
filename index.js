#!/usr/bin/env node

// git log --after 2016-12-18 --author timqian

const shell = require('shelljs');
const dateformat = require('dateformat');

const name = shell.exec('git config user.name', {silent:true}).stdout;
const sevenDaysAgo = new Date((new Date()).getTime() - (1000 * 60 * 60 * 24 * 7));
const dateStr = dateformat(sevenDaysAgo, 'yyyy-mm-dd');


const gitLogs = shell.exec(`git log --after ${dateStr} --author ${name}`, {silent:true}).stdout;

// TODO: reform gitLogs
console.log(gitLogs);