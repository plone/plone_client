
export interface TextValue {
  'content-type': string;
  data: string;
  encoding: string;
}

export interface Summary {
  '@id'?: string;
  '@type'?: string;
  title?: string;
  description?: string;
}

export interface Model extends Summary {
  parent?: Summary;
  created?: string;
  modified?: string;
  UID?: string;
  text?: TextValue;
  member?: Summary[];
}
