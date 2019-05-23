import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParamNotifTrecc } from 'app/shared/model/param-notif-trecc.model';
import { ParamNotifTreccService } from './param-notif-trecc.service';

@Component({
  selector: 'jhi-param-notif-trecc-delete-dialog',
  templateUrl: './param-notif-trecc-delete-dialog.component.html'
})
export class ParamNotifTreccDeleteDialogComponent {
  paramNotif: IParamNotifTrecc;

  constructor(
    protected paramNotifService: ParamNotifTreccService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.paramNotifService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'paramNotifListModification',
        content: 'Deleted an paramNotif'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-param-notif-trecc-delete-popup',
  template: ''
})
export class ParamNotifTreccDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ paramNotif }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ParamNotifTreccDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.paramNotif = paramNotif;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/param-notif-trecc', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/param-notif-trecc', { outlets: { popup: null } }]);
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
