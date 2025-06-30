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
        const installations = json.features.map((feature: any) => {
          const geo = feature.properties.geo_point_2d;
          return {
            ...feature.properties,
            geo_point_2d: { lat: geo.lat, lng: geo.lon }
          };
        });

        this.installationStore.setInstallations(installations);
      })
    ));
  }
}
