import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export class LoggingService {
  lastLog: string;

  printLog(message: string) {
    console.log('lastLog => ', message);
    this.lastLog = message;
  }
}