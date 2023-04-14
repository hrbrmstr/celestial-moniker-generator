#!/usr/bin/env just --justfile

# default recipe to display help information
@default:
  @just --list

# set up pkgjson
@setup:
  npm i --save-dev rollup @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-babel @rollup/plugin-json @rollup/plugin-terser

# build the module
@build:
  npm run build

# test the module
@test:
  npm run test

# publish the module
@pub:
  npm publish

# see what versions are on npm
@vers:
  npm view . versions

# patch
@patch:
  npm version patch
  npm publish