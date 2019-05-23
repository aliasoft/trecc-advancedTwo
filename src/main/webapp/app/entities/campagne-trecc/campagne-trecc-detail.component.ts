import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICampagneTrecc } from 'app/shared/model/campagne-trecc.model';

@Component({
  selector: 'jhi-campagne-trecc-detail',
  templateUrl: './campagne-trecc-detail.component.html'
})
export class CampagneTreccDetailComponent implements OnInit {
  campagne: ICampagneTrecc;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ campagne }) => {
      this.campagne = campagne;
    });
  }

  previousState() {
    window.history.back();
  }
}
