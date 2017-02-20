#!/usr/bin/env bash

if [ "$#" -ne 1 ]
  then
    echo "You must supply the parent dir"
    exit 1
fi

cd $1

cd ag-grid
rm -rf dist
npm install
gulp release


cd ../ag-grid-enterprise
rm -rf dist
npm install
rm -rf node_modules/ag-grid
npm i "file:../ag-grid"
gulp release


cd ../ag-grid-angular
rm -rf dist
npm install
rm -rf node_modules/ag-grid
rm -rf node_modules/ag-grid-enterprise
npm i "file:../ag-grid"
npm i "file:../ag-grid-enterprise"
npm run clean
npm run build

cd ../ag-grid-angular-example/systemjs_aot
rm -rf dist
npm install
rm -rf node_modules/ag-grid
rm -rf node_modules/ag-grid-angular
rm -rf node_modules/ag-grid-enterprise
npm i "file:../../ag-grid"
npm i "file:../../ag-grid-enterprise"
npm i "file:../../ag-grid-angular"
npm run clean
npm run tsc

cd ../webpack
rm -rf dist
npm install
rm -rf node_modules/ag-grid
rm -rf node_modules/ag-grid-angular
rm -rf node_modules/ag-grid-enterprise
npm i "file:../../ag-grid"
npm i "file:../../ag-grid-enterprise"
npm i "file:../../ag-grid-angular"
npm run clean
npm run build

cd ../angular-cli
rm -rf dist
npm install
rm -rf node_modules/ag-grid
rm -rf node_modules/ag-grid-angular
rm -rf node_modules/ag-grid-enterprise
npm i "file:../../ag-grid"
npm i "file:../../ag-grid-enterprise"
npm i "file:../../ag-grid-angular"


cd ../../ag-grid-react
rm -rf dist
npm install
rm -rf node_modules/ag-grid
rm -rf node_modules/ag-grid-enterprise
npm i "file:../ag-grid"
npm i "file:../ag-grid-enterprise"
gulp

cd ../ag-grid-react-example
rm -rf dist
npm install
rm -rf node_modules/ag-grid
rm -rf node_modules/ag-grid-enterprise
rm -rf node_modules/ag-grid-react
npm i "file:../ag-grid"
npm i "file:../ag-grid-enterprise"
npm i "file:../ag-grid-react"

cd ../ag-grid-vue
rm -rf dist
npm install
rm -rf node_modules/ag-grid
rm -rf node_modules/ag-grid-enterprise
npm i "file:../ag-grid"
npm i "file:../ag-grid-enterprise"
gulp

cd ../ag-grid-vue-example
rm -rf dist
npm install
rm -rf node_modules/ag-grid
rm -rf node_modules/ag-grid-enterprise
rm -rf node_modules/ag-grid-vue
npm i "file:../ag-grid"
npm i "file:../ag-grid-enterprise"
npm i "file:../ag-grid-vue"
npm run build