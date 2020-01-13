#!/bin/sh -l

cp /evaluator.js /github/workspace
npm install -g jest
jest --json --outputFile=evaluation.json
node evaluator.js evaluation.json mapping.json result.json

echo ::set-output name=result::`cat result.json | base64 -w 0`
