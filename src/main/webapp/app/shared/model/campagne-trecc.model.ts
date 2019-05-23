import { Moment } from 'moment';

export interface ICampagneTrecc {
  id?: number;
  idCampagne?: number;
  statut?: string;
  fichier?: string;
  dateDebut?: Moment;
  dateFin?: Moment;
}

export class CampagneTrecc implements ICampagneTrecc {
  constructor(
    public id?: number,
    public idCampagne?: number,
    public statut?: string,
    public fichier?: string,
    public dateDebut?: Moment,
    public dateFin?: Moment
  ) {}
}
