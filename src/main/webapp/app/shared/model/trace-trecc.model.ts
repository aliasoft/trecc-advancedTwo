import { Moment } from 'moment';
import { ICourrierTrecc } from 'app/shared/model/courrier-trecc.model';

export interface ITraceTrecc {
  id?: number;
  idTrace?: number;
  typeCourrier?: string;
  timestampProcess?: Moment;
  idCpr?: number;
  nir?: string;
  adresseEntrante?: string;
  adresseEnrichie?: string;
  email?: string;
  erreur?: string;
  fkCourrier?: ICourrierTrecc;
}

export class TraceTrecc implements ITraceTrecc {
  constructor(
    public id?: number,
    public idTrace?: number,
    public typeCourrier?: string,
    public timestampProcess?: Moment,
    public idCpr?: number,
    public nir?: string,
    public adresseEntrante?: string,
    public adresseEnrichie?: string,
    public email?: string,
    public erreur?: string,
    public fkCourrier?: ICourrierTrecc
  ) {}
}
