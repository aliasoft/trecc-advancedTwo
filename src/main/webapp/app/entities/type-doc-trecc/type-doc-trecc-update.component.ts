import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITypeDocTrecc, TypeDocTrecc } from 'app/shared/model/type-doc-trecc.model';
import { TypeDocTreccService } from './type-doc-trecc.service';

@Component({
  selector: 'jhi-type-doc-trecc-update',
  templateUrl: './type-doc-trecc-update.component.html'
})
export class TypeDocTreccUpdateComponent implements OnInit {
  typeDoc: ITypeDocTrecc;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    typeDoc: [],
    nomCourrier: [],
    nomEmail: [],
    nomEp: []
  });

  constructor(protected typeDocService: TypeDocTreccService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ typeDoc }) => {
      this.updateForm(typeDoc);
      this.typeDoc = typeDoc;
    });
  }

  updateForm(typeDoc: ITypeDocTrecc) {
    this.editForm.patchValue({
      id: typeDoc.id,
      typeDoc: typeDoc.typeDoc,
      nomCourrier: typeDoc.nomCourrier,
      nomEmail: typeDoc.nomEmail,
      nomEp: typeDoc.nomEp
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const typeDoc = this.createFromForm();
    if (typeDoc.id !== undefined) {
      this.subscribeToSaveResponse(this.typeDocService.update(typeDoc));
    } else {
      this.subscribeToSaveResponse(this.typeDocService.create(typeDoc));
    }
  }

  private createFromForm(): ITypeDocTrecc {
    const entity = {
      ...new TypeDocTrecc(),
      id: this.editForm.get(['id']).value,
      typeDoc: this.editForm.get(['typeDoc']).value,
      nomCourrier: this.editForm.get(['nomCourrier']).value,
      nomEmail: this.editForm.get(['nomEmail']).value,
      nomEp: this.editForm.get(['nomEp']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeDocTrecc>>) {
    result.subscribe((res: HttpResponse<ITypeDocTrecc>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
