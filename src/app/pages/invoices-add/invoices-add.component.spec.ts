import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesAddComponent } from './invoices-add.component';

describe('InvoicesAddComponent', () => {
  let component: InvoicesAddComponent;
  let fixture: ComponentFixture<InvoicesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicesAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoicesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
