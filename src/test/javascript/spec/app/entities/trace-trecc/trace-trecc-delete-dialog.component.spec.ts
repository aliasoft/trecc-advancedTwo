/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TreccTestModule } from '../../../test.module';
import { TraceTreccDeleteDialogComponent } from 'app/entities/trace-trecc/trace-trecc-delete-dialog.component';
import { TraceTreccService } from 'app/entities/trace-trecc/trace-trecc.service';

describe('Component Tests', () => {
  describe('TraceTrecc Management Delete Component', () => {
    let comp: TraceTreccDeleteDialogComponent;
    let fixture: ComponentFixture<TraceTreccDeleteDialogComponent>;
    let service: TraceTreccService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [TraceTreccDeleteDialogComponent]
      })
        .overrideTemplate(TraceTreccDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TraceTreccDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TraceTreccService);
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
