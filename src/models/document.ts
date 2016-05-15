
export interface TextValue {
  'content-type': string;
  data: string;
  encoding: string;
}


export interface Model {
  title: string;
  description: string;
  text?: TextValue;
}
