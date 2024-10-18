import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return 'index'
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {
    return 'create'
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    return { massage: 'store', request }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return { massage: 'show', params }
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {
    return { massage: 'edit', params }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    return { massage: 'update', params, request }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    return { massage: 'destroy', params }
  }
}
