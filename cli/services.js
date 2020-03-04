'use strict'

const Services = require('../lib/services')
const _ = require('lodash')
const servicesCache = require('@labshare/services-cache').Middleware
const path = require('path');
const yargs = require('yargs');
const {buildService, getBuildDate} = require('../lib/cli/build-service');

exports.usage = [
  'lsc services start      - Start up LabShare API services.',
  'lsc services build      - Build LabShare API services.',
  ''
]

exports.start = async function () {
  this.log.info('Starting LabShare services...')

  const config = _.get(global, 'LabShare.Config')
  const services = new Services(config)

  services.config(({app}) => {
    // Enable response compression and CORS
    app.use(require('compression')())
    app.use(require('cors')())
  })

  if (_.get(config, 'shell.Cache.enable')) {
    services.config(servicesCache(_.get(config, 'shell.Cache'), this.log))
  }
  await services.start()
}

exports.build = async function () {
  this.log.info('Building LabShare services...');
  const distPath = path.join('dist', `service.${getBuildDate()}`);
  const options = getBuildOptions({defaultDestination: distPath});
  await buildService(options);
}


/**
 * @description Gets the common build options
 * @param {String} defaultDestination
 * @param {object} extendedOptions
 * @returns {debug, buildVersion, npmCache}
 * @private
 */
function getBuildOptions({defaultDestination}, extendedOptions = {}) {
  return yargs.options(_.extend({
    debug: {
      describe: 'Build unminified version',
      type: 'boolean',
      default: false
    },
    buildVersion: {
      describe: 'Customize the build version',
      default: getBuildDate()
    },
    npmCache: {
      type: 'string',
      describe: 'Overrides global npm cache for npm install',
      default: null
    },
    source: {
      type: 'string',
      describe: 'Set the project root directory',
      default: process.cwd()
    },
    destination: {
      alias: ['dest', 'dist'],
      describe: 'The path to the build destination',
      type: 'string',
      default: defaultDestination
    }
  }, extendedOptions)).argv;
}

