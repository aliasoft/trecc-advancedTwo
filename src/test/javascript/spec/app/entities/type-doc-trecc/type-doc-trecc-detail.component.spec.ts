/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TreccTestModule } from '../../../test.module';
import { TypeDocTreccDetailComponent } from 'app/entities/type-doc-trecc/type-doc-trecc-detail.component';
import { TypeDocTrecc } from 'app/shared/model/type-doc-trecc.model';

describe('Component Tests', () => {
  describe('TypeDocTrecc Management Detail Component', () => {
    let comp: TypeDocTreccDetailComponent;
    let fixture: ComponentFixture<TypeDocTreccDetailComponent>;
    const route = ({ data: of({ typeDoc: new TypeDocTrecc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [TypeDocTreccDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TypeDocTreccDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TypeDocTreccDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.typeDoc).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
