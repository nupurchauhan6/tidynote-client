import { ModalOptions } from 'ngx-bootstrap/modal';

export const MODAL_CONFIG: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    animated: true,
    ignoreBackdropClick: true
};

export const TOASTR_CONFIG = {
    positionClass: 'toast-top-center',
    closeButton: true,
    tapToDismiss: false,
    progressBar: true
};
