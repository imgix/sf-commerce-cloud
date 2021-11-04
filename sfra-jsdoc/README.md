# Storefront Reference Architecture (SFRA) JSDoc

This is a repository to generate jsdoc as html for the Storefront Reference Architecture and your custom cartridges.

# Getting Started
1 Clone this repository.

2 From the root directory install npm: `npm install`.

3 Edit the `conf.json` and `confclient.json` files to configure the location of your storefront-reference-architecture repository and any additional directories to use when generating JSDoc. 
The `conf.json` and `confclient.json` files assume that the repository is a sibling of the storefront-reference-architecture repository.

4 Enter `npm run doc`

5 Open the `sfra-jsdoc/doc/dist/index.html` file in a browser.