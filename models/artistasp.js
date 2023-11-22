const artistaspmodels = {
    getAll: `
    SELECT
        *
    FROM
        artistasp
    `,


    getByID: `
    SELECT
    *
    FROM
    artistasp
    WHERE
    id= ?
    `,
    addRow:`
    INSERT
     INTO
    artistasp(
        Nombre_real,
        Nombre_deartista,
        Edad,
        Pais,
        Debut,
        Cancion_mas_escuchada
    )
    VALUES (
        ?,?,?,?,?,?
    )`,
    getByStand:`
    SELECT 
    * 
    FROM 
    artistasp 
    WHERE Nombre_real =?
    `,

    updateUser:`
    UPDATE
        artistasp
    SET
        Nombre_real = ?,
        Nombre_deartista = ?,
        Edad = ?,
        Pais = ?,
        Debut = ?, 
        Cancion_mas_escuchada =?
    WHERE 
        id =?
    `,

    deleteRow:`
    DELETE 
    FROM 
    artistasp
WHERE 
    id=?
    `,
    
    
}

module.exports=artistaspmodels;