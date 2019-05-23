import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITraceTrecc } from 'app/shared/model/trace-trecc.model';

@Component({
  selector: 'jhi-trace-trecc-detail',
  templateUrl: './trace-trecc-detail.component.html'
})
export class TraceTreccDetailComponent implements OnInit {
  trace: ITraceTrecc;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ trace }) => {
      this.trace = trace;
    });
  }

  previousState() {
    window.history.back();
  }
}
