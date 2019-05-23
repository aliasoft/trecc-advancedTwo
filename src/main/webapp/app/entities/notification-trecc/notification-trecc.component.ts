import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INotificationTrecc } from 'app/shared/model/notification-trecc.model';
import { AccountService } from 'app/core';
import { NotificationTreccService } from './notification-trecc.service';

@Component({
  selector: 'jhi-notification-trecc',
  templateUrl: './notification-trecc.component.html'
})
export class NotificationTreccComponent implements OnInit, OnDestroy {
  notifications: INotificationTrecc[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected notificationService: NotificationTreccService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.notificationService
      .query()
      .pipe(
        filter((res: HttpResponse<INotificationTrecc[]>) => res.ok),
        map((res: HttpResponse<INotificationTrecc[]>) => res.body)
      )
      .subscribe(
        (res: INotificationTrecc[]) => {
          this.notifications = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInNotifications();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: INotificationTrecc) {
    return item.id;
  }

  registerChangeInNotifications() {
    this.eventSubscriber = this.eventManager.subscribe('notificationListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
