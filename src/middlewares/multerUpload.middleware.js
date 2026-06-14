import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
// guardado de archivos en la carpeta 'uploads'.
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
// Para  las imágenes que  tienen el mismo nombre, inventamos un código único usando la fecha actual y un número al azar
    const sufijoUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    
    cb(null, file.fieldname + '-' + sufijoUnico + extension);
  }
});

// validacion para subir archivos son en los formatos validos idnicados en el filtro de seguridad, para evitar que se suban archivos no deseados como PDF o ejecutables
const filtroArchivos = (req, file, cb) => {
// Definimos qué formatos vamos a aceptar
  const tiposPermitidos = /jpeg|jpg|png/;

  const coincidenciaExtension = tiposPermitidos.test(path.extname(file.originalname).toLowerCase());
  const coincidenciaMime = tiposPermitidos.test(file.mimetype);

  if (coincidenciaExtension && coincidenciaMime) {
    return cb(null, true);
  }

  cb(new Error('Solo se permiten archivos de imagen (jpeg, jpg, png)'));
};

const upload = multer({ 
  storage: storage,
  fileFilter: filtroArchivos
});

export {
  upload
};
