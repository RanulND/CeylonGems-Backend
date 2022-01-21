const Admin = require("../models/admin")
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://ceylongems:N34qaZ8YpRHBb28@ceylongems.1jphx.mongodb.net/ceylongemsDB';

exports.adminSignIn = function (req, res, next) {
    var username = req.body.username
    var password = req.body.password

    // Admin.findOne({email:username})
    // .then(admin => {
    //     if(admin){
    //         let result = password.localeCompare(admin.password)
    //         if(result == 0){
    //             res.json({
    //                 message: 'Admin Login successful'
    //             })
    //         }
    //         else{
    //             res.json({
    //                 message: 'Invalid Password'
    //             })
    //         }
    //     }else{
    //         res.json({
    //             message: 'Admin not Found'
    //         })
    //     }
    // })

    const client = new MongoClient(uri);
    async function run() {
        try {
            await client.connect();
            const database = client.db("ceylongemsDB");
            const admins = database.collection("admin");
            // Query for a movie that has the title 'The Room'
            const query = { email: username };
            // const options = {
            //     // sort matched documents in descending order by rating
            //     sort: { "imdb.rating": -1 },
            //     // Include only the `title` and `imdb` fields in the returned document
            //     projection: { _id: 0, title: 1, imdb: 1 },
            // };
            const admin = await admins.findOne(query);

            if(admin){
                let result = password.localeCompare(admin.password)
                if(result == 0){
                    res.json({
                        message: 'Admin Login successful'
                    })
                }
                else{
                    res.json({
                        message: 'Invalid Password'
                    })
                }
            }else{
                res.json({
                    message: 'Admin not Found'
                })
            }

            // since this method returns the matched document, not a cursor, print it directly
            console.log(admin);
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);

    // return res.json({ "message": "This is working", "username" : username, "password" : password })
}