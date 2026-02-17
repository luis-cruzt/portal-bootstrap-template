import apiClient from '@/lib/api-client'

export interface SupportTicket {
  id: string
  subject: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  createdAt: string
  updatedAt: string
  userId?: string
}

export const supportService = {
  /**
   * Fetch paginated list of support tickets.
   */
  async getTickets(params?: Record<string, string | number>) {
    return apiClient.get<SupportTicket[]>('/support/tickets', { params })
  },

  /**
   * Fetch a single support ticket by ID.
   */
  async getTicket(id: string) {
    return apiClient.get<SupportTicket>(`/support/tickets/${id}`)
  },

  /**
   * Update a support ticket.
   */
  async updateTicket(id: string, data: Record<string, unknown>) {
    return apiClient.patch<SupportTicket>(`/support/tickets/${id}`, data)
  },

  /**
   * Close a support ticket.
   */
  async closeTicket(id: string) {
    return apiClient.patch<SupportTicket>(`/support/tickets/${id}`, {
      status: 'closed',
    })
  },
}
