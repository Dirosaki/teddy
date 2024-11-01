import { z } from 'zod'

export const schema = z.object({
	name: z.string().min(1, 'Campo obrigatório.').min(3, 'O campo deve ter pelo menos 3 caracteres.'),
	site: z.string().min(1, 'Campo obrigatório.').url('URL inválida.'),
})

export type EditPartnerForm = z.infer<typeof schema>
