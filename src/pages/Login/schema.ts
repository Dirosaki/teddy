import { z } from 'zod'

export const schema = z.object({
	username: z.string().min(1, 'Campo obrigatório.').min(3, 'O campo deve ter pelo menos 3 caracteres.').toLowerCase(),
	password: z.string().min(1, 'Campo obrigatório.').min(6, 'A senha deve ter pelo menos 6 caracteres.'),
	'stay-connected': z.boolean().default(false),
})

export type LoginForm = z.infer<typeof schema>
