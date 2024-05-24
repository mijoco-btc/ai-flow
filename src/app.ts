import { setConfigOnStart, getConfig, printConfig } from './core/config';
import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connect } from './core/data/mongodb_connection'
import { configRoutes } from './server/routes/config/configRoutes'
import { audionalsRoutes } from './server/routes/audionals/audionalsRoutes'
import { runesRoutes } from './server/routes/runes/runesRoutes'
import { datasetsRoutes } from './server/routes/datasets/datasetsRoutes'
import { WebSocketServer } from 'ws'
import { testJob } from './server/routes/jobs/JobScheduler';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());

app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(cors()); 
setConfigOnStart();
printConfig()

app.use((req, res, next) => {
  console.log('app.use: ok ' + req.method)
  next()
})

app.use('/config/v1', configRoutes);
app.use('/runes/v1', runesRoutes);
app.use('/audionals/v1', audionalsRoutes);
app.use('/datasets/v1', datasetsRoutes);

console.log(`\n\nExpress is listening at http://localhost:${getConfig().port}`);
console.log('Startup Environment: ', process.env.TARGET_ENV);
console.log(`Mongo connection at ${getConfig().mongoDbUrl}`);
console.log(`NODE_ENV ${process.env.NODE_ENV}\n\n`);

async function connectToMongoCloud() {

  await connect();

  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  const server = app.listen(getConfig().port, () => {
    return;
  });
  const wss = new WebSocketServer({ server })
  testJob.start();

  wss.on('connection', function connection(ws:any) {
    ws.on('message', function incoming(message:any) { 
      ws.send('Got your new rates : ' + message)
    })
  })
}

connectToMongoCloud();

