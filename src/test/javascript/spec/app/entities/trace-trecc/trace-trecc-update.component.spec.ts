/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TreccTestModule } from '../../../test.module';
import { TraceTreccUpdateComponent } from 'app/entities/trace-trecc/trace-trecc-update.component';
import { TraceTreccService } from 'app/entities/trace-trecc/trace-trecc.service';
import { TraceTrecc } from 'app/shared/model/trace-trecc.model';

describe('Component Tests', () => {
  describe('TraceTrecc Management Update Component', () => {
    let comp: TraceTreccUpdateComponent;
    let fixture: ComponentFixture<TraceTreccUpdateComponent>;
    let service: TraceTreccService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [TraceTreccUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TraceTreccUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TraceTreccUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TraceTreccService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TraceTrecc(123);
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
        const entity = new TraceTrecc();
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
