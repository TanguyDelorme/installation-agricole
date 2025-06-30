import {Component, input} from '@angular/core';
import {InstallationModel} from '../../../core/models/installation.model';

@Component({
  selector: 'app-consultation-installation',
  imports: [],
  templateUrl: './consultation-installation.component.html',
  styleUrl: './consultation-installation.component.css'
})
export class ConsultationInstallationComponent {
  installation = input<InstallationModel>();
}
