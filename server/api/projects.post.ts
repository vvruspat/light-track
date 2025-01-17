import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate the request body
  if (!body.title) {
    return {
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Title is required',
    }
  }

  if (!body.groupId) {
    return {
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Group ID is required',
    }
  }

  // Create the project (this is a placeholder, replace with actual logic)
  const newProject = {
    title: body.title,
    description: body.description || '',
    ownerId: body.ownerId,
    groupId: body.groupId,
  }

  // Return the created project
  return {
    statusCode: 201,
    statusMessage: 'Created',
    data: newProject,
  }
})