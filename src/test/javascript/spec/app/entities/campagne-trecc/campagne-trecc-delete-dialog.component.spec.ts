/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TreccTestModule } from '../../../test.module';
import { CampagneTreccDeleteDialogComponent } from 'app/entities/campagne-trecc/campagne-trecc-delete-dialog.component';
import { CampagneTreccService } from 'app/entities/campagne-trecc/campagne-trecc.service';

describe('Component Tests', () => {
  describe('CampagneTrecc Management Delete Component', () => {
    let comp: CampagneTreccDeleteDialogComponent;
    let fixture: ComponentFixture<CampagneTreccDeleteDialogComponent>;
    let service: CampagneTreccService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [CampagneTreccDeleteDialogComponent]
      })
        .overrideTemplate(CampagneTreccDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CampagneTreccDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CampagneTreccService);
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
