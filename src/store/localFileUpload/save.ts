export const SaveFilesState = {
  savingSignatureLoading: false,
  savingSignatureError: false,
  savingFilesData: null,
};
export const SaveReducers = {
  saveFiles: (state: any) => {
    console.log('saving files');
    state.savingSignatureLoading = true;
    state.savingSignatureError = false;
  },
  savedSuccess: (state: any, action: any) => {
    state.savingSignatureLoading = false;
    state.savingFilesData = action.payload;
  },
  savedFailed: (state: any, action: any) => {
    // console.log('saving Signature failed', action);
    state.savingSignatureLoading = false;
    state.savingSignatureError = false;
  },
};
