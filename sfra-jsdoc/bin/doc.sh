#!/usr/bin/env bash
# Generating jsdoc";
# clean up old doc/dist directory";
rm -rf doc/dist && \
# make an empty directory";
mkdir -p doc/dist && \
# copy static assets";
cp index.html doc/dist/index.html && \
cp -r template/ doc/dist/template # && \
echo "jsdoc client-side JS";
./node_modules/.bin/jsdoc . -c confclient.json -d doc/dist/js/client -R template/clientside.md

echo "jsdoc server-side JS";
# jsdoc server-side JS
 ./node_modules/.bin/jsdoc . -c conf.json -d doc/dist/js/server -R template/serverside.md
    # server the files locally
    # http-server doc/dist -p 5000