import type { Response } from 'express'

interface ResponseJsonBase {
  status: number
  statusMsg: string
}

interface ResponseJsonData extends ResponseJsonBase {
  data: any
}

interface ResponseJsonMessage extends ResponseJsonBase {
  message: string
}

interface ResponseJsonMessageError extends ResponseJsonBase {
  error: string
  message: string
}

type Send<T = Response> = (body?: ResponseJsonData) => T
type SendMsg<T = Response> = (body?: ResponseJsonMessage) => T
type SendMsgError<T = Response> = (body?: ResponseJsonMessageError) => T

export interface CustomResponseData extends Response {
  json: Send<this>
}

export interface CustomResponseMessage extends Response {
  json: SendMsg<this>
}

export interface CustomResponseMessageError extends Response {
  json: SendMsgError<this>
}
