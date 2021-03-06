import 'reflect-metadata'
import express from 'express'

export async function expressApp() {
    const app = express()
    await require('./src/loaders').default({ expressApp: app })
    return app
}

expressApp()
