import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavProductionComponent } from './nav-production.component';

describe('NavProductionComponent', () => {
  let component: NavProductionComponent;
  let fixture: ComponentFixture<NavProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavProductionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
