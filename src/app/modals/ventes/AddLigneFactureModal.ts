import { DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { NgbActiveModal, NgbModal, NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, RequiredValidator } from "@angular/forms";
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, map } from "rxjs";
import { InvoiceData } from "../../models/invoiceData";
import { Depot } from "../../models/depot";
import { Article } from "../../models/article";

@Component({
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title">Ligne Facture</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
      <div class="container">
        <div class="col-auto form-group" [formGroup]="ligneFactureFormGroup">

            <div class="col-auto form-group ">
              <label for="article">Article</label>
              <input type="text" class="form-control" id="article" [ngbTypeahead]="articleSearch" [resultFormatter]="formatterArticle" [inputFormatter]="formatterArticle"
                    placeholder="Selectionner un article" formControlName="article" [ngClass]="{ 'is-invalid': submitted && f['article'].errors }"/>
              <div *ngIf="submitted && f['article'].errors" class="invalid-feedback">
                <div *ngIf="f['article'].errors['required']">Entrez le nom de l'article</div>
              </div>
            </div>

            <div class="col-auto form-group ">
              <label for="quantite">quantite</label>
              <input type="number" class="form-control" id="quantite"
                    placeholder="Entrer le quantite" formControlName="quantite" [ngClass]="{ 'is-invalid': submitted && f['quantite'].errors }"/>
              <div *ngIf="submitted && f['quantite'].errors" class="invalid-feedback">
                <div *ngIf="f['quantite'].errors['required']">Entrez la quantite</div>
              </div>
            </div>

            <div class="col-auto form-group ">
              <label for="prix_unitaire">Prix Unitaire</label>
              <input type="number" class="form-control" id="prix-unitaire"
                    placeholder="Entrer le prix unitaire" formControlName="prix_unitaire" [ngClass]="{ 'is-invalid': submitted && f['prix_unitaire'].errors }"/>
              <div *ngIf="submitted && f['prix_unitaire'].errors" class="invalid-feedback">
                <div *ngIf="f['prix_unitaire'].errors['required']">Entrez le prix unitaire</div>
              </div>
            </div>

            <div class="col-auto form-group ">
              <label for="depot">Depot</label>
              <input type="text" class="form-control" id="depot" [ngbTypeahead]="depotSearch" [resultFormatter]="formatterDepot" [inputFormatter]="formatterDepot"
                    placeholder="Selectionner un depot" formControlName="depot" [ngClass]="{ 'is-invalid': submitted && f['depot'].errors }"/>
              <div *ngIf="submitted && f['depot'].errors" class="invalid-feedback">
                <div *ngIf="f['depot'].errors['required']">Entrez le nom du depot</div>
              </div>
            </div>

          </div>
        </div>
    </div>

		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="addLigne(ligneFactureFormGroup)">Ajouter Ligne</button>
		</div>
	`,
  imports: [DatePipe, NgFor, NgIf, NgbTypeahead, NgClass, ReactiveFormsModule],
})
export class AddLigneFactureModal {


  @Input()
  invoiceData!:InvoiceData

  @Output()
  ligneFactureEvent = new EventEmitter();

  submitted:boolean = false;
  ligneFactureFormGroup:FormGroup;


  activeModal: NgbActiveModal = inject(NgbActiveModal);
  get f(): { [key: string]: AbstractControl<any, any> } { return this.ligneFactureFormGroup.controls;}

  formatterDepotResult = (x: { nomDepot: string, idDepot:number }) => x.nomDepot + ' | ' + x.idDepot;
  formatterDepot = (x: { nomDepot: string, idDepot:number }) => x.nomDepot ;

  formatterArticleResult = (x: { nomProduit: string, idProduit:number }) => x.nomProduit + ' | ' + x.idProduit;
  formatterArticle = (x: { nomProduit: string, idProduit:number }) => x.nomProduit ;

  articleSearch: OperatorFunction<string, readonly Article[]> =  (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map((term) =>
      term.length < 1 ? [] : this.invoiceData.articles.filter((v) => v.nomProduit.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
    ),
  );

  depotSearch: OperatorFunction<string, readonly Depot[]> =  (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map((term) =>
      term.length < 1 ? [] : this.invoiceData.depots.filter((v) => v.nomDepot.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
    ),
  );

  constructor(private formBuilder:FormBuilder){

    this.ligneFactureFormGroup = formBuilder.group({
      article: ['', new RequiredValidator],
      prix_unitaire: 0,
      quantite: 0,
      depot: ['', new RequiredValidator],
    })
  }

  ngOnInit():void{

  }

  addLigne(ligne:FormGroup){

    console.log(ligne)
    this.ligneFactureEvent.next(this.ligneFactureFormGroup.value)
  }


}
