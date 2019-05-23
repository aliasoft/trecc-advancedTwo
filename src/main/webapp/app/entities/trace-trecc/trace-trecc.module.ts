import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TreccSharedModule } from 'app/shared';
import {
  TraceTreccComponent,
  TraceTreccDetailComponent,
  TraceTreccUpdateComponent,
  TraceTreccDeletePopupComponent,
  TraceTreccDeleteDialogComponent,
  traceRoute,
  tracePopupRoute
} from './';

const ENTITY_STATES = [...traceRoute, ...tracePopupRoute];

@NgModule({
  imports: [TreccSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TraceTreccComponent,
    TraceTreccDetailComponent,
    TraceTreccUpdateComponent,
    TraceTreccDeleteDialogComponent,
    TraceTreccDeletePopupComponent
  ],
  entryComponents: [TraceTreccComponent, TraceTreccUpdateComponent, TraceTreccDeleteDialogComponent, TraceTreccDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TreccTraceTreccModule {}
