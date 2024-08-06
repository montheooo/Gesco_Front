import { DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { NgbActiveModal, NgbModal, NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ClientService } from "../../services/Clients/client.service";


@Component({
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title text-center text-danger">Nouveau Client</h4>
			<button type="button" class="btn btn-outline-danger" aria-label="Close" (click)="activeModal.dismiss()"></button>
		</div>
		<div class="modal-body">
      <div class="container">
          <div class="col-auto form-group" [formGroup]="clientFormGroup">

              <div class="col-auto form-group ">
                <label for="client">Nom Client</label>
                <input type="text" class="form-control" id="client"
                      placeholder="Entrez le nom du client" formControlName="nomClient" [ngClass]="{ 'is-invalid': submitted && f['nomClient'].errors }"/>
                <div *ngIf="submitted && f['nomClient'].errors" class="invalid-feedback">
                  <div *ngIf="f['nomClient'].errors['required']">Entrez le nom du client</div>
                </div>
              </div>

              <div class="col-auto form-group ">
                <label for="adresse-client">Adresse Client</label>
                <input type="text" class="form-control" id="adresse-client"
                      placeholder="Entrez l'adresse du client" formControlName="addresseClient" [ngClass]="{ 'is-invalid': submitted && f['addresseClient'].errors }"/>
                <div *ngIf="submitted && f['addresseClient'].errors" class="invalid-feedback">
                  <div *ngIf="f['addresseClient'].errors['required']">Entrez l'adresse du client</div>
                </div>
              </div>


              <div class="modal-footer">
                <button type="button"  class="btn btn-outline-danger" (click)="onSubmit()">Ajouter Client</button>
              </div>
          </div>
      </div>
    </div>


	`,
  imports: [DatePipe, NgFor, NgIf, NgClass, ReactiveFormsModule],
})
export class AddClientModal {

  submitted:boolean = false;
  clientFormGroup:FormGroup;


  activeModal: NgbActiveModal = inject(NgbActiveModal);
  get f() { return this.clientFormGroup.controls; }

  formatterDepotResult = (x: { nomDepot: string, idDepot:number }) => x.nomDepot + ' | ' + x.idDepot;
  formatterDepot = (x: { nomDepot: string, idDepot:number }) => x.nomDepot ;

  formatterArticleResult = (x: { nomProduit: string, idProduit:number }) => x.nomProduit + ' | ' + x.idProduit;
  formatterArticle = (x: { nomProduit: string, idProduit:number }) => x.nomProduit ;



  constructor(private formBuilder:FormBuilder, private clientService:ClientService){

    this.clientFormGroup = formBuilder.group({
      nomClient: ['', Validators.required],
      addresseClient: ['', Validators.required],

    });
  }

  ngOnInit():void{
  }

  onSubmit(){


    this.submitted = true;
    console.log(this.clientFormGroup);
    if (this.clientFormGroup.invalid) {
      console.log(this.clientFormGroup);
      return;
    }

    this.clientService.postClient(this.clientFormGroup.value).subscribe((value)=>{
      console.log(value);
      this.activeModal.close(value);
    });
  }


}
