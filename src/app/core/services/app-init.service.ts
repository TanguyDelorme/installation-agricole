import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom, tap} from 'rxjs';
import {InstallationStore} from '../store/installation.store';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  private readonly http = inject(HttpClient);
  private readonly installationStore = inject(InstallationStore);

  public async init(): Promise<void> {
    await firstValueFrom(this.http.get('assets/etablissements.geojson').pipe(
      tap((json: any) => {
        const installations = json.features.map((feature: any) => ({
          properties: feature.properties,
          coordinates: feature.geometry?.coordinates ?? []
        }));

        this.installationStore.setInstallations(installations);
      })
    ));
  }
}
