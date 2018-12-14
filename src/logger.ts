import winston from 'winston';
import { format } from 'logform';

interface log {
	level: string,
	message: string
}

class logger {
	log_inst: any = null;
	log_list: log[] = [];

	constructor() {
		const logFormat = format.combine(
			format.colorize(),
			format.align(),
			format.printf((info: any) => `${info.level}: ${info.message}`)
		);

		this.log_inst = winston.createLogger({
			format: logFormat,
			transports: [
				new winston.transports.Console(),
			]
		});
	}

	info(obj: any): void {
		const message: string = this.get_string(obj);
		this.log_inst.info(message);
		this.log_list.push({
			level: 'info',
			message
		});
	}

	warn(obj: any): void {
		const message: string = this.get_string(obj);
		this.log_inst.warn(message);
		this.log_list.push({
			level: 'warn',
			message
		});
	}

	error(obj: any): void {
		const message: string = this.get_string(obj);
		this.log_inst.error(message);
		this.log_list.push({
			level: 'error',
			message
		});
	}

	get_string(obj: any): string {
		if (typeof obj === 'string') {
			return obj;
		}

		return JSON.stringify(obj);
	}
}

export default new logger();
