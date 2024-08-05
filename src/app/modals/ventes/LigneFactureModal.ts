import { DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal, NgbDatepickerModule, NgbModal, NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { InvoiceLine } from "../../models/invoiceLine";
import { InvoiceData } from "../../models/invoiceData";
import { InvoiceListService } from "../../services/invoices/invoice-list.service";
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, map } from "rxjs";
import { Article } from "../../models/article";
import { Depot } from "../../models/depot";
import { Invoice } from "../../models/invoice";


@Component({
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title">Lignes Facture {{facture.referenceFacture}}</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
      <div class="container">
        <div *ngIf="edited" class="col-auto form-group" [formGroup]="ligneFactureFormGroup">

            <div class="col-auto form-group">
              <label for="ligne">No Ligne</label>
              <input type="text" class="form-control" id="ligne" formControlName="ligne" readonly>

            </div>

            <div class="col-auto form-group ">
              <label for="article">Article</label><span *ngIf="this.edited == true" [ngClass]="{ 'text-danger p-3': edited }">{{this.label.article}}</span>
              <input type="text" class="form-control" id="article" [ngbTypeahead]="articleSearch" [resultFormatter]="formatterArticle" [inputFormatter]="formatterArticle"
                    placeholder="Selectionner un article" formControlName="article" [ngClass]="{ 'is-invalid': edited }"/>
            </div>

            <div class="col-auto form-group ">
              <label for="quantite">quantite</label><!--<span *ngIf="this.edited == true" [ngClass]="{ 'text-danger p-3': edited }">{{this.label.quantite}}</span>-->
              <input type="number" class="form-control" id="quantite"
                    placeholder="Entrer le quantite" formControlName="quantite" [ngClass]="{ 'is-invalid': submitted && f['quantite'].errors }"/>
              <div *ngIf="submitted && f['quantite'].errors" class="invalid-feedback">
                <div *ngIf="f['quantite'].errors['required']">Entrez la quantite</div>
              </div>
            </div>

            <div class="col-auto form-group ">
              <label for="prix_unitaire">Prix Unitaire</label><!--<span *ngIf="this.edited == true" [ngClass]="{ 'text-danger p-3': edited }">{{this.label.prix_unitaire}}</span>-->
              <input type="number" class="form-control" id="prix-unitaire"
                    placeholder="Entrer le prix unitaire" formControlName="prix_unitaire" [ngClass]="{ 'is-invalid': submitted && f['prix_unitaire'].errors }"/>
              <div *ngIf="submitted && f['prix_unitaire'].errors" class="invalid-feedback">
                <div *ngIf="f['prix_unitaire'].errors['required']">Entrez le prix unitaire</div>
              </div>
            </div>

            <div class="col-auto form-group ">
              <label for="montant">Montant</label><!--<span *ngIf="this.edited == true" [ngClass]="{ 'text-danger p-3': edited }">{{this.label.montant}}</span>-->
              <input type="number" class="form-control" value="{{this.ligneFactureFormGroup.controls['prix_unitaire'].value*this.ligneFactureFormGroup.controls['quantite'].value}}" id="montant" readonly/>

            </div>

            <div class="col-auto form-group ">
              <label for="depot">Depot</label><span *ngIf="this.edited == true" [ngClass]="{ 'text-danger p-3': edited }">{{this.label.depot}}</span>
              <input type="text" class="form-control" id="depot" [ngbTypeahead]="depotSearch" [resultFormatter]="formatterDepot" [inputFormatter]="formatterDepot"
                    placeholder="Selectionner un depot" formControlName="depot" [ngClass]="{ 'is-invalid': edited }"/>

            </div>

            <div class="col-auto form-group ">
              <button (click)=" update_ligne()" type="button" class="btn btn-outline-dark mt-3" >Modifier Ligne</button>
            </div>


        </div> <!-- Form Edit -->

        <div class="gy-2 gx-3 align-items-center" >
            <table class="table table-responsive">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Article</th>
                  <th>Qte</th>
                  <th>PU</th>
                  <th>Depot</th>
                  <th>Montant</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let ligne of facture.ligneFactures" >
                  <ng-container  *ngIf="ligne.idLigne == this.ligneFactureFormGroup.controls['ligne'].value && this.edited == true ">
                    <td class="text-danger">{{ligne.idLigne}}</td>
                    <td class="text-danger">{{ligne.nomArticle}}</td>
                    <td class="text-danger">{{ ligne.quantite}}</td>
                    <td class="text-danger">{{ ligne.prixUnitaire}}</td>
                    <td class="text-danger"><b>{{ ligne.nomDepot}}</b></td>
                    <td class="text-danger">{{ ligne.prixUnitaire * ligne.quantite}}</td>

                    <td>
                      <a (click)="update(ligne)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                        </svg>
                      </a>
                      |
                      <a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                      </a>
                    </td>
                  </ng-container>
                  <ng-container *ngIf="ligne.idLigne !== this.ligneFactureFormGroup.controls['ligne'].value && this.edited == true ">
                    <td>{{ligne.idLigne}}</td>
                    <td>{{ligne.nomArticle}}</td>
                    <td>{{ ligne.quantite}}</td>
                    <td>{{ ligne.prixUnitaire}}</td>
                    <td><b>{{ ligne.nomDepot}}</b></td>
                    <td>{{ ligne.prixUnitaire * ligne.quantite}}</td>

                    <td>
                      <a (click)="update(ligne)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                        </svg>
                      </a>
                      |
                      <a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                      </a>
                    </td>
                  </ng-container>
                  <ng-container *ngIf="this.edited == false ">
                    <td>{{ligne.idLigne}}</td>
                    <td>{{ligne.nomArticle}}</td>
                    <td>{{ ligne.quantite}}</td>
                    <td>{{ ligne.prixUnitaire}}</td>
                    <td><b>{{ ligne.nomDepot}}</b></td>
                    <td>{{ ligne.prixUnitaire * ligne.quantite}}</td>

                    <td>
                      <a (click)="update(ligne)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                        </svg>
                      </a>
                      |
                      <a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                      </a>
                    </td>
                  </ng-container>
                </tr>

                <tr>
                <ng-container  *ngIf="this.edited == true ">
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th class="text-danger"> New Total</th>
                  <th class="text-danger">{{ this.sum}}</th>
                  <th></th>
                </ng-container>
                <ng-container  *ngIf="this.edited == false ">
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Total</th>
                  <th>{{ this.sum}}</th>
                  <th></th>
                </ng-container>
                </tr>
              </tbody>
            </table>
        </div> <!-- Table -->
      </div>
		</div>
		<div class="modal-footer">

      <div class="col-auto form-group ">
        <button (click)=" update_invoice()" type="button" class="btn btn-outline-danger mt-3" >Enregistrer</button>
      </div>
		</div>
	`,
  imports: [DatePipe, NgFor, NgIf, NgClass, NgbTypeahead, NgbDatepickerModule, ReactiveFormsModule],
})
export class LigneFactureVentesModal {

  @Input()
  invoiceData!:InvoiceData

  @Input()
  facture!:Invoice

  submitted:boolean = false;
  edited:boolean = false;
  sum:number = 0;

  ligneFactureFormGroup:FormGroup;

  label:{
    article:string,
    depot:string,
    quantite:number,
    prix_unitaire:number,
    montant:number
  }


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


  constructor(private formBuilder:FormBuilder, private router:Router, private invoiceService:InvoiceListService){

    this.ligneFactureFormGroup = formBuilder.group({
      article: ['', new RequiredValidator],
      prix_unitaire: 0,
      ligne: 0,
      quantite: 0,
      montant: 0,
      depot: ['', new RequiredValidator],
    })

    this.ligneFactureFormGroup.valueChanges.subscribe(data => this.getTotalLignes());

    this.label = {article:"", depot:"", quantite:0, prix_unitaire:0, montant:0}

  }

  ngOnInit():void{
    this.getTotalLignes();

  }

  update(ligne:any):void{

    this.edited = true;
    this.ligneFactureFormGroup.setValue({
      ligne:ligne.idLigne,
      article:ligne.nomArticle,
      prix_unitaire:ligne.prixUnitaire,
      quantite:ligne.quantite,
      montant:ligne.quantite*ligne.prixUnitaire,
      depot:ligne.nomDepot
    });

    this.label = {article:ligne.nomArticle, depot:ligne.nomDepot, quantite:ligne.quantite, prix_unitaire:ligne.prixUnitaire, montant:ligne.quantite*ligne.prixUnitaire}


  }

  update_ligne():void{




   // console.log(this.facture.ligneFactures)
  }

  update_invoice():void{



  /*  let invoice : Invoice = {
      client: this.facture.client.m,
      referenceFacture: this.facture.referenceFacture,
      dateFacture: new Date(this.facture.dateFacture).toISOString().slice(0, 10),
      ligneFactures: [],
      idFacrure: this.facture.idFacrure,
      montantFacture: this.facture.montantFacture,
      statusFacture: "EN COURS"

    }

    this.invoiceService.postInvoiceData(invoice).subscribe(
      () => {

        this.router.navigate(['/invoices-list']);
      }
    )
 */
  }

  getTotalLignes():number{

     this.sum = 0;


      return this.sum


  }


}
