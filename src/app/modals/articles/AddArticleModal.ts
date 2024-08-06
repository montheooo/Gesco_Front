import { DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { NgbActiveModal, NgbModal, NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ClientService } from "../../services/Clients/client.service";
import { ArticleService } from "../../services/articles/article.service";


@Component({
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title text-center text-danger">Nouveau Article</h4>
			<button type="button" class="btn btn-outline-danger" aria-label="Close" (click)="activeModal.dismiss()"></button>
		</div>
		<div class="modal-body">
      <div class="container">
          <div class="col-auto form-group" [formGroup]="articleFormGroup">

              <div class="col-auto form-group ">
                <label for="client">Nom Article</label>
                <input type="text" class="form-control" id="article"
                      placeholder="Entrez le nom du produit" formControlName="nomProduit" [ngClass]="{ 'is-invalid': submitted && f['nomProduit'].errors }"/>
                <div *ngIf="submitted && f['nomProduit'].errors" class="invalid-feedback">
                  <div *ngIf="f['nomProduit'].errors['required']">Entrez le nom du Produit</div>
                </div>
              </div>

              <div class="col-auto form-group ">
                <label for="prix-produit">Prix Produit</label>
                <input type="number" class="form-control" id="prix-produit"
                      placeholder="Entrez le prix du produit" formControlName="prixProduit" [ngClass]="{ 'is-invalid': submitted && f['prixProduit'].errors }"/>
                <div *ngIf="submitted && f['prixProduit'].errors" class="invalid-feedback">
                  <div *ngIf="f['prixProduit'].errors['required']">Entrez le prix du produit</div>
                </div>
              </div>

              <div class="col-auto form-group ">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" formControlName="suiviStock" id="flexCheckChecked">
                  <label class="form-check-label" for="flexCheckChecked">
                    Suivi Stock
                  </label>
                  <div *ngIf="submitted && f['suiviStock'].errors" class="invalid-feedback">
                  <div *ngIf="f['suiviStock'].errors['required']">Entrez le suivi stock</div>
                </div>
                </div>
              </div>



              <div class="modal-footer">
                <button type="button"  class="btn btn-outline-danger" (click)="onSubmit()">Ajouter Produit</button>
              </div>
          </div>
      </div>
    </div>


	`,
  imports: [DatePipe, NgFor, NgIf, NgClass, ReactiveFormsModule],
})
export class AddArticleModal {

  submitted:boolean = false;
  articleFormGroup:FormGroup;


  activeModal: NgbActiveModal = inject(NgbActiveModal);
  get f() { return this.articleFormGroup.controls; }

  formatterDepotResult = (x: { nomDepot: string, idDepot:number }) => x.nomDepot + ' | ' + x.idDepot;
  formatterDepot = (x: { nomDepot: string, idDepot:number }) => x.nomDepot ;

  formatterArticleResult = (x: { nomProduit: string, idProduit:number }) => x.nomProduit + ' | ' + x.idProduit;
  formatterArticle = (x: { nomProduit: string, idProduit:number }) => x.nomProduit ;



  constructor(private formBuilder:FormBuilder, private articleService:ArticleService){

    this.articleFormGroup = formBuilder.group({
      nomProduit: ['', Validators.required],
      prixProduit: ['', Validators.required],
      suiviStock: ['', Validators.required],

    });
  }

  ngOnInit():void{

    this.articleFormGroup.controls['suiviStock'].valueChanges.subscribe(val => {

    (this.articleFormGroup.controls['suiviStock'].value == true) ? this.articleFormGroup.controls['suiviStock'].setValue(1):this.articleFormGroup.controls['suiviStock'].setValue(0)

    });
  }

  onSubmit(){


    this.submitted = true;
    console.log(this.articleFormGroup);
    if (this.articleFormGroup.invalid) {
      console.log(this.articleFormGroup);
      return;
    }

    this.articleService.postArticle(this.articleFormGroup.value).subscribe((value)=>{
      console.log(value);
      this.activeModal.close(value);
    });
  }


}
