#!/bin/sh -l
set -x

REPOSITORY_NAME=$1
REPOSITORY_BRANCH=$2
run_npm_start=$3
wait_for_url=$4

git clone --branch $REPOSITORY_BRANCH https://github.com/$REPOSITORY_NAME.git /project-tests
rm -rf /project-tests/.git
cp -r /project-tests/* .
npm install

if $run_npm_start ; then
  npm start & npx wait-on $wait_for_url
fi

npm test -- --json --outputFile=evaluation.json
node /evaluator.js evaluation.json .trybe/requirements.json result.json

if [ $? != 0 ]; then
  echo "Execution error"
  exit 1
fi

echo ::set-output name=result::`cat result.json | base64 -w 0`
echo ::set-output name=pr-number::$(echo "$GITHUB_REF" | awk -F / '{print $3}')
