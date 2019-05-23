/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TreccTestModule } from '../../../test.module';
import { CourrierTreccDetailComponent } from 'app/entities/courrier-trecc/courrier-trecc-detail.component';
import { CourrierTrecc } from 'app/shared/model/courrier-trecc.model';

describe('Component Tests', () => {
  describe('CourrierTrecc Management Detail Component', () => {
    let comp: CourrierTreccDetailComponent;
    let fixture: ComponentFixture<CourrierTreccDetailComponent>;
    const route = ({ data: of({ courrier: new CourrierTrecc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [CourrierTreccDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CourrierTreccDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CourrierTreccDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.courrier).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
