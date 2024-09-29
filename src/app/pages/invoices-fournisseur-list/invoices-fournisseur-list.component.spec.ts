import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesFournisseurListComponent } from './invoices-fournisseur-list.component';

describe('InvoicesFournisseurListComponent', () => {
  let component: InvoicesFournisseurListComponent;
  let fixture: ComponentFixture<InvoicesFournisseurListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicesFournisseurListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoicesFournisseurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
