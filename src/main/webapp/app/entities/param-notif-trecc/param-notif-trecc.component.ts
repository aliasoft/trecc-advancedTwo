import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IParamNotifTrecc } from 'app/shared/model/param-notif-trecc.model';
import { AccountService } from 'app/core';
import { ParamNotifTreccService } from './param-notif-trecc.service';

@Component({
  selector: 'jhi-param-notif-trecc',
  templateUrl: './param-notif-trecc.component.html'
})
export class ParamNotifTreccComponent implements OnInit, OnDestroy {
  paramNotifs: IParamNotifTrecc[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected paramNotifService: ParamNotifTreccService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.paramNotifService
      .query()
      .pipe(
        filter((res: HttpResponse<IParamNotifTrecc[]>) => res.ok),
        map((res: HttpResponse<IParamNotifTrecc[]>) => res.body)
      )
      .subscribe(
        (res: IParamNotifTrecc[]) => {
          this.paramNotifs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInParamNotifs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IParamNotifTrecc) {
    return item.id;
  }

  registerChangeInParamNotifs() {
    this.eventSubscriber = this.eventManager.subscribe('paramNotifListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
