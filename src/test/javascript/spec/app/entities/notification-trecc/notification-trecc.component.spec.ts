/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TreccTestModule } from '../../../test.module';
import { NotificationTreccComponent } from 'app/entities/notification-trecc/notification-trecc.component';
import { NotificationTreccService } from 'app/entities/notification-trecc/notification-trecc.service';
import { NotificationTrecc } from 'app/shared/model/notification-trecc.model';

describe('Component Tests', () => {
  describe('NotificationTrecc Management Component', () => {
    let comp: NotificationTreccComponent;
    let fixture: ComponentFixture<NotificationTreccComponent>;
    let service: NotificationTreccService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [NotificationTreccComponent],
        providers: []
      })
        .overrideTemplate(NotificationTreccComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NotificationTreccComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NotificationTreccService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NotificationTrecc(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.notifications[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
