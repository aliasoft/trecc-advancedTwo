import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'campagne-trecc',
        loadChildren: './campagne-trecc/campagne-trecc.module#TreccCampagneTreccModule'
      },
      {
        path: 'courrier-trecc',
        loadChildren: './courrier-trecc/courrier-trecc.module#TreccCourrierTreccModule'
      },
      {
        path: 'param-notif-trecc',
        loadChildren: './param-notif-trecc/param-notif-trecc.module#TreccParamNotifTreccModule'
      },
      {
        path: 'trace-trecc',
        loadChildren: './trace-trecc/trace-trecc.module#TreccTraceTreccModule'
      },
      {
        path: 'notification-trecc',
        loadChildren: './notification-trecc/notification-trecc.module#TreccNotificationTreccModule'
      },
      {
        path: 'type-doc-trecc',
        loadChildren: './type-doc-trecc/type-doc-trecc.module#TreccTypeDocTreccModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TreccEntityModule {}
