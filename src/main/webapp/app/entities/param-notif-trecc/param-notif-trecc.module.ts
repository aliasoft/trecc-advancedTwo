import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TreccSharedModule } from 'app/shared';
import {
  ParamNotifTreccComponent,
  ParamNotifTreccDetailComponent,
  ParamNotifTreccUpdateComponent,
  ParamNotifTreccDeletePopupComponent,
  ParamNotifTreccDeleteDialogComponent,
  paramNotifRoute,
  paramNotifPopupRoute
} from './';

const ENTITY_STATES = [...paramNotifRoute, ...paramNotifPopupRoute];

@NgModule({
  imports: [TreccSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ParamNotifTreccComponent,
    ParamNotifTreccDetailComponent,
    ParamNotifTreccUpdateComponent,
    ParamNotifTreccDeleteDialogComponent,
    ParamNotifTreccDeletePopupComponent
  ],
  entryComponents: [
    ParamNotifTreccComponent,
    ParamNotifTreccUpdateComponent,
    ParamNotifTreccDeleteDialogComponent,
    ParamNotifTreccDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TreccParamNotifTreccModule {}
