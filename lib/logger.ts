/**
 * Structured logging module for production observability
 * Outputs JSON-formatted logs with timestamps and context
 */

interface LogContext {
  [key: string]: unknown;
}

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  msg: string;
  ts: string;
  requestId?: string;
  [key: string]: unknown;
}

let currentRequestId: string | undefined;

export function setRequestId(id: string | undefined) {
  currentRequestId = id;
}

export function getRequestId(): string | undefined {
  return currentRequestId;
}

function createLogEntry(level: LogLevel, msg: string, context?: LogContext): LogEntry {
  return {
    level,
    msg,
    ts: new Date().toISOString(),
    ...(currentRequestId && { requestId: currentRequestId }),
    ...context,
  };
}

export const logger = {
  debug: (msg: string, context?: LogContext) => {
    console.debug(JSON.stringify(createLogEntry('debug', msg, context)));
  },

  info: (msg: string, context?: LogContext) => {
    console.info(JSON.stringify(createLogEntry('info', msg, context)));
  },

  warn: (msg: string, context?: LogContext) => {
    console.warn(JSON.stringify(createLogEntry('warn', msg, context)));
  },

  error: (msg: string, error?: Error | null, context?: LogContext) => {
    const entry = createLogEntry('error', msg, {
      ...context,
      ...(error && {
        error: error.message,
        stack: error.stack,
      }),
    });
    console.error(JSON.stringify(entry));
  },
};
