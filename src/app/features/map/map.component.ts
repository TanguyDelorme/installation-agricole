import {Component, computed, inject, signal, viewChild} from '@angular/core';
import {GoogleMapsModule, MapInfoWindow, MapMarker} from '@angular/google-maps';
import {InstallationStore} from '../../core/store/installation.store';
import {
  ConsultationInstallationComponent
} from '../search/consultation-installation/consultation-installation.component';
import {InstallationModel} from '../../core/models/installation.model';

@Component({
  selector: 'app-map',
  imports: [
    GoogleMapsModule,
    ConsultationInstallationComponent
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  private readonly installationStore = inject(InstallationStore)
  ZOOM = 6;
  markers = computed(() => this.installationStore.installations().map(i => i.geo_point_2d));
  center = computed(() => this.getCenterFromMarkers(this.markers()))

  infoWindow = viewChild(MapInfoWindow);
  selectedInstallation = signal<InstallationModel | null>(null);

  openInfoWindow(marker: MapMarker, index: number) {
    this.selectedInstallation.set(this.installationStore.installations()[index]);
    this.infoWindow()?.open(marker);
  }

  getCenterFromMarkers(points: google.maps.LatLngLiteral[]): google.maps.LatLngLiteral {
    if (!points.length) {
      return { lat: 0, lng: 0 };
    }
    const latSum = points.reduce((sum, p) => sum + p.lat, 0);
    const lngSum = points.reduce((sum, p) => sum + p.lng, 0);
    return {
      lat: latSum / points.length,
      lng: lngSum / points.length
    };
  }
}
