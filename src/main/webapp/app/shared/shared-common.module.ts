import { NgModule } from '@angular/core';

import { TreccSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [TreccSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [TreccSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class TreccSharedCommonModule {}
