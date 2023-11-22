const {request, response} = require('express');
const artistaspmodels = require('../models/artistasp');
const pool=require('../db');

const ListaRegistros= async(req = request,res=response)=>{
    let conn;
    try {
        conn = await pool.getConnection();
        
        const  artistas = await conn.query(artistaspmodels.getAll,(err)=>{
            if(err){
                throw new Error(err);   
            }
        })

        res.json(artistas);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        
    }finally{
        if(conn) conn.end();
    }
}

const ListaRegistrosByID = async (req = request, res = response) => {
    
    const {id} = req.params;
    if (isNaN(id)) {
        res.status(400).json({msg: 'Invalid ID'});
        return;
    }

    let conn; 
    try{
        conn = await pool.getConnection();

    const [artistasp] = await conn.query (artistaspmodels.getByID, [id], (err)=>{
        if(err){
            throw err
        }
    });

    if (!artistasp) {
        res.status(404).json({msg: 'artistasp not foud'});
        return;
    }
    
    
    res.json(artistasp);
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
}

///////////////////////////////////////



const Agregar =async(req = request, res= response)=>{
    let conn;
    const {
        Nombre_real,
        Nombre_deartista,
        Edad,
        Pais,
        Debut,
        Cancion_mas_escuchada
    } = req.body;
    if (!Nombre_real|| !Nombre_deartista|| !Edad|| !Pais|| !Debut|| !Cancion_mas_escuchada){
res.status(400).json({msg:'Missing informarion'});

return;
}

        const artistasp= [Nombre_real, Nombre_deartista, Edad, Pais, Debut, Cancion_mas_escuchada ]

       
    
    try {

        conn = await pool.getConnection();
        
        const [StandUser] = await conn.query(
            artistaspmodels.getByStand,
            [Nombre_real],
            (err) => {if (err) throw err;}
        );
        if (StandUser){
            res.status(409).json({msg:`artistasp with Nombre_real ${Nombre_real} already exists`});
            return;
        }
        
        const artistaspAdded = await conn.query(artistaspmodels.addRow,[...artistasp],(err)=>{

        })
        
        if (artistaspAdded.affecteRows === 0) throw new Error ({msg:'Failed to add artistasp'});
        res.json({msg:'artistasp add succesfully'});
    }catch(error){
console.log(error);
res.status(500).json(error);
    } finally {
        if (conn) conn.end();
    }
}

const Actualizar=async(req, res)=>{
    const {
        Nombre_real,
        Nombre_deartista,
        Edad,
        Pais,
        Debut,
        Cancion_mas_escuchada,
    } = req.body;

const {id} = req.params;
let newUserData=[
    Nombre_real,
    Nombre_deartista,
    Edad,
    Pais,
    Debut,
    Cancion_mas_escuchada,
    
];
let conn;
try{
    conn = await pool.getConnection();
const [userExists]=await conn.query(
    artistaspmodels.getByID,
    [id],
    (err) => {if (err) throw err;}
);
if (!userExists || userExists.id === 0){
    res.status(404).json({msg:'User not found'});
    return;
}

const [StandUser] = await conn.query(
    artistaspmodels.getByStand,
    [Nombre_real],
    (err) => {if (err) throw err;}
);
if (StandUser){
    res.status(409).json({msg:`User with Nombre_real ${Nombre_real} already exists`});
    return;
}


const oldUserData = [
    userExists.Nombre_real, 
    userExists.Nombre_deartista, /////////////
    userExists.Edad, ///////////////
    userExists.Pais, ////////////////////// 
    userExists.Debut, /////////////////////// 
    userExists.Cancion_mas_escuchada , /////////////////////
];

newUserData.forEach((artistaData, index)=> {
    if (!artistaData){
        newUserData[index] = oldUserData[index];
    }
})

const userUpdate = await conn.query(
    artistaspmodels.updateUser,
    [...newUserData, id],
    (err) => {if (err) throw err;}
);
if(userUpdate.affecteRows === 0){
    throw new Error ('User not updated');
}
res.json({msg:'User updated successfully'})
}catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Eliminar = async (req = request, res = response) => {
    const { id } = req.params;

    let conn;
    try {
        conn = await pool.getConnection();

        const Eliminar = await conn.query(artistaspmodels.deleteRow, [id]);

        if (Eliminar.affectedRows === 0) {
            res.status(404).json({ msg: 'User not Found' });
            return;
        }

        res.json({ msg: 'user deleted succesfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    } finally {
        if (conn) conn.end();
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////





module.exports={ListaRegistros, ListaRegistrosByID, Agregar, Actualizar, Eliminar};