/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TreccTestModule } from '../../../test.module';
import { NotificationTreccDeleteDialogComponent } from 'app/entities/notification-trecc/notification-trecc-delete-dialog.component';
import { NotificationTreccService } from 'app/entities/notification-trecc/notification-trecc.service';

describe('Component Tests', () => {
  describe('NotificationTrecc Management Delete Component', () => {
    let comp: NotificationTreccDeleteDialogComponent;
    let fixture: ComponentFixture<NotificationTreccDeleteDialogComponent>;
    let service: NotificationTreccService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [NotificationTreccDeleteDialogComponent]
      })
        .overrideTemplate(NotificationTreccDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NotificationTreccDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NotificationTreccService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
