import Swal from "sweetalert2";

export const SwalSuccess = (text: string) => {
    return Swal.fire({
        icon: 'success',
        title: text,
        showConfirmButton: false,
        timer: 1500
    });
};

export const SwalError = (text: string = 'Algum erro aconteceu!') => {
    return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: text
    });
};

export const SwalConfirm = (text: string = 'Não poderá reverter a operação!') => {
    return Swal.fire({
        title: 'Tem a certeza que deseja eliminar?',
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, apagar!',
        cancelButtonText: 'Cancelar'
    });
}