declare module "*.css" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

export interface User {
  email?: string;
  displayName?: string;
}

export interface NoteI {
  id: string;
  title: string;
  note: string;
  date: number;
}

export interface IFormInput {
  title: string;
  note: string;
  example: string;
}
