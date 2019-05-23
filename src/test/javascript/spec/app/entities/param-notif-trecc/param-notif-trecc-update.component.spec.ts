/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TreccTestModule } from '../../../test.module';
import { ParamNotifTreccUpdateComponent } from 'app/entities/param-notif-trecc/param-notif-trecc-update.component';
import { ParamNotifTreccService } from 'app/entities/param-notif-trecc/param-notif-trecc.service';
import { ParamNotifTrecc } from 'app/shared/model/param-notif-trecc.model';

describe('Component Tests', () => {
  describe('ParamNotifTrecc Management Update Component', () => {
    let comp: ParamNotifTreccUpdateComponent;
    let fixture: ComponentFixture<ParamNotifTreccUpdateComponent>;
    let service: ParamNotifTreccService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [ParamNotifTreccUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ParamNotifTreccUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParamNotifTreccUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParamNotifTreccService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ParamNotifTrecc(123);
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
        const entity = new ParamNotifTrecc();
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
