[![Greenkeeper badge](https://badges.greenkeeper.io/LabShare/services.svg)](https://greenkeeper.io/)
[![Coverage Status](https://coveralls.io/repos/github/LabShare/services/badge.svg?branch=master)](https://coveralls.io/github/LabShare/services?branch=master)
[![Build Status](https://travis-ci.com/LabShare/services.svg?token=zsifsALL6Np5avzzjVp1&branch=master)](https://travis-ci.com/LabShare/services)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![codecov](https://codecov.io/gh/LabShare/services/branch/master/graph/badge.svg)](https://codecov.io/gh/LabShare/services)

# LabShare Services

## Usage

`npm i @labshare/services`

```js
const {Services} = require('@labshare/services');

let options = {
    // Override default options. 
    // The available configuration options are described in the "Configuration" section below.
};

let services = new Services(options);

services.config(({app, services}) => {
   // Optionally perform additional customization of the Express app initialized by Services and the loaded routes
   // Example (adds Express.js compression middleware):
   app.use(compression());
});

// Start up the server with all the loaded HTTP and Socket APIs
services.start();
```

## Configuration

### [Configuring LabShare Services](docs/configuration.md)
### [Environment Variables](docs/env-vars.md)

## LabShare Service Plugins

* [services-auth](https://www.npmjs.com/package/@labshare/services-auth): OAuth2 API authorization plugin
* [services-cache](https://www.npmjs.com/package/@labshare/services-cache): Enables Redis caching

### Example plugin usage

```js
const {Services} = require('@labshare/services');
const servicesAuth = require('@labshare/services-auth');

const services = new Services({/* options */);

services.config(servicesAuth({/* options */}));
```

## Default HTTP Routes

### Versions

```
GET /<service-path>/versions
```

__Response__
```
{
   "buildVersion":"v2017.0914.5",
   "versions": [
       {"api":"ls", apiDetails":{"name":"labshare","version":"v0.17.0631","description":"LabShare Services"}}
   ]
}
```

Example:
http://localhost:8000/versions

### Endpoints

```
GET /<service-path>/<project-name>/endpoints
POST /<service-path>/<project-name>/endpoints
```

__Response__
```
HTML table with the HTTP routes of the provided project name.
```

Example:
http://localhost:8000/services/endpoints

## Working with LabShare APIs
### [Running APIs](docs/run-package.md)
### [Creating HTTP APIs](docs/http-apis.md)
### [Creating Socket APIs](docs/socket-apis.md)
### [Managing APIs with PM2](docs/pm2-services.md)

## Development
1. Install [Node.js](https://nodejs.org).
2. `npm i -g lsc`
3. Run `npm install` inside the Service's root directory to install its dependencies.

### Tests
`npm test`
