#!/bin/sh -l
set -x

REPOSITORY_NAME=$1
REPOSITORY_BRANCH=$2
run_npm_start=$3
wait_for_url=$4

apt update && apt install gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 \
  libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 \
  libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 \
  libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
  libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget -y


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
