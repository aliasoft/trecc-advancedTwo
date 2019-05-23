import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INotificationTrecc } from 'app/shared/model/notification-trecc.model';
import { NotificationTreccService } from './notification-trecc.service';

@Component({
  selector: 'jhi-notification-trecc-delete-dialog',
  templateUrl: './notification-trecc-delete-dialog.component.html'
})
export class NotificationTreccDeleteDialogComponent {
  notification: INotificationTrecc;

  constructor(
    protected notificationService: NotificationTreccService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.notificationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'notificationListModification',
        content: 'Deleted an notification'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-notification-trecc-delete-popup',
  template: ''
})
export class NotificationTreccDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ notification }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(NotificationTreccDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.notification = notification;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/notification-trecc', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/notification-trecc', { outlets: { popup: null } }]);
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
