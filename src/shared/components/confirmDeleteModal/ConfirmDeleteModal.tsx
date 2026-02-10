import { AiOutlineWarning } from "react-icons/ai";
import "./confirmDeleteModal.css"

interface ConfirmDeleteModalProps {
    title?: string;
    description: string;
    confirmText?: string;
    loading?: boolean;
    onConfirm: () => Promise<void> | void;
    onClose: () => void;
}

export default function ConfirmDeleteModal({
    title = "¿Seguro que deseas eliminar?",
    description,
    confirmText = "Eliminar",
    loading = false,
    onConfirm,
    onClose
}: ConfirmDeleteModalProps) {

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onConfirm();
    };

    return (
        <div className="deleteModel__container">
            <form onSubmit={onSubmit} className='deleteModel__form' action="">
                <div className="deleteModel__container-icono">
                    <AiOutlineWarning size={38} color='#F87171' />
                </div>
                <div className="deleteModel__container-encabezado">
                    <p className='deleteModel__p-encabezado'>{title}</p>
                </div>
                <div className="deleteModel__container-texto">
                    <p className='deleteModel__p-texto'>{description} <strong className='deleteModel__strong'>{confirmText}</strong>. Esta accion es irreversible. Se perderan todos los datos asociados a este usuario.</p>
                </div>
                <div className="deleteModel__container-button">
                    <button className='deleteModel__button-acept' disabled={loading ? true : false} type='submit'>{loading ? "Eliminando..." : confirmText}</button>
                    <button className='deleteModel__button-cancel' type='button' onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
