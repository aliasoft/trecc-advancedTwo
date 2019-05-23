/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TreccTestModule } from '../../../test.module';
import { ParamNotifTreccDeleteDialogComponent } from 'app/entities/param-notif-trecc/param-notif-trecc-delete-dialog.component';
import { ParamNotifTreccService } from 'app/entities/param-notif-trecc/param-notif-trecc.service';

describe('Component Tests', () => {
  describe('ParamNotifTrecc Management Delete Component', () => {
    let comp: ParamNotifTreccDeleteDialogComponent;
    let fixture: ComponentFixture<ParamNotifTreccDeleteDialogComponent>;
    let service: ParamNotifTreccService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [ParamNotifTreccDeleteDialogComponent]
      })
        .overrideTemplate(ParamNotifTreccDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ParamNotifTreccDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParamNotifTreccService);
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
