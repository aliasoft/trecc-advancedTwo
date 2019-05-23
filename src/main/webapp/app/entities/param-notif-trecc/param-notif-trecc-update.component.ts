import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IParamNotifTrecc, ParamNotifTrecc } from 'app/shared/model/param-notif-trecc.model';
import { ParamNotifTreccService } from './param-notif-trecc.service';

@Component({
  selector: 'jhi-param-notif-trecc-update',
  templateUrl: './param-notif-trecc-update.component.html'
})
export class ParamNotifTreccUpdateComponent implements OnInit {
  paramNotif: IParamNotifTrecc;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    maxEnvoi: [],
    envoiEnCours: [],
    debutHoraire: [],
    finHoraire: []
  });

  constructor(protected paramNotifService: ParamNotifTreccService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ paramNotif }) => {
      this.updateForm(paramNotif);
      this.paramNotif = paramNotif;
    });
  }

  updateForm(paramNotif: IParamNotifTrecc) {
    this.editForm.patchValue({
      id: paramNotif.id,
      maxEnvoi: paramNotif.maxEnvoi,
      envoiEnCours: paramNotif.envoiEnCours,
      debutHoraire: paramNotif.debutHoraire != null ? paramNotif.debutHoraire.format(DATE_TIME_FORMAT) : null,
      finHoraire: paramNotif.finHoraire != null ? paramNotif.finHoraire.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const paramNotif = this.createFromForm();
    if (paramNotif.id !== undefined) {
      this.subscribeToSaveResponse(this.paramNotifService.update(paramNotif));
    } else {
      this.subscribeToSaveResponse(this.paramNotifService.create(paramNotif));
    }
  }

  private createFromForm(): IParamNotifTrecc {
    const entity = {
      ...new ParamNotifTrecc(),
      id: this.editForm.get(['id']).value,
      maxEnvoi: this.editForm.get(['maxEnvoi']).value,
      envoiEnCours: this.editForm.get(['envoiEnCours']).value,
      debutHoraire:
        this.editForm.get(['debutHoraire']).value != null ? moment(this.editForm.get(['debutHoraire']).value, DATE_TIME_FORMAT) : undefined,
      finHoraire:
        this.editForm.get(['finHoraire']).value != null ? moment(this.editForm.get(['finHoraire']).value, DATE_TIME_FORMAT) : undefined
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParamNotifTrecc>>) {
    result.subscribe((res: HttpResponse<IParamNotifTrecc>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
