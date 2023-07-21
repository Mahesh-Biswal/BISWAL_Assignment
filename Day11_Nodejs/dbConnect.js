import mysql from 'mysql2';

class DbConnect {

    async connectToDb() {

        try {

            const connection = await mysql.createConnection({

                host: "localhost",

                user: "root",

                password: "mahesh",

                port: 3067

            });

            connection.connect(function (err) {

                if (err) throw err;

                console.log("Connected!");

            });

            return true;

        } catch (ex) {

            return false;

        }

    }

}



export default DbConnect;