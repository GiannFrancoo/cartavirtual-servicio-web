
const pool = require('./db.controller');

const getItemsByCategory = async (req, res) => {
    const category_id = parseInt(req.params.id);
    if(category_id % 1 == 0){           
        try{
            let params = [category_id];
            let baseQuery = 'SELECT * FROM Items WHERE (category_id = $1)'

            if (req.query.name){
                params.push('%' + req.query.name + '%');
                baseQuery += ' AND (name ILIKE $' + params.length +')';
            }

            if(req.query.maxPrice){
                params.push(req.query.maxPrice);
                baseQuery += ' AND (price <= $' + params.length + ')';        
            }
            const response = await pool.query(baseQuery, params);

            response.rows = response.rows.map((row) => {
                if (row.image){
                    row.image = 'https://giannfrancoo-servicio-web.herokuapp.com/items/' + row.id + '/imagen'
                }
                return row
            })

            res.status(200).json(response.rows);
        }
        catch(error){
            res.status(400).send("Error 400");
        }
    }
    else{
        res.status(400).send("Error 400")
    }
}

const getItemById = async (req, res) => {
    const id = req.params.id
    if(id % 1 == 0){
        const response = await pool.query('SELECT * FROM Items WHERE id = $1', [id]);

        if (response.rows.length < 1){
            res.status(404).send("Error 404")
        }

        response.rows = response.rows.map((row) => {
            if (row.image){
                row.image = 'https://giannfrancoo-servicio-web.herokuapp.com/items/' + row.id + '/imagen'
            }
            return row
        })

        res.status(200).json(response.rows);
    }
    else{
        res.status(400).send("Error 400");
    }
}

const getItemImage = async (req, res) => {
    const id = req.params.id

    if(id % 1 == 0){
        const response = await pool.query('SELECT image FROM Items WHERE id = $1', [id]);

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
    getItemsByCategory,
    getItemById,
    getItemImage,
}