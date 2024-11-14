export const SaveSignatureState = {
  savingSignatureLoading: false,
  savingSignatureError: false,
  savingSignatureData: null,
};
export const SaveReducers = {
  saveSignature: state => {
    state.savingSignatureLoading = true;
    state.savingSignatureError = false;
  },
  savedSuccess: (state, action) => {
    state.savingSignatureLoading = false;
    state.savingSignatureData = action.payload;
  },
  savedFailed: (state, action) => {
    state.savingSignatureLoading = false;
    state.savingSignatureError = false;
  },
};
