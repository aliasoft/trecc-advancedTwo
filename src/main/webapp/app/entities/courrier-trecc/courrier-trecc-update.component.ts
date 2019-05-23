import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ICourrierTrecc, CourrierTrecc } from 'app/shared/model/courrier-trecc.model';
import { CourrierTreccService } from './courrier-trecc.service';
import { ICampagneTrecc } from 'app/shared/model/campagne-trecc.model';
import { CampagneTreccService } from 'app/entities/campagne-trecc';

@Component({
  selector: 'jhi-courrier-trecc-update',
  templateUrl: './courrier-trecc-update.component.html'
})
export class CourrierTreccUpdateComponent implements OnInit {
  courrier: ICourrierTrecc;
  isSaving: boolean;

  campagnes: ICampagneTrecc[];

  editForm = this.fb.group({
    id: [],
    idCourrier: [],
    demandeEnvoi: [],
    dateEnvoi: [],
    idCpr: [],
    nir: [],
    typeCourrier: [],
    modele: [],
    statutGED: [],
    statutEnvoiCourrier: [],
    fkCampagne: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected courrierService: CourrierTreccService,
    protected campagneService: CampagneTreccService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ courrier }) => {
      this.updateForm(courrier);
      this.courrier = courrier;
    });
    this.campagneService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICampagneTrecc[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICampagneTrecc[]>) => response.body)
      )
      .subscribe((res: ICampagneTrecc[]) => (this.campagnes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(courrier: ICourrierTrecc) {
    this.editForm.patchValue({
      id: courrier.id,
      idCourrier: courrier.idCourrier,
      demandeEnvoi: courrier.demandeEnvoi != null ? courrier.demandeEnvoi.format(DATE_TIME_FORMAT) : null,
      dateEnvoi: courrier.dateEnvoi != null ? courrier.dateEnvoi.format(DATE_TIME_FORMAT) : null,
      idCpr: courrier.idCpr,
      nir: courrier.nir,
      typeCourrier: courrier.typeCourrier,
      modele: courrier.modele,
      statutGED: courrier.statutGED,
      statutEnvoiCourrier: courrier.statutEnvoiCourrier,
      fkCampagne: courrier.fkCampagne
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const courrier = this.createFromForm();
    if (courrier.id !== undefined) {
      this.subscribeToSaveResponse(this.courrierService.update(courrier));
    } else {
      this.subscribeToSaveResponse(this.courrierService.create(courrier));
    }
  }

  private createFromForm(): ICourrierTrecc {
    const entity = {
      ...new CourrierTrecc(),
      id: this.editForm.get(['id']).value,
      idCourrier: this.editForm.get(['idCourrier']).value,
      demandeEnvoi:
        this.editForm.get(['demandeEnvoi']).value != null ? moment(this.editForm.get(['demandeEnvoi']).value, DATE_TIME_FORMAT) : undefined,
      dateEnvoi:
        this.editForm.get(['dateEnvoi']).value != null ? moment(this.editForm.get(['dateEnvoi']).value, DATE_TIME_FORMAT) : undefined,
      idCpr: this.editForm.get(['idCpr']).value,
      nir: this.editForm.get(['nir']).value,
      typeCourrier: this.editForm.get(['typeCourrier']).value,
      modele: this.editForm.get(['modele']).value,
      statutGED: this.editForm.get(['statutGED']).value,
      statutEnvoiCourrier: this.editForm.get(['statutEnvoiCourrier']).value,
      fkCampagne: this.editForm.get(['fkCampagne']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourrierTrecc>>) {
    result.subscribe((res: HttpResponse<ICourrierTrecc>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackCampagneById(index: number, item: ICampagneTrecc) {
    return item.id;
  }
}
