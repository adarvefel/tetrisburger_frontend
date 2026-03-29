import React, { useEffect, useState } from 'react'
import "./pqrsForm.css"
import { FaCircleExclamation } from "react-icons/fa6";
import { FaClipboardUser } from "react-icons/fa6";
import { IoDocumentTextSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { UpdatePqrsUserRequestDto } from '../../../../features/user/pqrs/dto/pqrsUserDto';
import { UpdatePqrsAdminRequestDto } from '../../../../entities/pqrs/dto/pqrsDto';
import { toast } from 'sonner';
import ButtonSubmitCrud from '../../componetsCrud/buttonSubmit/ButtonSubmitCrud';

type FormMode = "user-update" | "admin-update";

interface PqrsFormProps {
  mode: FormMode;
  initialData?: {
    idPqrs?: number;
    type?: string;
    status?: string;
    priority?: string;
    subject?: string;
    description?: string;
    response?: string;
    idUser?: number;
    assignedTo?: number;
  }
  onSubmit: (data: any) => Promise<any>
  loading?: boolean
  isEmployee?: boolean
}

export default function PqrsForm({ mode, initialData, onSubmit, loading = false, isEmployee = false }: PqrsFormProps) {


  const [formData, setFormData] = useState({
    idPqrs: initialData?.idPqrs || 0,
    type: initialData?.type || "",
    status: initialData?.status || "",
    priority: initialData?.priority || "",
    subject: initialData?.subject || "",
    description: initialData?.description || "",
    response: initialData?.response || "",
    idUser: initialData?.idUser || 0,
    assignedTo: initialData?.assignedTo || 0
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        idPqrs: initialData?.idPqrs || 0,
        type: initialData?.type || "",
        status: initialData?.status || "",
        priority: initialData?.priority || "",
        subject: initialData?.subject || "",
        description: initialData?.description || "",
        response: initialData?.response || "",
        idUser: initialData?.idUser || 0,
        assignedTo: initialData?.assignedTo || 0
      });
    }
  }, [initialData]);

  const formIsEqual =
    (initialData?.type ?? "") === formData.type &&
    (initialData?.status ?? "") === formData.status &&
    (initialData?.priority ?? "") === formData.priority &&
    (initialData?.subject ?? "") === formData.subject &&
    (initialData?.description ?? "") === formData.description &&
    (initialData?.response ?? "") === formData.response


  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  let nagivation = useNavigate();




  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (mode === "admin-update") {


      //Validaciones

      if (!formData.status) {
        toast.error("Debes seleccionar un estado.");
        return;
      }

      if (!formData.priority) {
        toast.error("Debes seleccionar una prioridad.");
        return;
      }
      if (!formData.response.trim()) {
        toast.error("La respuesta no puede estar vacía.");
        return;
      }

      const pqrsUpdate: UpdatePqrsAdminRequestDto = {
        status: formData.status,
        priority: formData.priority,
        response: formData.response
      }



      const res = await onSubmit(pqrsUpdate);
      if (res.data?.idPqrs) {
        toast.success("Datos actualizados");
        isEmployee ? nagivation("/employee/pqrs-list") : nagivation("/admin/pqrs-list") ;
      }
      else {
        toast.error("Datos no actualizados, error inesperado.")
      }



      return
    }

    //Validaciones

    if (!formData.type) {
      toast.error("Debes seleccionar el tipo de solicitud.");
      return;
    }
    if (!formData.subject.trim()) {
      toast.error("El asunto no puede estar vacío.");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("La descripción no puede estar vacía.");
      return;
    }

    const pqrsUpdate: UpdatePqrsUserRequestDto = {
      type: formData.type,
      subject: formData.subject,
      description: formData.description
    }

    const res = await onSubmit(pqrsUpdate);
    if (res.data?.idPqrs) {
      toast.success("Datos actualizados");
      nagivation("/pqrs-me");
    }
    else {
      toast.error("Datos no actualizados, error inesperado.")
    }

    return;
  }



  return (
    <form onSubmit={handleSubmit} className='pqrsForm__form'>

      <div className="pqrsForm__container-top">

        <div className="pqrsForm__container-top-left">

          <div className="pqrsForm__container-tittle">
            <FaCircleExclamation color='red' size={23} />
            <h2 className='pqrsForm__h2'>Informacion general</h2>
          </div>


          <div className="pqrsForm__container-fields-one">

            <div className="pqrsForm__container-inputs">
              <label className='pqrsForm__label'>ID PQRS</label>
              <input className='pqrsForm__input' name='idPqrs' onChange={onInputChange} value={formData.idPqrs} disabled />
            </div>

            <div className="pqrsForm__container-inputs">
              <label className='pqrsForm__label'>Tipo</label>
              <select className='pqrsForm__select' name='type' onChange={onInputChange} value={formData.type} disabled={mode == "admin-update"}>
                <option className='pqrsForm__option' value="">Seleccione el tipo de solicitud</option>
                <option className='pqrsForm__option' value="PETITION">Peticion</option>
                <option className='pqrsForm__option' value="COMPLAINT">Queja</option>
                <option className='pqrsForm__option' value="CLAIM">Reclamo</option>
                <option className='pqrsForm__option' value="SUGGESTION">Sugerencia</option>
                <option className='pqrsForm__option' value="REPORT">Denuncia</option>
                <option className='pqrsForm__option' value="CONGRATULATIONS">Felicitaciones</option>
              </select >
            </div>

            <div className="pqrsForm__container-inputs">
              <label className='pqrsForm__label'>Estado</label>
              <select className='pqrsForm__select' name='status' onChange={onInputChange} value={formData.status} disabled={mode == "user-update"}>
                <option className='pqrsForm__option' value="">Seleccione el estado</option>
                <option className='pqrsForm__option' value="ANSWERED">Respondido</option>
                <option className='pqrsForm__option' value="RECEIVED">Recibido</option>
              </select >
            </div>

            <div className="pqrsForm__container-inputs">
              <label className='pqrsForm__label'>Prioridad</label>
              <select className='pqrsForm__select' name='priority' onChange={onInputChange} value={formData.priority} disabled={mode == "user-update"} >
                <option className='pqrsForm__option' value="">Seleccione la prioridad</option>
                <option className='pqrsForm__option' value="LOW">Baja</option>
                <option className='pqrsForm__option' value="MEDIUM">Media</option>
                <option className='pqrsForm__option' value="HIGH">Alta</option>
                <option className='pqrsForm__option' value="CRITICAL">Critica</option>
              </select >
            </div>

          </div>


        </div>


        <div className="pqrsForm__container-top-right">

          <div className="pqrsForm__container-tittle">
            <FaClipboardUser color='red' size={23} />
            <h2 className='pqrsForm__h2'>Responsable y respuesta</h2>
          </div>

          <div className="pqrsForm__container-fields-two">

            <div className="pqrsForm__container-inputs">
              <label className='pqrsForm__label'>Solicitante ID</label>
              <input className='pqrsForm__input' name='idUser' onChange={onInputChange} value={formData.idUser} disabled />
            </div>

            <div className="pqrsForm__container-inputs">
              <label className='pqrsForm__label'>Asignado ID</label>
              <input className='pqrsForm__input' name='assignedTo' onChange={onInputChange} value={formData.assignedTo} disabled />
            </div>

            <div id='pqrsForm__container-inputs2' className="pqrsForm__container-inputs">
              <label className='pqrsForm__label'>Respuesta del asignado</label>
              <textarea className='pqrsForm__textarea' name='response' onChange={onInputChange} value={formData.response} disabled={mode == "user-update"}></textarea>
            </div>

          </div>

        </div>

      </div>

      <div className="pqrsForm__container-buttom">

        <div className="pqrsForm__container-tittle">
          <IoDocumentTextSharp color='red' size={23} />
          <h2 className='pqrsForm__h2'>Contenido</h2>
        </div>

        <div className="pqrsForm__container-fields-three">

          <div id='pqrsForm__container-inputs2' className="pqrsForm__container-inputs">
            <label className='pqrsForm__label'>Asunto</label>
            <input className='pqrsForm__input' name='subject' onChange={onInputChange} value={formData.subject} disabled={mode == "admin-update"} />
          </div>

          <div id='pqrsForm__container-inputs2' className="pqrsForm__container-inputs">
            <label className='pqrsForm__label'>Descripcion</label>
            <textarea id='pqrsForm__textarea-two' className='pqrsForm__textarea' name='description' onChange={onInputChange} value={formData.description} disabled={mode == "admin-update"}></textarea>
          </div>

        </div>

      </div>

      <ButtonSubmitCrud id='pqrs-form-submit' label='Actualizar PQRS' disabled={formIsEqual} loading={loading} />

    </form>
  )
}
