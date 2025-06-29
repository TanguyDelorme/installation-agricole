import {PropertiesModel} from './properties.model';

export interface InstallationModel {
  properties: PropertiesModel;
  coordinates: number[];
}
