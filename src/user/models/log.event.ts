export class LogEvent {
  method: string;
  time: Date;
  body: string;

  constructor(method: string, time: Date, body: string) {
    this.method = method;
    this.time = time;
    this.body = body;
  }
}
