## What is weekly-report

Recursively inspect dirs inside your working dir and auto generate weekly commit report from git log for you. 

## When will you need it

- You are contributin to **multipul**/one project to your company/yourself
- You need to present a weekly report
- You want to see what you have done last week

## Install

```
$ npm install -g weekly-report
```

## Usage

```
# Go to your working dir (should be project using git or contains git projects inside)
$ cd dir/contains/projects/using/git

# Generate weekly report
$ weekly-report # or wr for short
```

## Example

![](http://g.recordit.co/svlsBqYHni.gif)

## Note

- The script will stop inspect dirs inside a dir if the dir is a git project.
- script will go 3 layer down