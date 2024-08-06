import { DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { NgbActiveModal, NgbModal, NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { DepotService } from "../../services/depots/depot.service";


@Component({
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title text-center text-danger">Nouveau Depot</h4>
			<button type="button" class="btn btn-outline-danger" aria-label="Close" (click)="activeModal.dismiss()"></button>
		</div>
		<div class="modal-body">
      <div class="container">
          <div class="col-auto form-group" [formGroup]="depotFormGroup">

              <div class="col-auto form-group ">
                <label for="depot">Nom Depot</label>
                <input type="text" class="form-control" id="depot"
                      placeholder="Entrez le nom du depot" formControlName="nomdepot" [ngClass]="{ 'is-invalid': submitted && f['nomdepot'].errors }"/>
                <div *ngIf="submitted && f['nomdepot'].errors" class="invalid-feedback">
                  <div *ngIf="f['nomdepot'].errors['required']">Entrez le nom du depot</div>
                </div>
              </div>

              <div class="col-auto form-group ">
                <label for="adresse-depot">Adresse depot</label>
                <input type="text" class="form-control" id="adresse-depot"
                      placeholder="Entrez l'adresse du depot" formControlName="adressedepot" [ngClass]="{ 'is-invalid': submitted && f['adressedepot'].errors }"/>
                <div *ngIf="submitted && f['adressedepot'].errors" class="invalid-feedback">
                  <div *ngIf="f['adressedepot'].errors['required']">Entrez l'adresse du depot</div>
                </div>
              </div>


              <div class="modal-footer">
                <button type="button"  class="btn btn-outline-danger" (click)="onSubmit()">Ajouter depot</button>
              </div>
          </div>
      </div>
    </div>


	`,
  imports: [DatePipe, NgFor, NgIf, NgClass, ReactiveFormsModule],
})
export class AddDepotModal {

  submitted:boolean = false;
  depotFormGroup:FormGroup;


  activeModal: NgbActiveModal = inject(NgbActiveModal);
  get f() { return this.depotFormGroup.controls; }


  constructor(private formBuilder:FormBuilder, private depotService:DepotService){

    this.depotFormGroup = formBuilder.group({
      nomdepot: ['', Validators.required],
      adressedepot: ['', Validators.required],

    });
  }

  ngOnInit():void{
  }

  onSubmit(){


    this.submitted = true;
    console.log(this.depotFormGroup);
    if (this.depotFormGroup.invalid) {
      console.log(this.depotFormGroup);
      return;
    }

    this.depotService.postDepot(this.depotFormGroup.value).subscribe((value)=>{
      console.log(value);
      this.activeModal.close(value);
    });
  }


}
