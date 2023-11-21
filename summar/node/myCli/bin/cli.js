#! /usr/bin/env node
const { program } = require('commander')
const myhelp = require('../lib/core/help')

myhelp(program)

const mycommand = require('../lib/core/mycommand')
mycommand(program)
program.parse(process.argv)