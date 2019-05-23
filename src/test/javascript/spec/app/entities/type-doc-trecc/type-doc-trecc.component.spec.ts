/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TreccTestModule } from '../../../test.module';
import { TypeDocTreccComponent } from 'app/entities/type-doc-trecc/type-doc-trecc.component';
import { TypeDocTreccService } from 'app/entities/type-doc-trecc/type-doc-trecc.service';
import { TypeDocTrecc } from 'app/shared/model/type-doc-trecc.model';

describe('Component Tests', () => {
  describe('TypeDocTrecc Management Component', () => {
    let comp: TypeDocTreccComponent;
    let fixture: ComponentFixture<TypeDocTreccComponent>;
    let service: TypeDocTreccService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [TypeDocTreccComponent],
        providers: []
      })
        .overrideTemplate(TypeDocTreccComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TypeDocTreccComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TypeDocTreccService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TypeDocTrecc(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.typeDocs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
