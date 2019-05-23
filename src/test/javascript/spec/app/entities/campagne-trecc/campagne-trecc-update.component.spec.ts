/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TreccTestModule } from '../../../test.module';
import { CampagneTreccUpdateComponent } from 'app/entities/campagne-trecc/campagne-trecc-update.component';
import { CampagneTreccService } from 'app/entities/campagne-trecc/campagne-trecc.service';
import { CampagneTrecc } from 'app/shared/model/campagne-trecc.model';

describe('Component Tests', () => {
  describe('CampagneTrecc Management Update Component', () => {
    let comp: CampagneTreccUpdateComponent;
    let fixture: ComponentFixture<CampagneTreccUpdateComponent>;
    let service: CampagneTreccService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [CampagneTreccUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CampagneTreccUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CampagneTreccUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CampagneTreccService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CampagneTrecc(123);
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
        const entity = new CampagneTrecc();
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
