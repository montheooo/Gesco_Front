import { DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { NgbActiveModal, NgbModal, NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, RequiredValidator } from "@angular/forms";
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, map } from "rxjs";
import { InvoiceData } from "../../models/invoiceData";
import { Depot } from "../../models/depot";
import { Article } from "../../models/article";
import { InvoiceDTO } from "../../modelsDTO/invoiceDTO";
import { InvoiceListService } from "../../services/invoices/invoice-list.service";
import { Router } from "@angular/router";
import { Invoice } from "../../models/invoice";

@Component({
	standalone: true,
	template: `
		<div class="modal-header">
			<h5 class="modal-title text-danger">Attention !!!</h5>
			<button type="button" class="btn btn-outline-danger" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
      <p>Voulez-vous vraiment supprimer definitivement la facture N* <b>{{invoice.referenceFacture}}</b> du client <b>{{invoice.nomClient}} ?</b></p>
    </div>

		<div class="modal-footer">
			<button type="button" class="btn btn-outline-danger" (click)="deleteInvoice()">Confirmer Suppression</button>
		</div>
	`,
  imports: [DatePipe, NgFor, NgIf, NgbTypeahead, NgClass, ReactiveFormsModule],
})
export class WarningDeleteModal {


  @Input()
  invoice!:Invoice

  @Output()
  deleteEvent = new EventEmitter<Invoice>();


  activeModal: NgbActiveModal = inject(NgbActiveModal);


  constructor(private invoiceService:InvoiceListService){


  }

  ngOnInit():void{

    console.log(this.invoice);

  }

  deleteInvoice(){

    console.log(this.invoice);
    this.invoiceService.deleteInvoice(this.invoice).subscribe(
      () => {

        this.activeModal.dismiss();
        this.deleteEvent.next(this.invoice);

      }
    )
  }


}
