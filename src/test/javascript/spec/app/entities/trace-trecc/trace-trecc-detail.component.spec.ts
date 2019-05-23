/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TreccTestModule } from '../../../test.module';
import { TraceTreccDetailComponent } from 'app/entities/trace-trecc/trace-trecc-detail.component';
import { TraceTrecc } from 'app/shared/model/trace-trecc.model';

describe('Component Tests', () => {
  describe('TraceTrecc Management Detail Component', () => {
    let comp: TraceTreccDetailComponent;
    let fixture: ComponentFixture<TraceTreccDetailComponent>;
    const route = ({ data: of({ trace: new TraceTrecc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [TraceTreccDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TraceTreccDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TraceTreccDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.trace).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
