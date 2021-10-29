#!/bin/sh -l
set -x
set -e

run_npm_start=$1
wait_for_url=$2

npm install

if $run_npm_start ; then
  npm start && npx wait-on $wait_for_url
fi

npm test -- --json --outputFile=evaluation.json
node /evaluator.js evaluation.json .trybe/requirements.json result.json

if [ $? != 0 ]; then
  echo "Execution error"
  exit 1
fi

echo ::set-output name=result::`cat result.json | base64 -w 0`
