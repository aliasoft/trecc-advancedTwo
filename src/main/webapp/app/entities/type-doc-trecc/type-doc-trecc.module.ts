import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TreccSharedModule } from 'app/shared';
import {
  TypeDocTreccComponent,
  TypeDocTreccDetailComponent,
  TypeDocTreccUpdateComponent,
  TypeDocTreccDeletePopupComponent,
  TypeDocTreccDeleteDialogComponent,
  typeDocRoute,
  typeDocPopupRoute
} from './';

const ENTITY_STATES = [...typeDocRoute, ...typeDocPopupRoute];

@NgModule({
  imports: [TreccSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TypeDocTreccComponent,
    TypeDocTreccDetailComponent,
    TypeDocTreccUpdateComponent,
    TypeDocTreccDeleteDialogComponent,
    TypeDocTreccDeletePopupComponent
  ],
  entryComponents: [
    TypeDocTreccComponent,
    TypeDocTreccUpdateComponent,
    TypeDocTreccDeleteDialogComponent,
    TypeDocTreccDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TreccTypeDocTreccModule {}
