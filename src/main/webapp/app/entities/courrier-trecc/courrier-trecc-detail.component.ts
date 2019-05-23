import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourrierTrecc } from 'app/shared/model/courrier-trecc.model';

@Component({
  selector: 'jhi-courrier-trecc-detail',
  templateUrl: './courrier-trecc-detail.component.html'
})
export class CourrierTreccDetailComponent implements OnInit {
  courrier: ICourrierTrecc;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ courrier }) => {
      this.courrier = courrier;
    });
  }

  previousState() {
    window.history.back();
  }
}
