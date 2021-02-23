import {
  _CLOSE_DIALOG,
  _OPEN_ADDRESS_DIALOG,
  _OPEN_NEW_BOOK_DIALOG,
  _OPEN_NEW_PROFILE_IMAGE_DIALOG,
  _OPEN_PHONE_DIALOG,
  _OPEN_EDIT_NAME_DIALOG,
} from "../actions/actionsList/dialogActionsList";

const initialState = {
  addAddressDialogVisibile: false,
  addPhoneDialogVisible: false,
  addBookDialogVisible: false,
  changeProfileImageDialogVisible: false,
  editNameDialogVisible: false,
};
export default function dialogReducer(state = initialState, action) {
  switch (action.type) {
    case _CLOSE_DIALOG:
      return initialState;
    case _OPEN_ADDRESS_DIALOG:
      return {
        addAddressDialogVisibile: true,
        addPhoneDialogVisible: false,
        addBookDialogVisible: false,
        changeProfileImageDialogVisible: false,
        editNameDialogVisible: false,
      };
    case _OPEN_PHONE_DIALOG:
      return {
        addAddressDialogVisibile: false,
        addPhoneDialogVisible: true,
        addBookDialogVisible: false,
        changeProfileImageDialogVisible: false,
        editNameDialogVisible: false,
      };
    case _OPEN_NEW_BOOK_DIALOG:
      return {
        addAddressDialogVisibile: false,
        addPhoneDialogVisible: false,
        addBookDialogVisible: true,
        changeProfileImageDialogVisible: false,
        editNameDialogVisible: false,
      };
    case _OPEN_NEW_PROFILE_IMAGE_DIALOG:
      return {
        addAddressDialogVisibile: false,
        addPhoneDialogVisible: false,
        addBookDialogVisible: false,
        changeProfileImageDialogVisible: true,
        editNameDialogVisible: false,
      };
    case _OPEN_EDIT_NAME_DIALOG:
      return {
        addAddressDialogVisibile: false,
        addPhoneDialogVisible: false,
        addBookDialogVisible: false,
        changeProfileImageDialogVisible: false,
        editNameDialogVisible: true,
      };

    default:
      return initialState;
  }
}
