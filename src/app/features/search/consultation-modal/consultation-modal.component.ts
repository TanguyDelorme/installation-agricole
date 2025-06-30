import {Component, inject} from '@angular/core';
import {InstallationModel} from '../../../core/models/installation.model';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule} from '@angular/material/dialog';
import {ConsultationInstallationComponent} from '../consultation-installation/consultation-installation.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-consultation-modal',
  imports: [
    MatDialogModule,
    MatButtonModule,
    ConsultationInstallationComponent
  ],
  templateUrl: './consultation-modal.component.html',
  styleUrl: './consultation-modal.component.css'
})
export class ConsultationModalComponent {
  installation = inject<InstallationModel>(MAT_DIALOG_DATA);
}
