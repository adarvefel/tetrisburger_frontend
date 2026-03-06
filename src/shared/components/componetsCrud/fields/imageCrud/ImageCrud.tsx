import React, { useState, useRef, useEffect } from 'react'
import "./imageCrud.css"
import { MdOutlineSaveAlt } from "react-icons/md";
import { toast } from 'sonner';

interface ImageCrudProps {
  defaultImage: string
  currentImage?: string
  title?: string
  description?: string
  onImageChange?: (file: File) => void
}

export default function ImageCrud({
  defaultImage,
  currentImage,
  title = "Imagen de perfil",
  description = "Sube una imagen nueva",
  onImageChange
}: ImageCrudProps) {

  const [pictureUser, setPictureUser] = useState<string>(currentImage || defaultImage)
  const [, setImageFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const MAX_SIZE = 5 * 1024 * 1024 // 5MB

  const onClickInputFile = () => {
    fileInputRef.current?.click()
  }

  const onChangeInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > MAX_SIZE) {
        toast.error("La imagen no puede pesar más de 5MB")
        e.target.value = ""
        return
      }
      setImageFile(file)
      const pictureUrl = URL.createObjectURL(file)
      setPictureUser(pictureUrl)
      onImageChange?.(file)
    }
  }

  useEffect(() => {
    return () => {
      if (pictureUser.startsWith("blob:")) {
        URL.revokeObjectURL(pictureUser)
      }
    }
  }, [pictureUser])

  useEffect(() => {
    setPictureUser(currentImage || defaultImage)
  }, [currentImage, defaultImage])

  return (
    <div className="imageCrud__container">
      <div className="imageCrud__container-imagen">
        <div className="imageCrud__container-img">
          <img className='imageCrud__img' src={pictureUser} alt="imagen" />
        </div>
        <div className="imageCrud__container-spam">
          <h3 className='imageCrud__h3'>{title}</h3>
          <p className='imageCrud__p'>{description}</p>
        </div>
      </div>

      <div className="imageCrud__container-button-top">
        <button className='imageCrud__button' onClick={onClickInputFile} type='button'>
          <MdOutlineSaveAlt size={13} /> Subir imagen
        </button>
        <input ref={fileInputRef} className='imageCrud__input-file' type="file" accept='image/*' onChange={onChangeInputFile} />
      </div>
    </div>
  )
}