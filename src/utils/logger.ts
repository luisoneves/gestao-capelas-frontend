// src/utils/logger.ts
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isProduction = process.env.NODE_ENV === 'production';
  
  private formatTimestamp(): string {
    return new Date().toISOString();
  }
  
  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = this.formatTimestamp();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }
  
  private shouldLog(level: LogLevel): boolean {
    // Em desenvolvimento, loga tudo
    if (this.isDevelopment) return true;
    
    // Em produção, só loga warnings e errors
    if (this.isProduction) {
      return level === 'warn' || level === 'error';
    }
    
    return true;
  }
  
  private log(level: LogLevel, message: string, data?: any) {
    if (!this.shouldLog(level)) return;
    
    const formattedMessage = this.formatMessage(level, message);
    
    switch (level) {
      case 'debug':
        console.debug(formattedMessage, data || '');
        break;
      case 'info':
        console.info(formattedMessage, data || '');
        break;
      case 'warn':
        console.warn(formattedMessage, data || '');
        break;
      case 'error':
        console.error(formattedMessage, data || '');
        break;
    }
    
    // Aqui você poderia enviar para um serviço externo (Sentry, LogRocket, etc.)
    // this.sendToExternalService({ level, message, data, timestamp: this.formatTimestamp() });
  }
  
  debug(message: string, data?: any) {
    this.log('debug', message, data);
  }
  
  info(message: string, data?: any) {
    this.log('info', message, data);
  }
  
  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }
  
  error(message: string, data?: any) {
    this.log('error', message, data);
  }
  
  // Método para logs de API (específico para seu caso)
  api(response: any, endpoint: string) {
    if (this.isDevelopment) {
      this.debug(`API Response from ${endpoint}`, {
        status: 'success',
        dataCount: response?.data?.length || 0,
        // Não logamos os dados completos em produção
        fullData: this.isDevelopment ? response : '[REDACTED IN PRODUCTION]'
      });
    } else {
      this.info(`API Request to ${endpoint}`, {
        dataCount: response?.data?.length || 0
      });
    }
  }
  
  apiError(error: any, endpoint: string) {
    this.error(`API Error on ${endpoint}`, {
      message: error.message,
      stack: this.isDevelopment ? error.stack : undefined
    });
  }
}

// Exporta uma instância única (Singleton)
export const logger = new Logger();
