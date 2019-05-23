/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CourrierTreccService } from 'app/entities/courrier-trecc/courrier-trecc.service';
import { ICourrierTrecc, CourrierTrecc } from 'app/shared/model/courrier-trecc.model';

describe('Service Tests', () => {
  describe('CourrierTrecc Service', () => {
    let injector: TestBed;
    let service: CourrierTreccService;
    let httpMock: HttpTestingController;
    let elemDefault: ICourrierTrecc;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(CourrierTreccService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new CourrierTrecc(0, 0, currentDate, currentDate, 0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            demandeEnvoi: currentDate.format(DATE_TIME_FORMAT),
            dateEnvoi: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a CourrierTrecc', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            demandeEnvoi: currentDate.format(DATE_TIME_FORMAT),
            dateEnvoi: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            demandeEnvoi: currentDate,
            dateEnvoi: currentDate
          },
          returnedFromService
        );
        service
          .create(new CourrierTrecc(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a CourrierTrecc', async () => {
        const returnedFromService = Object.assign(
          {
            idCourrier: 1,
            demandeEnvoi: currentDate.format(DATE_TIME_FORMAT),
            dateEnvoi: currentDate.format(DATE_TIME_FORMAT),
            idCpr: 1,
            nir: 'BBBBBB',
            typeCourrier: 'BBBBBB',
            modele: 'BBBBBB',
            statutGED: 'BBBBBB',
            statutEnvoiCourrier: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            demandeEnvoi: currentDate,
            dateEnvoi: currentDate
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

      it('should return a list of CourrierTrecc', async () => {
        const returnedFromService = Object.assign(
          {
            idCourrier: 1,
            demandeEnvoi: currentDate.format(DATE_TIME_FORMAT),
            dateEnvoi: currentDate.format(DATE_TIME_FORMAT),
            idCpr: 1,
            nir: 'BBBBBB',
            typeCourrier: 'BBBBBB',
            modele: 'BBBBBB',
            statutGED: 'BBBBBB',
            statutEnvoiCourrier: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            demandeEnvoi: currentDate,
            dateEnvoi: currentDate
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

      it('should delete a CourrierTrecc', async () => {
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
