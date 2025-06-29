import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {PropertiesModel} from '../../../core/models/properties.model';

@Component({
  selector: 'app-consultation-installation',
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './consultation-installation.component.html',
  styleUrl: './consultation-installation.component.css'
})
export class ConsultationInstallationComponent {
  properties = inject<PropertiesModel>(MAT_DIALOG_DATA);
}
