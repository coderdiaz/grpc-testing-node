import 'dotenv/config'
import { resolve } from 'path'
import * as grpc from 'grpc'

// Variables
const PROTOFILE = process.env.PROTOFILE
const CUSTOM_PACKAGE = process.env.PACKAGE
const SERVICE = process.env.SERVICE
const GRPC_HOST = process.env.GRPC_HOST
const PROTO_PATH = resolve(__dirname, PROTOFILE)

// Loading protofile
const grpcClient = grpc.load(PROTO_PATH)[CUSTOM_PACKAGE]

// Client for test grpc requests
const client = new grpcClient[SERVICE](GRPC_HOST, grpc.credentials.createInsecure())

// Your logic for handle grpc methods
