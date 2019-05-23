import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParamNotifTrecc } from 'app/shared/model/param-notif-trecc.model';

@Component({
  selector: 'jhi-param-notif-trecc-detail',
  templateUrl: './param-notif-trecc-detail.component.html'
})
export class ParamNotifTreccDetailComponent implements OnInit {
  paramNotif: IParamNotifTrecc;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ paramNotif }) => {
      this.paramNotif = paramNotif;
    });
  }

  previousState() {
    window.history.back();
  }
}
