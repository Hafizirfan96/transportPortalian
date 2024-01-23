export const CreateSignatureState = {
  Loading: false,
  Error: false,
  SignatureID: null,
};
export const CreateReducers = {
  createSignature: state => {
    console.log('createing Signature');
    state.Loading = true;
    state.Error = false;
  },
  createdSuccess: (state, action) => {
    state.Loading = false;
    state.SignatureID = action.payload;
  },
  CreatedFailed: (state, action) => {
    console.log('createing Signature failed', action);
    state.Loading = false;
    state.Error = false;
  },
};
