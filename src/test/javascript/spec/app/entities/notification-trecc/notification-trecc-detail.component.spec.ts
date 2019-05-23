/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TreccTestModule } from '../../../test.module';
import { NotificationTreccDetailComponent } from 'app/entities/notification-trecc/notification-trecc-detail.component';
import { NotificationTrecc } from 'app/shared/model/notification-trecc.model';

describe('Component Tests', () => {
  describe('NotificationTrecc Management Detail Component', () => {
    let comp: NotificationTreccDetailComponent;
    let fixture: ComponentFixture<NotificationTreccDetailComponent>;
    const route = ({ data: of({ notification: new NotificationTrecc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [NotificationTreccDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NotificationTreccDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NotificationTreccDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.notification).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
