import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelMachinesComponent } from './parcel-machines.component';

describe('ParcelMachinesComponent', () => {
  let component: ParcelMachinesComponent;
  let fixture: ComponentFixture<ParcelMachinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelMachinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
