import { DatePipe, NgFor } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title">Lignes Facture N* {{facture.referenceFacture}}</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
      <div class="container">
          <table class="table table-responsive">
            <thead>
              <tr>
                <th>Article</th>
                <th>PU</th>
                <th>Qte</th>
                <th>T.Montant</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let ligne of facture.lignesFactureProduction">
                <td>{{ligne.nomArticle}}</td>
                <td>{{ ligne.prixUnitaire}}</td>
                <td>{{ ligne.quantite}}</td>
                <td>{{ ligne.prixUnitaire * ligne.quantite}}</td>
              </tr>
            </tbody>
          </table>
      </div>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
		</div>
	`,
  imports: [DatePipe, NgFor],
})
export class LigneFactureModal {


  private modalService = inject(NgbModal);

  @Input()
  facture:any;

  activeModal = inject(NgbActiveModal);

  ngOnInit():void{

    console.log(this.facture);
  }


}
