import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITypeDocTrecc } from 'app/shared/model/type-doc-trecc.model';
import { AccountService } from 'app/core';
import { TypeDocTreccService } from './type-doc-trecc.service';

@Component({
  selector: 'jhi-type-doc-trecc',
  templateUrl: './type-doc-trecc.component.html'
})
export class TypeDocTreccComponent implements OnInit, OnDestroy {
  typeDocs: ITypeDocTrecc[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected typeDocService: TypeDocTreccService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.typeDocService
      .query()
      .pipe(
        filter((res: HttpResponse<ITypeDocTrecc[]>) => res.ok),
        map((res: HttpResponse<ITypeDocTrecc[]>) => res.body)
      )
      .subscribe(
        (res: ITypeDocTrecc[]) => {
          this.typeDocs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTypeDocs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITypeDocTrecc) {
    return item.id;
  }

  registerChangeInTypeDocs() {
    this.eventSubscriber = this.eventManager.subscribe('typeDocListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
