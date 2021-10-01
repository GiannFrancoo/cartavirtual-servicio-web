
const pool = require('./db.controller');

const getCategories = async (req, res) => {
    let params = [];
    let baseQuery = 'SELECT * FROM Categories';

    if (req.query.name){
        params.push('%' + req.query.name + '%');
        baseQuery += ' WHERE (name ILIKE $' + params.length +')';
    }

    const response = await pool.query(baseQuery, params);  

    response.rows = response.rows.map((row) => {
        if (row.image){
            row.image = 'https://giannfrancoo-servicio-web.herokuapp.com/categorias/' + row.id + '/imagen'
        }
        return row
    })
    
    res.status(200).json(response.rows);
}

const getCategoryImage = async (req, res) => {
    const id = req.params.id;
    
    if(id % 1 == 0){
        const response = await pool.query('SELECT image FROM Categories WHERE id = $1', [id]);
        
        if (response.rows.length < 1 || response.rows[0].image == null){
            res.status(404).send("Error 404")
        }
        
        var img = Buffer.from(response.rows[0].image, 'base64');

        res.writeHead(200, {
            'Content-Type': 'image/jpeg',
            'Content-Length': img.length
        });
        res.end(img); 
    }
    else{
        res.status(400).send("Error 400");
    }
}

module.exports = {
    getCategories,
    getCategoryImage
}