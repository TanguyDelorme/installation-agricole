import {Component, effect, inject, viewChild} from '@angular/core';
import {InstallationStore} from '../../core/store/installation.store';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {InstallationModel} from '../../core/models/installation.model';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, tap} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {ConsultationInstallationComponent} from './consultation-installation/consultation-installation.component';
import {UpdateInstallationComponent} from './update-installation/update-installation.component';

@Component({
  selector: 'app-search',
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatInput,
    MatPaginator,
    ReactiveFormsModule,
    MatSort,
    MatSortModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  private readonly installationStore = inject(InstallationStore);
  private readonly fb = inject(FormBuilder);
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['raisonsociale', 'adresse1', 'codepostal', 'commune', 'statutseveso', 'etatactivite', 'prioritenationale', 'actions'];
  dataSource: MatTableDataSource<InstallationModel>;
  filterForm: FormGroup = this.fb.group({
    filter: ['']
  });

  paginator = viewChild(MatPaginator);
  sort = viewChild(MatSort);

  constructor() {
    this.dataSource = new MatTableDataSource<InstallationModel>([]);

    this.dataSource.filterPredicate = (data: InstallationModel, filter: string) => {
      const properties = data.properties;
      const searchStr = Object.values(properties)
        .map(val => val ? val.toString().toLowerCase() : '')
        .join(' ');
      return searchStr.includes(filter.toLowerCase());
    };

    this.dataSource.sortingDataAccessor = (item, property) => {
      return item.properties?.[property] ?? '';
    };

    effect(() => {
      this.dataSource.data = this.installationStore.installations();
      this.dataSource.paginator = this.paginator() ?? null;
      this.dataSource.sort = this.sort() ?? null;
      this.dataSource.filter = this.dataSource.filter;
    });

    toSignal(this.filterForm.get('filter')!.valueChanges
      .pipe(
        debounceTime(300),
        tap((value) => {
          this.dataSource.filter = value.trim().toLowerCase();
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
        })
      )
    );
  }

  openConsultationDialog(installation: InstallationModel) {
    this.dialog.open(ConsultationInstallationComponent, {
      data: installation.properties,
      width: '500px'
    });
  }

  openModificationDialog(installation: InstallationModel) {
    const dialogRef = this.dialog.open(UpdateInstallationComponent, {
      data: installation.properties,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(properties => {
      this.installationStore.updateInstallation(properties, installation.properties.raisonsociale);
    });
  }
}
