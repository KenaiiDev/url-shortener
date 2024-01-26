import { expect, suite, test, vi } from 'vitest'
import { httpResponse } from '../../../helpers/httpStatus'

suite('httpResponse', () => {
  test('OK should return a response with status 200 and success message', () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    }

    const data = { message: 'Success' }

    httpResponse.OK(res, data)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      statusMsg: 'Success',
      data
    })
  })

  test('OK_REDIRECT should redirect to the provided longUrl', () => {
    const res = {
      redirect: vi.fn()
    }

    const data = { longUrl: 'https://www.google.com' }

    httpResponse.OK_REDIRECT(res, data)

    expect(res.redirect).toHaveBeenCalledWith('https://www.google.com')
  })

  test('CREATED should return a response with status 201 and created message', () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    }

    const data = { message: 'Created' }

    httpResponse.CREATED(res, data)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      status: 201,
      statusMsg: 'Created',
      data
    })
  })

  test('BAD_REQUEST should return a response with status 400, bad request message, and error data', () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    }

    const message = 'Bad Request'
    const errorData = { message: 'Invalid input' }

    httpResponse.BAD_REQUEST(res, message, errorData)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      status: 400,
      statusMsg: 'Bad Request',
      message,
      error: errorData
    })
  })

  test('NOT_FOUND should return a response with status 404 and not found message', () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    }

    const message = 'Resource not found'

    httpResponse.NOT_FOUND(res, message)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      statusMsg: 'Not Found',
      message
    })
  })

  test('UNPROCESSABLE_ENTITY should return a response with status 422, unprocessable entity message, and error data', () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    }

    const message = 'Unprocessable Entity'
    const errorData = { message: 'Validation failed' }

    httpResponse.UNPROCESSABLE_ENTITY(res, message, errorData)

    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.json).toHaveBeenCalledWith({
      status: 422,
      statusMsg: 'Unprocessable Entity',
      message,
      error: errorData
    })
  })

  test('INTERNAL_SERVER_ERROR should return a response with status 500, internal server error message, and error message', () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    }

    const message = 'Internal Server Error'
    const error = new Error('Something went wrong')

    httpResponse.INTERNAL_SERVER_ERROR(res, message, error)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      statusMsg: 'Internal Server Error',
      message,
      error: error.message
    })
  })
})
