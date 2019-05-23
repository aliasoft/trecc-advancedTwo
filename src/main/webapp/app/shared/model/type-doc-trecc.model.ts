export interface ITypeDocTrecc {
  id?: number;
  typeDoc?: number;
  nomCourrier?: string;
  nomEmail?: string;
  nomEp?: string;
}

export class TypeDocTrecc implements ITypeDocTrecc {
  constructor(public id?: number, public typeDoc?: number, public nomCourrier?: string, public nomEmail?: string, public nomEp?: string) {}
}
