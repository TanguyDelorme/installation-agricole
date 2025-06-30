import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
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
    updateInstallation(updatedProperties: InstallationModel, oldRaisonSociale: string) {
      const currentInstallations = store.installations();

      const newInstallations = currentInstallations.map(inst =>
        inst.raisonsociale === oldRaisonSociale
          ? { ...inst, ...updatedProperties }
          : inst
      );

      patchState(store, { installations: newInstallations });
    }
  }))
);
