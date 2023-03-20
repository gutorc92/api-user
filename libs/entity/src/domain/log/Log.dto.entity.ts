export class CreateLogDto {
  method: string;
  body: string;
  time: Date;

  constructor(method: string, time: Date, body: string) {
    this.method = method;
    this.time = time;
    this.body = body;
  }
}
