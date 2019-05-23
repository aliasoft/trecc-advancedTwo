/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TreccTestModule } from '../../../test.module';
import { ParamNotifTreccComponent } from 'app/entities/param-notif-trecc/param-notif-trecc.component';
import { ParamNotifTreccService } from 'app/entities/param-notif-trecc/param-notif-trecc.service';
import { ParamNotifTrecc } from 'app/shared/model/param-notif-trecc.model';

describe('Component Tests', () => {
  describe('ParamNotifTrecc Management Component', () => {
    let comp: ParamNotifTreccComponent;
    let fixture: ComponentFixture<ParamNotifTreccComponent>;
    let service: ParamNotifTreccService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TreccTestModule],
        declarations: [ParamNotifTreccComponent],
        providers: []
      })
        .overrideTemplate(ParamNotifTreccComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParamNotifTreccComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParamNotifTreccService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ParamNotifTrecc(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.paramNotifs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
