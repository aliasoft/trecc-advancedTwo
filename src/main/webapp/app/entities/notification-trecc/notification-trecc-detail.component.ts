import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INotificationTrecc } from 'app/shared/model/notification-trecc.model';

@Component({
  selector: 'jhi-notification-trecc-detail',
  templateUrl: './notification-trecc-detail.component.html'
})
export class NotificationTreccDetailComponent implements OnInit {
  notification: INotificationTrecc;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ notification }) => {
      this.notification = notification;
    });
  }

  previousState() {
    window.history.back();
  }
}
