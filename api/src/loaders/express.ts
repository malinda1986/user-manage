import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import routes from '../api';
import config from '../config';


export default ({ app }: { app: express.Application }) => {

  
  app.get(`/${config.apiVersion}/health`, (req, res) => {
    res.status(200).json({success: true, message: 'Ok'});
  });
  app.use(cors());
  app.use(require('method-override')());
  app.use(express.json({limit: '50mb'}));
  app.use(express.urlencoded({limit: '50mb'}));
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(`/${config.apiVersion}`, routes());

};
