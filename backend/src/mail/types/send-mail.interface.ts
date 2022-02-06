export interface ISendMail {
  to: string;
  subject: string;
  template: string;
  context: { [kays: string]: string | string[] | number };
}
