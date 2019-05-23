import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITraceTrecc } from 'app/shared/model/trace-trecc.model';
import { TraceTreccService } from './trace-trecc.service';

@Component({
  selector: 'jhi-trace-trecc-delete-dialog',
  templateUrl: './trace-trecc-delete-dialog.component.html'
})
export class TraceTreccDeleteDialogComponent {
  trace: ITraceTrecc;

  constructor(protected traceService: TraceTreccService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.traceService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'traceListModification',
        content: 'Deleted an trace'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-trace-trecc-delete-popup',
  template: ''
})
export class TraceTreccDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ trace }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TraceTreccDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.trace = trace;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/trace-trecc', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/trace-trecc', { outlets: { popup: null } }]);
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
