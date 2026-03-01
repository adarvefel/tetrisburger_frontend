import { useState } from "react"
import InputCrud from "./../fields/inputCrud/InputCrud"
import SelectCrud from "./../fields/selectCrud/SelectCrud"
import TextareaCrud from "./../fields/textareaCrud/TextareaCrud"
import CheckboxCrud from "./../fields/checkboxCrud/CheckboxCrud"
import ButtonSubmitCrud from "../buttonSubmit/ButtonSubmitCrud"
import SubTittleCrud from "../subTittle/SubTittleCrud"
import { FaCircleExclamation } from "react-icons/fa6";
import TittleCrud from "../tittle/TittleCrud"
import ImageCrud from "../fields/imageCrud/ImageCrud"
import imgProfile from "../../../../assets/photoPerfilUndefined.webp"

const tipoOptions = [
  { value: "PETITION", label: "Peticion" },
  { value: "COMPLAINT", label: "Queja" },
  { value: "CLAIM", label: "Reclamo" },
  { value: "SUGGESTION", label: "Sugerencia" },
  { value: "REPORT", label: "Denuncia" },
  { value: "CONGRATULATIONS", label: "Felicitaciones" },
]

interface TestFormData {
  idPqrs: string
  nombre: string
  tipo: string
  comentario: string
  available: boolean
  imageFile: File | null
}

const initialFormData: TestFormData = {
  idPqrs: "",
  nombre: "",
  tipo: "",
  comentario: "",
  available: false,
  imageFile: null,
}

export default function TestFields() {

  const [formData, setFormData] = useState<TestFormData>(initialFormData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.checked }))
  }

  const handleImageChange = (file: File) => {
    setFormData((prev) => ({ ...prev, imageFile: file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form data:", formData)
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex", flexDirection: "column", gap: "16px", padding: "1rem", maxWidth: "500px",
      border: "2px solid #E7DCDC", background: "#fff", borderRadius: "20px"
    }}>

      <TittleCrud tittle="Creacion de pqrs" description="Puedes crear un pqrs personalizado" />

      <SubTittleCrud title="Informacion general" icon={<FaCircleExclamation size={22} color="red" />} />

      <ImageCrud
        title="Imagen del PQRS"
        defaultImage={imgProfile}
        onImageChange={handleImageChange}
      />

      <InputCrud
        label="ID PQRS"
        name="idPqrs"
        type="text"
        placeholder="Ingrese el ID"
        value={formData.idPqrs}
        onChange={handleChange}
      />

      <InputCrud
        label="Nombre"
        name="nombre"
        type="text"
        placeholder="Ingrese su nombre"
        value={formData.nombre}
        onChange={handleChange}
      />

      <SelectCrud
        label="Tipo de solicitud"
        name="tipo"
        placeholder="Seleccione el tipo de solicitud..."
        options={tipoOptions}
        value={formData.tipo}
        onChange={handleChange}
      />

      <TextareaCrud
        label="Comentario"
        name="comentario"
        placeholder="Escriba su comentario..."
        rows={4}
        value={formData.comentario}
        onChange={handleChange}
      />

      <CheckboxCrud
        label="Disponible"
        name="available"
        checkboxLabel="Marcar como disponible"
        checked={formData.available}
        onChange={handleCheckbox}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <div >
          <ButtonSubmitCrud label="Actualizar datos" />
        </div>
      </div>
    </form>
  )
}