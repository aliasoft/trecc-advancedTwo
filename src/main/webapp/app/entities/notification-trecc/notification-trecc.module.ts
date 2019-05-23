import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TreccSharedModule } from 'app/shared';
import {
  NotificationTreccComponent,
  NotificationTreccDetailComponent,
  NotificationTreccUpdateComponent,
  NotificationTreccDeletePopupComponent,
  NotificationTreccDeleteDialogComponent,
  notificationRoute,
  notificationPopupRoute
} from './';

const ENTITY_STATES = [...notificationRoute, ...notificationPopupRoute];

@NgModule({
  imports: [TreccSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NotificationTreccComponent,
    NotificationTreccDetailComponent,
    NotificationTreccUpdateComponent,
    NotificationTreccDeleteDialogComponent,
    NotificationTreccDeletePopupComponent
  ],
  entryComponents: [
    NotificationTreccComponent,
    NotificationTreccUpdateComponent,
    NotificationTreccDeleteDialogComponent,
    NotificationTreccDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TreccNotificationTreccModule {}
