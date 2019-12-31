## Example

![](http://g.recordit.co/svlsBqYHni.gif)

## What does weekly-report do

1. Recursively find Git repos under your working dir
1. generate prettified commit report of last 7 days.

## When will you need it

- You want to see what you have done last week
- You are contributin to **multipul**/one project to your company/yourself
- You need to do weekly report

## Install

```bash
npm install -g weekly-report
```

## Usage

```bash
# Go to your working dir (should be project using git or contains git projects inside)
cd dir/contains/projects/using/git

# Generate weekly report
weekly-report # or wr for short
```

## Note

- script will go 3 layers down
- The script does not inspect dirs inside a dir if the dir is a git project.
- make sure your git repos are on the right branch.