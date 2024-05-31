import express from 'express'
import cors from 'cors'
import { notFound } from './middleware/notFound.js'
import { env } from './config/environment.js'
//import { connection, CONNECT_DB, CLOSE_DB } from './config/database.js'
import exitHook from 'async-exit-hook'
import Router from './route/index.js'
import bodyParser from 'body-parser'
import { connection, close } from './config/connection.js'

const app = express();

const start = async () => {
  // CONNECT_DB()
  connection();
  //app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  //app.use(notFound)
  // app.get("/patients", async (req, res) => {
  //   const sql = "SELECT * FROM patients WHERE id = ?; SELECT * FROM treatment_process WHERE patient_id = ?"
  //   await connection.promise().query(sql, [1, 1])
  //     .then(([rows, fields]) => {
  //       //return your results
  //       const result = {
  //         ...rows[0],
  //         schedule: rows[1]
  //       }
  //       return res.json(result)
  //     })
  //     .catch(console.log)
  // })
  app.use('/v1', Router)

  app.listen(env.PORT, () =>
    console.log(`Server is live @ ${env.HOST_URL}`),
  )
  //CLOSE_DB()
  exitHook(() => {
    console.log('exit app')
    close()
    //CLOSE_DB()
  })
}
start()