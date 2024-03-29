#!/bin/sh -l
set -x

run_npm_start=$1
wait_for_url=$2

npm install

if $run_npm_start ; then
  npm start &> server.log & # Open server in background
  npx wait-on -t 300000 $wait_for_url # wait for server until timeout
fi

npm test -- --json --forceExit --outputFile=evaluation.json
node /evaluator.js evaluation.json .trybe/requirements.json result.json

echo "::group::Logs from API server"
cat server.log
echo "::endgroup::"

if [ $? != 0 ]; then
  echo "Execution error"
  exit 1
fi

echo "result=`cat result.json | base64 -w 0`" >> $GITHUB_OUTPUT
