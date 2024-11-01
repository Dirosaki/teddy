import { z } from 'zod'

export const schema = z.object({
	name: z.string().min(1, 'Campo obrigatório.').min(3, 'O campo deve ter pelo menos 3 caracteres.'),
	collaboratorsCount: z.coerce
		.number()
		.positive('A empresa deve ter pelo menos 3 colaboradores.')
		.min(3, 'A empresa deve ter pelo menos 3 colaboradores.'),
})

export type EditCompanyForm = z.infer<typeof schema>
