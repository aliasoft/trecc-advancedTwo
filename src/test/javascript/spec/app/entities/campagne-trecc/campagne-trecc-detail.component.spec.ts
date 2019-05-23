/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TreccTestModule } from '../../../test.module';
import { CampagneTreccDetailComponent } from 'app/entities/campagne-trecc/campagne-trecc-detail.component';
import { CampagneTrecc } from 'app/shared/model/campagne-trecc.model';

describe('Component Tests', () => {
  describe('CampagneTrecc Management Detail Component', () => {
    let comp: CampagneTreccDetailComponent;
    let fixture: ComponentFixture<CampagneTreccDetailComponent>;
    const route = ({ data: of({ campagne: new CampagneTrecc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [CampagneTreccDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CampagneTreccDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CampagneTreccDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.campagne).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
