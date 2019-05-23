/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TreccTestModule } from '../../../test.module';
import { TypeDocTreccUpdateComponent } from 'app/entities/type-doc-trecc/type-doc-trecc-update.component';
import { TypeDocTreccService } from 'app/entities/type-doc-trecc/type-doc-trecc.service';
import { TypeDocTrecc } from 'app/shared/model/type-doc-trecc.model';

describe('Component Tests', () => {
  describe('TypeDocTrecc Management Update Component', () => {
    let comp: TypeDocTreccUpdateComponent;
    let fixture: ComponentFixture<TypeDocTreccUpdateComponent>;
    let service: TypeDocTreccService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [TypeDocTreccUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TypeDocTreccUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TypeDocTreccUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TypeDocTreccService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TypeDocTrecc(123);
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
        const entity = new TypeDocTrecc();
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
