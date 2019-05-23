import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeDocTrecc } from 'app/shared/model/type-doc-trecc.model';

@Component({
  selector: 'jhi-type-doc-trecc-detail',
  templateUrl: './type-doc-trecc-detail.component.html'
})
export class TypeDocTreccDetailComponent implements OnInit {
  typeDoc: ITypeDocTrecc;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ typeDoc }) => {
      this.typeDoc = typeDoc;
    });
  }

  previousState() {
    window.history.back();
  }
}
