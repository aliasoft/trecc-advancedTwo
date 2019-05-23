import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ICampagneTrecc, CampagneTrecc } from 'app/shared/model/campagne-trecc.model';
import { CampagneTreccService } from './campagne-trecc.service';

@Component({
  selector: 'jhi-campagne-trecc-update',
  templateUrl: './campagne-trecc-update.component.html'
})
export class CampagneTreccUpdateComponent implements OnInit {
  campagne: ICampagneTrecc;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    idCampagne: [],
    statut: [],
    fichier: [],
    dateDebut: [],
    dateFin: []
  });

  constructor(protected campagneService: CampagneTreccService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ campagne }) => {
      this.updateForm(campagne);
      this.campagne = campagne;
    });
  }

  updateForm(campagne: ICampagneTrecc) {
    this.editForm.patchValue({
      id: campagne.id,
      idCampagne: campagne.idCampagne,
      statut: campagne.statut,
      fichier: campagne.fichier,
      dateDebut: campagne.dateDebut != null ? campagne.dateDebut.format(DATE_TIME_FORMAT) : null,
      dateFin: campagne.dateFin != null ? campagne.dateFin.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const campagne = this.createFromForm();
    if (campagne.id !== undefined) {
      this.subscribeToSaveResponse(this.campagneService.update(campagne));
    } else {
      this.subscribeToSaveResponse(this.campagneService.create(campagne));
    }
  }

  private createFromForm(): ICampagneTrecc {
    const entity = {
      ...new CampagneTrecc(),
      id: this.editForm.get(['id']).value,
      idCampagne: this.editForm.get(['idCampagne']).value,
      statut: this.editForm.get(['statut']).value,
      fichier: this.editForm.get(['fichier']).value,
      dateDebut:
        this.editForm.get(['dateDebut']).value != null ? moment(this.editForm.get(['dateDebut']).value, DATE_TIME_FORMAT) : undefined,
      dateFin: this.editForm.get(['dateFin']).value != null ? moment(this.editForm.get(['dateFin']).value, DATE_TIME_FORMAT) : undefined
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICampagneTrecc>>) {
    result.subscribe((res: HttpResponse<ICampagneTrecc>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
