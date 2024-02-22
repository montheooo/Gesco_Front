import { Component, Input, inject } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LigneFactureModal} from "./LigneFactureModal";
import { Invoice } from "../../models/invoice";
import { DatePipe, NgFor } from "@angular/common";

@Component({
	standalone: true,
	template: `
		<div  class="modal-header">
			<h4 class="modal-title">Factures Production N* {{production.idProduction}}</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">

      <div class="container">
        <table class="table table-responsive">
          <thead>
            <tr>
              <th>Date</th>
              <th>Ref</th>
              <th>Fournisseur</th>
              <th>T.Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr (click)="open(facture)" *ngFor="let facture of production.facturesProduction">
              <td>{{facture.dateFacture | date}}</td>
              <td><b>{{ facture.referenceFacture}}</b></td>
              <td>{{ facture.nomFournisseur}}</td>
              <td>{{ facture.montantFacture}}</td>
            </tr>
          </tbody>
        </table>
      </div>

		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
		</div>
	`,
  selector: "app-facture-modal",
  imports: [DatePipe, NgFor],
})
export class FactureModal {

  private modalService = inject(NgbModal);
  public activeModal = inject(NgbActiveModal);

  @Input()
  production : any ;

  open(facturation:any) {
		const modalRef = this.modalService.open(LigneFactureModal, { size: 'lg', centered:false, scrollable:true });
    modalRef.componentInstance.facture = facturation;
	}

  ngOnInit():void{

    console.log(this.production);
  }




}
