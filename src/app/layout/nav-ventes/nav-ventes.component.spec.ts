import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavVentesComponent } from './nav-ventes.component';

describe('NavVentesComponent', () => {
  let component: NavVentesComponent;
  let fixture: ComponentFixture<NavVentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavVentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavVentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
