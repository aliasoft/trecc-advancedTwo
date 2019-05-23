/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { NotificationTreccService } from 'app/entities/notification-trecc/notification-trecc.service';
import { INotificationTrecc, NotificationTrecc } from 'app/shared/model/notification-trecc.model';

describe('Service Tests', () => {
  describe('NotificationTrecc Service', () => {
    let injector: TestBed;
    let service: NotificationTreccService;
    let httpMock: HttpTestingController;
    let elemDefault: INotificationTrecc;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(NotificationTreccService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new NotificationTrecc(0, 0, 'AAAAAAA', currentDate, 0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            timestampProcess: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a NotificationTrecc', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            timestampProcess: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            timestampProcess: currentDate
          },
          returnedFromService
        );
        service
          .create(new NotificationTrecc(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a NotificationTrecc', async () => {
        const returnedFromService = Object.assign(
          {
            idTrace: 1,
            typeCourrier: 'BBBBBB',
            timestampProcess: currentDate.format(DATE_TIME_FORMAT),
            idCpr: 1,
            nir: 'BBBBBB',
            adresseEntrante: 'BBBBBB',
            adresseEnrichie: 'BBBBBB',
            email: 'BBBBBB',
            erreur: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            timestampProcess: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of NotificationTrecc', async () => {
        const returnedFromService = Object.assign(
          {
            idTrace: 1,
            typeCourrier: 'BBBBBB',
            timestampProcess: currentDate.format(DATE_TIME_FORMAT),
            idCpr: 1,
            nir: 'BBBBBB',
            adresseEntrante: 'BBBBBB',
            adresseEnrichie: 'BBBBBB',
            email: 'BBBBBB',
            erreur: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            timestampProcess: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a NotificationTrecc', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
