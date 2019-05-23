import { Moment } from 'moment';
import { ICampagneTrecc } from 'app/shared/model/campagne-trecc.model';

export interface ICourrierTrecc {
  id?: number;
  idCourrier?: number;
  demandeEnvoi?: Moment;
  dateEnvoi?: Moment;
  idCpr?: number;
  nir?: string;
  typeCourrier?: string;
  modele?: string;
  statutGED?: string;
  statutEnvoiCourrier?: string;
  fkCampagne?: ICampagneTrecc;
}

export class CourrierTrecc implements ICourrierTrecc {
  constructor(
    public id?: number,
    public idCourrier?: number,
    public demandeEnvoi?: Moment,
    public dateEnvoi?: Moment,
    public idCpr?: number,
    public nir?: string,
    public typeCourrier?: string,
    public modele?: string,
    public statutGED?: string,
    public statutEnvoiCourrier?: string,
    public fkCampagne?: ICampagneTrecc
  ) {}
}
