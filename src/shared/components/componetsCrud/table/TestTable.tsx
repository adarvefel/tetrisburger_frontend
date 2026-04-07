import { useUserList } from "../../../../features/admin/user/hooks/useUserList";
import {TableLayout, TableHead, TableBody, Th, Td, TableActions, TablePagination } from "./TableComponents";
import pictureProfle from "./../../../../assets/photoPerfilUndefined.webp"
import { toast } from "sonner";
import { useState } from "react";
import { useDeleteEntity } from "../../../hooks/useDeleteEntity";
import { deleteUser } from "../../../../entities/user/api/userApi";
import ConfirmDeleteModal from "../../confirmDeleteModal/ConfirmDeleteModal";


export default function TestTable() {

    const { error, loading, numberPage, totalPage, setEmail, email, users, prevPage, nextPage, fetchUserList } = useUserList();


    // ---------- DELETE STATE ----------
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState<any>(null);

    const { loading: deleting, remove } = useDeleteEntity(deleteUser);

    const openDeleteModal = (user: any) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;

        await remove(userToDelete.idUser);
        closeDeleteModal();
        fetchUserList();
        toast.success("Usuario eliminado con exito.");
    };

    return (
        <div style={{ padding: "40px" }}>
            {/* ---------- DELETE MODAL ---------- */}

            {showDeleteModal && userToDelete && (
                <ConfirmDeleteModal
                    title="Eliminar Usuario"
                    description={`Estas a punto de eliminar permanentemente el Usuario con email "${userToDelete.email}". Esta acción es irreversible.`}
                    loading={deleting}
                    onConfirm={confirmDelete}
                    onClose={closeDeleteModal}
                />
            )}
            <TableLayout>

                <TableHead>
                    <tr>
                        <Th>ID</Th>
                        <Th>FOTO</Th>
                        <Th>NOMBRE</Th>
                        <Th>EMAIL</Th>
                        <Th>ROL</Th>
                        <Th>ACCIONES</Th>
                    </tr>
                </TableHead>

                <TableBody>
                    {users.map((user) => (
                        <tr key={user.idUser}>

                            <Td>{user.idUser}</Td>

                            <Td>
                                <div className="tableComponents__container-img">
                                    <img className="tableComponents__img" src={user.userImage ? user.userImage : pictureProfle} alt="" />
                                </div>
                            </Td>

                            <Td>{user.userName}</Td>
                            <Td>{user.email}</Td>

                            <Td><span className={`tableComponents__span-${user.role === "ADMIN" ? "red" : user.role === "EMPLOYEE" ? "orange" : "blue"}`}> {user.role} </span> </Td>

                            <Td>
                                <TableActions
                                    linkEdit={`/admin/users/update/${user.idUser}`}
                                    onDelete={() => openDeleteModal(user)}
                                />
                            </Td>

                        </tr>
                    ))}
                </TableBody>

            </TableLayout>

            <TablePagination numberPage={numberPage} totalPage={totalPage} onNext={nextPage} onPrev={prevPage} />
        </div>
    );
}