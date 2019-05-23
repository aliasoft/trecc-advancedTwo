import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TreccSharedLibsModule, TreccSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [TreccSharedLibsModule, TreccSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [TreccSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TreccSharedModule {
  static forRoot() {
    return {
      ngModule: TreccSharedModule
    };
  }
}
