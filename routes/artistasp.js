const {Router} = require('express');
const {
    ListaRegistros,
    ListaRegistrosByID,
    Agregar,
    Actualizar,
    Eliminar  
}=require('../controllers/artistasp');

const router = Router();

// http://localhost:3000/api/v1/informacion
router.get('/',ListaRegistros);

// http://localhost:3000/api/v1/informacion/id
router.get('/:id',ListaRegistrosByID)

router.put('/',Agregar);

router.patch('/:id',Actualizar);

router.delete('/:id',Eliminar);


module.exports=router;