import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationInstallationComponent } from './consultation-installation.component';

describe('ConsultationInstallationComponent', () => {
  let component: ConsultationInstallationComponent;
  let fixture: ComponentFixture<ConsultationInstallationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationInstallationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
