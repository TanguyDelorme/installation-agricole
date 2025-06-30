import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {InstallationModel} from '../../../core/models/installation.model';

@Component({
  selector: 'app-update-installation',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInput
  ],
  templateUrl: './update-installation.component.html',
  styleUrl: './update-installation.component.css'
})
export class UpdateInstallationComponent {
  properties = inject<InstallationModel>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<UpdateInstallationComponent>);
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    raisonsociale: [this.properties.raisonsociale ?? '', Validators.required],
    adresse1: [this.properties.adresse1 ?? '', Validators.required],
    codepostal: [this.properties.codepostal ?? '', Validators.required],
    commune: [this.properties.commune ?? '', Validators.required],
    statutseveso: [this.properties.statutseveso ?? ''],
    etatactivite: [this.properties.etatactivite ?? ''],
    prioritenationale: [this.properties.prioritenationale ?? '', Validators.required]
  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(this.form.value);
  }
}
