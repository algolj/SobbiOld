export interface ISendMail {
  to: string | string[];
  subject: string;
  template: string;
  context: { [kays: string]: string | string[] | number };
}
