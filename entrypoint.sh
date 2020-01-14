#!/bin/sh -l

cp /evaluator.js /github/workspace
npm install -g jest
jest --json --outputFile=evaluation.json
node evaluator.js evaluation.json requirements_mapping.json result.json

if [ $? != 0 ]; then
  echo "Execution error"
  exit 1
fi

echo ::set-output name=result::`cat result.json | base64 -w 0`
