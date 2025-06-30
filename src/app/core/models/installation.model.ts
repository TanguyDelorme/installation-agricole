export interface InstallationModel {
  raisonsociale: string;
  adresse1: string;
  codepostal: string;
  commune: string;
  statutseveso?: string;
  etatactivite?: string;
  prioritenationale: string;
  geo_point_2d: google.maps.LatLngLiteral
  [key: string]: any;
}
