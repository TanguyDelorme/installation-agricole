import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {PropertiesModel} from '../models/properties.model';
import {InstallationModel} from '../models/installation.model';

type InstallationState = {
  installations: InstallationModel[]
};

const initialState: InstallationState = {
  installations: []
};

export const InstallationStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    setInstallations(installations: InstallationModel[]) {
      patchState(store, { installations });
    },
    updateInstallation(updatedProperties: PropertiesModel, oldRaisonSociale: string) {
      const currentInstallations = store.installations();

      const newInstallations = currentInstallations.map(inst =>
        inst.properties.raisonsociale === oldRaisonSociale
          ? { ...inst, properties: { ...inst.properties, ...updatedProperties } }
          : inst
      );

      patchState(store, { installations: newInstallations });
    }
  }))
);
