import { Component, ViewChild} from '@angular/core';
import { NavVentesComponent } from "../../layout/nav-ventes/nav-ventes.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Invoice } from '../../models/invoice';
import { NgbDatepickerModule, NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceListService } from '../../services/invoices/invoice-list.service';
import { InvoiceData } from '../../models/invoiceData';
import { Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs';
import { Client } from '../../models/client';
import { InvoiceLine } from '../../models/invoiceLine';
import { AddLigneFactureModal } from '../../modals/ventes/AddLigneFactureModal';
import { InvoiceDTO } from '../../modelsDTO/invoiceDTO';
import { InvoiceLigneDTO } from '../../modelsDTO/invoiceLigneDTO';


@Component({
    selector: 'app-invoices-add',
    standalone: true,
    templateUrl: './invoices-add.component.html',
    styleUrl: './invoices-add.component.css',
    imports: [NavVentesComponent, NgFor, NgIf, NgClass, NgbTypeahead, NgbDatepickerModule, ReactiveFormsModule],

})
export class InvoicesAddComponent {

  invoiceFormGroup!: FormGroup;
  submitted:boolean = false;
  datasLigne:InvoiceLigneDTO[] =  [];
  invoiceData!:InvoiceData;

  get f() { return this.invoiceFormGroup.controls; }

  focus$ = new Subject<string>();
	click$ = new Subject<string>();
  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;

	clientSearch: OperatorFunction<string, readonly Client[]> = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
		const inputFocus$ = this.focus$;

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((term) =>
				(term === '' ? this.invoiceData.clients : this.invoiceData.clients.filter((v) => v.nomClient.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
			),
		);
	};

  search: OperatorFunction<string, readonly Client[]> =  (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map((term) =>
      term.length < 1 ? [] : this.invoiceData.clients.filter((v) => v.nomClient.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
    ),
  );

  formatter = (x: { nomClient: string, idClient:number }) => x.nomClient + '';
  formatterClient = (x: { nomClient: string, idClient:number }) => x.nomClient ;


  constructor(private formBuilder:FormBuilder, private router:Router, private invoiceService:InvoiceListService, private modalService:NgbModal){


    this.invoiceFormGroup = this.formBuilder.group({
      client: ['', Validators.required],
      reference_facture: [Math.random().toString().slice(2, 10), Validators.required],
      date_facture: [Validators.required],

    });

  }

  ngOnInit() {

    this.invoiceService.getInvoiceData<InvoiceData>().subscribe(
      data => this.invoiceData = data
    )

  }

  open(invoiceData:InvoiceData): void{

    console.log(invoiceData);
    console.log(this.invoiceFormGroup);

    const modalRef = this.modalService.open(AddLigneFactureModal, { size: 'lg', centered:true, scrollable:true });

    modalRef.componentInstance.invoiceData= invoiceData;
    modalRef.componentInstance.ligneFactureEvent.subscribe((value:InvoiceLigneDTO) => {

      console.log(value);
      this.datasLigne.push(value);
      modalRef.componentInstance.ligneFactureFormGroup.reset();
    });

  }

  removeLigne(indexligne:number):void{

    this.datasLigne = this.datasLigne.filter((ligne,index) => {return indexligne !== index})

  }



  onSubmit() {

    this.submitted = true;

    console.log(this.invoiceFormGroup);

    if (this.invoiceFormGroup.invalid) {
      console.log(this.invoiceFormGroup);
      return;
    }

    let invoice : InvoiceDTO = {
      client: this.invoiceFormGroup.value.client,
      invoiceReference: this.invoiceFormGroup.value.reference_facture,
      invoiceDate: new Date(this.invoiceFormGroup.value.date_facture.year, this.invoiceFormGroup.value.date_facture.month, this.invoiceFormGroup.value.date_facture.day).toISOString().slice(0, 10),
      invoiceLines: this.datasLigne,
      status: "EN COURS",
      montantFacture :0

    }

    this.invoiceService.postInvoiceData(invoice).subscribe(
      (data) => {

        console.log(data);

        this.router.navigate(['/invoices-list']);
      }
    )

  }

}
