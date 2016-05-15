
export interface TextValue {
  'content-type': string;
  data: string;
  encoding: string;
}


export class Document {
  title: string;
  description: string;
  text: TextValue;
}
