/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TreccTestModule } from '../../../test.module';
import { NotificationTreccUpdateComponent } from 'app/entities/notification-trecc/notification-trecc-update.component';
import { NotificationTreccService } from 'app/entities/notification-trecc/notification-trecc.service';
import { NotificationTrecc } from 'app/shared/model/notification-trecc.model';

describe('Component Tests', () => {
  describe('NotificationTrecc Management Update Component', () => {
    let comp: NotificationTreccUpdateComponent;
    let fixture: ComponentFixture<NotificationTreccUpdateComponent>;
    let service: NotificationTreccService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [NotificationTreccUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NotificationTreccUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NotificationTreccUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NotificationTreccService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NotificationTrecc(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new NotificationTrecc();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
