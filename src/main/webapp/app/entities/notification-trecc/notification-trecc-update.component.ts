import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { INotificationTrecc, NotificationTrecc } from 'app/shared/model/notification-trecc.model';
import { NotificationTreccService } from './notification-trecc.service';
import { ICourrierTrecc } from 'app/shared/model/courrier-trecc.model';
import { CourrierTreccService } from 'app/entities/courrier-trecc';

@Component({
  selector: 'jhi-notification-trecc-update',
  templateUrl: './notification-trecc-update.component.html'
})
export class NotificationTreccUpdateComponent implements OnInit {
  notification: INotificationTrecc;
  isSaving: boolean;

  courriers: ICourrierTrecc[];

  editForm = this.fb.group({
    id: [],
    idTrace: [],
    typeCourrier: [],
    timestampProcess: [],
    idCpr: [],
    nir: [],
    adresseEntrante: [],
    adresseEnrichie: [],
    email: [],
    erreur: [],
    fkCourrier: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected notificationService: NotificationTreccService,
    protected courrierService: CourrierTreccService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ notification }) => {
      this.updateForm(notification);
      this.notification = notification;
    });
    this.courrierService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICourrierTrecc[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICourrierTrecc[]>) => response.body)
      )
      .subscribe((res: ICourrierTrecc[]) => (this.courriers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(notification: INotificationTrecc) {
    this.editForm.patchValue({
      id: notification.id,
      idTrace: notification.idTrace,
      typeCourrier: notification.typeCourrier,
      timestampProcess: notification.timestampProcess != null ? notification.timestampProcess.format(DATE_TIME_FORMAT) : null,
      idCpr: notification.idCpr,
      nir: notification.nir,
      adresseEntrante: notification.adresseEntrante,
      adresseEnrichie: notification.adresseEnrichie,
      email: notification.email,
      erreur: notification.erreur,
      fkCourrier: notification.fkCourrier
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const notification = this.createFromForm();
    if (notification.id !== undefined) {
      this.subscribeToSaveResponse(this.notificationService.update(notification));
    } else {
      this.subscribeToSaveResponse(this.notificationService.create(notification));
    }
  }

  private createFromForm(): INotificationTrecc {
    const entity = {
      ...new NotificationTrecc(),
      id: this.editForm.get(['id']).value,
      idTrace: this.editForm.get(['idTrace']).value,
      typeCourrier: this.editForm.get(['typeCourrier']).value,
      timestampProcess:
        this.editForm.get(['timestampProcess']).value != null
          ? moment(this.editForm.get(['timestampProcess']).value, DATE_TIME_FORMAT)
          : undefined,
      idCpr: this.editForm.get(['idCpr']).value,
      nir: this.editForm.get(['nir']).value,
      adresseEntrante: this.editForm.get(['adresseEntrante']).value,
      adresseEnrichie: this.editForm.get(['adresseEnrichie']).value,
      email: this.editForm.get(['email']).value,
      erreur: this.editForm.get(['erreur']).value,
      fkCourrier: this.editForm.get(['fkCourrier']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INotificationTrecc>>) {
    result.subscribe((res: HttpResponse<INotificationTrecc>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCourrierById(index: number, item: ICourrierTrecc) {
    return item.id;
  }
}
