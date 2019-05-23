/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TreccTestModule } from '../../../test.module';
import { ParamNotifTreccDetailComponent } from 'app/entities/param-notif-trecc/param-notif-trecc-detail.component';
import { ParamNotifTrecc } from 'app/shared/model/param-notif-trecc.model';

describe('Component Tests', () => {
  describe('ParamNotifTrecc Management Detail Component', () => {
    let comp: ParamNotifTreccDetailComponent;
    let fixture: ComponentFixture<ParamNotifTreccDetailComponent>;
    const route = ({ data: of({ paramNotif: new ParamNotifTrecc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [ParamNotifTreccDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ParamNotifTreccDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ParamNotifTreccDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paramNotif).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
