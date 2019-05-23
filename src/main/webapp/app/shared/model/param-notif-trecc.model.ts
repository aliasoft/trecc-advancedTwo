import { Moment } from 'moment';

export interface IParamNotifTrecc {
  id?: number;
  maxEnvoi?: number;
  envoiEnCours?: number;
  debutHoraire?: Moment;
  finHoraire?: Moment;
}

export class ParamNotifTrecc implements IParamNotifTrecc {
  constructor(
    public id?: number,
    public maxEnvoi?: number,
    public envoiEnCours?: number,
    public debutHoraire?: Moment,
    public finHoraire?: Moment
  ) {}
}
