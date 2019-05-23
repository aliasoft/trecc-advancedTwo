import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ITraceTrecc, TraceTrecc } from 'app/shared/model/trace-trecc.model';
import { TraceTreccService } from './trace-trecc.service';
import { ICourrierTrecc } from 'app/shared/model/courrier-trecc.model';
import { CourrierTreccService } from 'app/entities/courrier-trecc';

@Component({
  selector: 'jhi-trace-trecc-update',
  templateUrl: './trace-trecc-update.component.html'
})
export class TraceTreccUpdateComponent implements OnInit {
  trace: ITraceTrecc;
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
    protected traceService: TraceTreccService,
    protected courrierService: CourrierTreccService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ trace }) => {
      this.updateForm(trace);
      this.trace = trace;
    });
    this.courrierService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICourrierTrecc[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICourrierTrecc[]>) => response.body)
      )
      .subscribe((res: ICourrierTrecc[]) => (this.courriers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(trace: ITraceTrecc) {
    this.editForm.patchValue({
      id: trace.id,
      idTrace: trace.idTrace,
      typeCourrier: trace.typeCourrier,
      timestampProcess: trace.timestampProcess != null ? trace.timestampProcess.format(DATE_TIME_FORMAT) : null,
      idCpr: trace.idCpr,
      nir: trace.nir,
      adresseEntrante: trace.adresseEntrante,
      adresseEnrichie: trace.adresseEnrichie,
      email: trace.email,
      erreur: trace.erreur,
      fkCourrier: trace.fkCourrier
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const trace = this.createFromForm();
    if (trace.id !== undefined) {
      this.subscribeToSaveResponse(this.traceService.update(trace));
    } else {
      this.subscribeToSaveResponse(this.traceService.create(trace));
    }
  }

  private createFromForm(): ITraceTrecc {
    const entity = {
      ...new TraceTrecc(),
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITraceTrecc>>) {
    result.subscribe((res: HttpResponse<ITraceTrecc>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
