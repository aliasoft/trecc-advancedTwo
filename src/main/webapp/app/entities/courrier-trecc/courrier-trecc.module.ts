import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TreccSharedModule } from 'app/shared';
import {
  CourrierTreccComponent,
  CourrierTreccDetailComponent,
  CourrierTreccUpdateComponent,
  CourrierTreccDeletePopupComponent,
  CourrierTreccDeleteDialogComponent,
  courrierRoute,
  courrierPopupRoute
} from './';

const ENTITY_STATES = [...courrierRoute, ...courrierPopupRoute];

@NgModule({
  imports: [TreccSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CourrierTreccComponent,
    CourrierTreccDetailComponent,
    CourrierTreccUpdateComponent,
    CourrierTreccDeleteDialogComponent,
    CourrierTreccDeletePopupComponent
  ],
  entryComponents: [
    CourrierTreccComponent,
    CourrierTreccUpdateComponent,
    CourrierTreccDeleteDialogComponent,
    CourrierTreccDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TreccCourrierTreccModule {}
