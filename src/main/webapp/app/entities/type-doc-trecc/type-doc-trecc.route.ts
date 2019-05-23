import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TypeDocTrecc } from 'app/shared/model/type-doc-trecc.model';
import { TypeDocTreccService } from './type-doc-trecc.service';
import { TypeDocTreccComponent } from './type-doc-trecc.component';
import { TypeDocTreccDetailComponent } from './type-doc-trecc-detail.component';
import { TypeDocTreccUpdateComponent } from './type-doc-trecc-update.component';
import { TypeDocTreccDeletePopupComponent } from './type-doc-trecc-delete-dialog.component';
import { ITypeDocTrecc } from 'app/shared/model/type-doc-trecc.model';

@Injectable({ providedIn: 'root' })
export class TypeDocTreccResolve implements Resolve<ITypeDocTrecc> {
  constructor(private service: TypeDocTreccService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITypeDocTrecc> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TypeDocTrecc>) => response.ok),
        map((typeDoc: HttpResponse<TypeDocTrecc>) => typeDoc.body)
      );
    }
    return of(new TypeDocTrecc());
  }
}

export const typeDocRoute: Routes = [
  {
    path: '',
    component: TypeDocTreccComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TypeDocs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TypeDocTreccDetailComponent,
    resolve: {
      typeDoc: TypeDocTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TypeDocs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TypeDocTreccUpdateComponent,
    resolve: {
      typeDoc: TypeDocTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TypeDocs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TypeDocTreccUpdateComponent,
    resolve: {
      typeDoc: TypeDocTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TypeDocs'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const typeDocPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TypeDocTreccDeletePopupComponent,
    resolve: {
      typeDoc: TypeDocTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TypeDocs'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
