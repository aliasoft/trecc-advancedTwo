import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICampagneTrecc } from 'app/shared/model/campagne-trecc.model';
import { CampagneTreccService } from './campagne-trecc.service';

@Component({
  selector: 'jhi-campagne-trecc-delete-dialog',
  templateUrl: './campagne-trecc-delete-dialog.component.html'
})
export class CampagneTreccDeleteDialogComponent {
  campagne: ICampagneTrecc;

  constructor(
    protected campagneService: CampagneTreccService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.campagneService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'campagneListModification',
        content: 'Deleted an campagne'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-campagne-trecc-delete-popup',
  template: ''
})
export class CampagneTreccDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ campagne }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CampagneTreccDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.campagne = campagne;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/campagne-trecc', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/campagne-trecc', { outlets: { popup: null } }]);
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
