// import pino from 'pino';

// const logger = pino({
//   transport: { target: 'pino-pretty', options: { translateTime: true } }
// });

// export default logger;



import pino from 'pino';

export interface LogEntry {
  time: string;
  level: string | number;
  msg: string;
  [key: string]: any;
}

const logs: LogEntry[] = [];

const logger = pino({
  transport: { target: 'pino-pretty', options: { translateTime: true } },
  hooks: {
    logMethod(args, method) {
      const entry: LogEntry = {
        time: new Date().toISOString(),
        level: args[0] as string | number, 
        msg: args[1] as string,      
        ...(typeof args[2] === 'object' && args[2] !== null ? args[2] : {}),
      };

      logs.push(entry);
      method.apply(this, args);
    },
  },
});

export const getLogs = (limit = 100) => logs.slice(-limit);

export default logger;
