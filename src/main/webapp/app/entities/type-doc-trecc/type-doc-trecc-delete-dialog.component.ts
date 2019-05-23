import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITypeDocTrecc } from 'app/shared/model/type-doc-trecc.model';
import { TypeDocTreccService } from './type-doc-trecc.service';

@Component({
  selector: 'jhi-type-doc-trecc-delete-dialog',
  templateUrl: './type-doc-trecc-delete-dialog.component.html'
})
export class TypeDocTreccDeleteDialogComponent {
  typeDoc: ITypeDocTrecc;

  constructor(protected typeDocService: TypeDocTreccService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.typeDocService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'typeDocListModification',
        content: 'Deleted an typeDoc'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-type-doc-trecc-delete-popup',
  template: ''
})
export class TypeDocTreccDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ typeDoc }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TypeDocTreccDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.typeDoc = typeDoc;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/type-doc-trecc', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/type-doc-trecc', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
