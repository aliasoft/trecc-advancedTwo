import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICourrierTrecc } from 'app/shared/model/courrier-trecc.model';
import { CourrierTreccService } from './courrier-trecc.service';

@Component({
  selector: 'jhi-courrier-trecc-delete-dialog',
  templateUrl: './courrier-trecc-delete-dialog.component.html'
})
export class CourrierTreccDeleteDialogComponent {
  courrier: ICourrierTrecc;

  constructor(
    protected courrierService: CourrierTreccService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.courrierService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'courrierListModification',
        content: 'Deleted an courrier'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-courrier-trecc-delete-popup',
  template: ''
})
export class CourrierTreccDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ courrier }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CourrierTreccDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.courrier = courrier;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/courrier-trecc', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/courrier-trecc', { outlets: { popup: null } }]);
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
