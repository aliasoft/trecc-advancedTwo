/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TreccTestModule } from '../../../test.module';
import { CourrierTreccUpdateComponent } from 'app/entities/courrier-trecc/courrier-trecc-update.component';
import { CourrierTreccService } from 'app/entities/courrier-trecc/courrier-trecc.service';
import { CourrierTrecc } from 'app/shared/model/courrier-trecc.model';

describe('Component Tests', () => {
  describe('CourrierTrecc Management Update Component', () => {
    let comp: CourrierTreccUpdateComponent;
    let fixture: ComponentFixture<CourrierTreccUpdateComponent>;
    let service: CourrierTreccService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [CourrierTreccUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CourrierTreccUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CourrierTreccUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CourrierTreccService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CourrierTrecc(123);
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
        const entity = new CourrierTrecc();
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
