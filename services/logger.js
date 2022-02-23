const morgan = require('morgan');
const pino = require('pino');
const pinoHttp = require('pino-http');
const prettifier = require('pino-pretty');

const enabled = process.env['NODE_ENV'] === 'test' ? false : true;
const prettyOptions = {
	prettyPrint: {
		levelFirst: true,
		translateTime: 'SYS:standard',
		ignore: 'pid,hostname',
	},
	prettifier,
	enabled: enabled,
};
class Logger {
	/**
		 *
		 * @param {object=} options Logger options
		 * @param {object=} pinoOptions options for pino
		 */
	constructor(options = {}, pinoOptions = {}) {
		this.options = Object.assign({}, options);
		this.pinoOptions = Object.assign(
			{
				name: 'StudentSecurity',
				enabled: enabled,
			},
			pinoOptions,

		);

		this._logger = this.createLogger({ enabled: enabled }, this.options.destination);
		this._consoleLogger = this.createConsoleLogger({ enabled: enabled });

	}

	/**
		 * Common log method to both console and file
		 * @param {string=} type log type, default: "info"
		 * @param rest
		 */
	log(type = 'info', ...rest) {
		this._consoleLogger[type](...rest);
		this._logger[type](...rest);
	}

	trace(...rest) {
		this.log('trace', ...rest);
	}
	debug(...rest) {
		this.log('debug', ...rest);
	}
	info(...rest) {
		this.log('info', ...rest);
	}
	warn(...rest) {
		this.log('warn', ...rest);
	}
	fatal(...rest) {
		this.log('fatal', ...rest);
	}
	error(...rest) {
		this.log('error', ...rest);
	}

	/**
		 * Create a pino logger
		 * @param {object=} options pino options
		 * @param {object=} destination pino destination, e.g: to file
		 */
	createLogger(options = {}) {
		return pino(
			Object.assign(this.pinoOptions, options),
		);
	}

	/**
		 * Create a pino logger to console
		 * @param {object=} options pino options with prettifier enabled
		 */
	createConsoleLogger(options) {
		return pino(Object.assign(prettyOptions, options));
	}

	/**
		 * Create pino logger that log koa requests to file
		 * @param {object=} options
		 * @returns {Function}
		 */
	createRequestsLogger(options) {
		return pinoHttp(
			Object.assign(
				{
					logger: this.createLogger(
						options,
					),
					serializers: {
						err: pino.stdSerializers.err,
						req: pino.stdSerializers.err,
						res: pino.stdSerializers.res,
					},
				},
				options
			)
		);
	}

	/**
		 * Create a morgan koa middleware for common log format
		 * @static
		 * @returns {*}
		 */
	static createMorganLogger() {
		return morgan('dev', { skip: () => !enabled });
	}
}

exports.logger = new Logger();
exports.Logger = Logger;