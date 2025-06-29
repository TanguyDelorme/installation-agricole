import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInstallationComponent } from './update-installation.component';

describe('UpdateInstallationComponent', () => {
  let component: UpdateInstallationComponent;
  let fixture: ComponentFixture<UpdateInstallationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInstallationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
