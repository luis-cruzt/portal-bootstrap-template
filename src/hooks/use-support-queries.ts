import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supportService } from '@/services/support.service'

export const supportKeys = {
  all: ['support'] as const,
  tickets: () => [...supportKeys.all, 'tickets'] as const,
  ticket: (id: string) => [...supportKeys.tickets(), id] as const,
}

export function useSupportTickets(params?: Record<string, string | number>) {
  return useQuery({
    queryKey: [...supportKeys.tickets(), params],
    queryFn: () => supportService.getTickets(params),
  })
}

export function useSupportTicket(id: string) {
  return useQuery({
    queryKey: supportKeys.ticket(id),
    queryFn: () => supportService.getTicket(id),
    enabled: !!id,
  })
}

export function useUpdateSupportTicket() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      supportService.updateTicket(id, data),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: supportKeys.ticket(id) })
      queryClient.invalidateQueries({ queryKey: supportKeys.tickets() })
    },
  })
}
