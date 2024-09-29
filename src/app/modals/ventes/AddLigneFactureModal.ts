import { DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output, ViewChild, inject } from "@angular/core";
import { NgbActiveModal, NgbModal, NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge } from "rxjs";
import { InvoiceData } from "../../models/invoiceData";
import { Depot } from "../../models/depot";
import { Article } from "../../models/article";
import { AddArticleModal } from "../articles/AddArticleModal";
import { AddDepotModal } from "../depots/AddDepotModal";

@Component({
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title text-danger">Ligne Facture</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
      <div class="container">
          <div class="col-auto form-group" [formGroup]="ligneFactureFormGroup">

              <label for="article">Article</label>
              <div class="col-auto input-group ">
                <input type="text" class="form-control" id="article" [ngbTypeahead]="articleSearch" [resultFormatter]="formatterArticle" [inputFormatter]="formatterArticle" [selectOnExact]="true"
                      (focus)="focus$.next($any($event).target.value)" (click)="click$.next($any($event).target.value)" #instance="ngbTypeahead" popupClass="search-result"
                      [editable]="false" placeholder="Selectionner un article" placement="bottom-left" formControlName="article" [ngClass]="{ 'is-invalid': submitted && f['article'].errors }"/>
                <button class="btn btn-outline-danger " (click)="openAddArticle()" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                  </svg>
                </button>
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
                <label for="prixUnitaire">Prix Unitaire</label>
                <input type="number" class="form-control" id="prix-unitaire"
                      placeholder="Entrer le prix unitaire" formControlName="prixUnitaire" [ngClass]="{ 'is-invalid': submitted && f['prixUnitaire'].errors }"/>
                <div *ngIf="submitted && f['prixUnitaire'].errors" class="invalid-feedback">
                  <div *ngIf="f['prixUnitaire'].errors['required']">Entrez le prix unitaire</div>
                </div>
              </div>

              <label for="depot">Depot</label>
              <div class="col-auto input-group ">
                <input type="text" class="form-control" id="depot" [ngbTypeahead]="depotSearch" [resultFormatter]="formatterDepot" [inputFormatter]="formatterDepot" [selectOnExact]="true"
                      (focus)="focus$.next($any($event).target.value)" (click)="click$.next($any($event).target.value)" #instance="ngbTypeahead" popupClass="search-result"
                      [editable]="false" placeholder="Selectionner un depot" placement="bottom-left" formControlName="depot" [ngClass]="{ 'is-invalid': submitted && f['depot'].errors }"/>
                <button class="btn btn-outline-danger " (click)="openAddDepot()" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                  </svg>
                </button>
                <div *ngIf="submitted && f['depot'].errors" class="invalid-feedback">
                  <div *ngIf="f['depot'].errors['required']">Entrez le nom du depot</div>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button"  class="btn btn-outline-danger" (click)="onSubmit()">Ajouter Ligne</button>
              </div>
          </div>
      </div>
    </div>


	`,
  imports: [DatePipe, NgFor, NgIf, NgbTypeahead, NgClass, ReactiveFormsModule],
})
export class AddLigneFactureModal {


  @Input()
  invoiceData!:InvoiceData

  @Input()
  idLigne!:number

  @Output()
  ligneFactureEvent = new EventEmitter();

  submitted:boolean = false;
  ligneFactureFormGroup:FormGroup;

  focus$ = new Subject<string>();
	click$ = new Subject<string>();
  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  activeModal: NgbActiveModal = inject(NgbActiveModal);

  get f() { return this.ligneFactureFormGroup.controls; }

  formatterDepotResult = (x: { nomDepot: string, idDepot:number }) => x.nomDepot + ' | ' + x.idDepot;
  formatterDepot = (x: { nomDepot: string, idDepot:number }) => x.nomDepot ;

  formatterArticleResult = (x: { nomProduit: string, idProduit:number }) => x.nomProduit + ' | ' + x.idProduit;
  formatterArticle = (x: { nomProduit: string, idProduit:number }) => x.nomProduit ;



  articleSearch: OperatorFunction<string, readonly Article[]> = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
		const inputFocus$ = this.focus$;

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((term) =>
				(term === '' ? this.invoiceData.articles : this.invoiceData.articles.filter((v) => v.nomProduit.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
			),
		);
	};

  depotSearch: OperatorFunction<string, readonly Depot[]> = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
		const inputFocus$ = this.focus$;

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((term) =>
				(term === '' ? this.invoiceData.depots : this.invoiceData.depots.filter((v) => v.nomDepot.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
			),
		);
	};



  constructor(private formBuilder:FormBuilder, private modalService:NgbModal){

    this.ligneFactureFormGroup = formBuilder.group({
      article: ['', Validators.required],
      prixUnitaire: [, Validators.required],
      quantite: [, Validators.required],
      idLigne: this.idLigne,
      depot: ['', Validators.required],
    });
  }

  ngOnInit():void{

    this.ligneFactureFormGroup.controls['article'].valueChanges.subscribe(val => {

      if (this.ligneFactureFormGroup.controls['article'].value) {
        this.ligneFactureFormGroup.controls['prixUnitaire'].setValue(this.ligneFactureFormGroup.controls['article'].value.prixProduit);
      }
    });

  }

  onSubmit(){

    this.submitted = true;
    console.log(this.ligneFactureFormGroup);
    if (this.ligneFactureFormGroup.invalid) {
      console.log(this.ligneFactureFormGroup);
      return;
    }

    this.ligneFactureEvent.next(this.ligneFactureFormGroup.value);
  }

  openAddArticle(): void{

    const modalRef = this.modalService.open(AddArticleModal, { size: 'lg', centered:true, scrollable:true });

    modalRef.result.then((value:Article) => {
      console.log(value);
      this.invoiceData.articles.push(value);
      //this.invoiceFormGroup.controls['client'].setValue(value.nomClient);

    });

  }

  openAddDepot(): void{

    const modalRef = this.modalService.open(AddDepotModal, { size: 'lg', centered:true, scrollable:true });

    modalRef.result.then((value:Depot) => {
      console.log(value);
      this.invoiceData.depots.push(value);
      //this.invoiceFormGroup.controls['client'].setValue(value.nomClient);

    });

  }


}
