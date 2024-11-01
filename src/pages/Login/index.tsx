import { zodResolver } from '@hookform/resolvers/zod'
import cookies from 'js-cookie'
import { LoaderCircle } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from 'components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'components/ui/card'
import { Checkbox } from 'components/ui/checkbox'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'

import { useAuthStore } from '@/store'
import { wait } from '@/utils/wait'

import { LoginForm, schema } from './schema'

export default function Login() {
	const username = cookies.get('username')

	const {
		formState: { isSubmitting, errors },
		...form
	} = useForm<LoginForm>({
		resolver: zodResolver(schema),
		defaultValues: { username },
	})

	const setLoggedIn = useAuthStore((state) => state.setLoggedIn)

	const handleSubmit = form.handleSubmit(async (data) => {
		const isStayConnected = data['stay-connected']

		await wait()

		if (isStayConnected) {
			cookies.set('username', data.username, {
				expires: 30,
			})
		} else {
			cookies.remove('username')
		}

		setLoggedIn(data.username)
	})

	return (
		<form className='m-auto w-full max-w-sm' onSubmit={handleSubmit}>
			<Card>
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Digite suas credenciais abaixo para fazer login em sua conta</CardDescription>
				</CardHeader>

				<CardContent className='space-y-4'>
					<div className='space-y-1'>
						<Label>Usuário</Label>
						<Input placeholder='Digite seu usuário' {...form.register('username')} />
						{errors.username?.message && (
							<span className='mt-1 text-sm text-destructive inline-block'>{errors.username.message}</span>
						)}
					</div>
					<div className='space-y-1'>
						<Label>Senha</Label>
						<Input placeholder='Digite sua senha' type='password' {...form.register('password')} />
						{errors.password?.message && (
							<span className='mt-1 text-sm text-destructive inline-block'>{errors.password.message}</span>
						)}
					</div>
					<div className='flex items-center gap-1'>
						<Controller
							name='stay-connected'
							control={form.control}
							render={({ field }) => (
								<Checkbox id='stay-connected' checked={field.value} onCheckedChange={field.onChange} />
							)}
						/>
						<Label htmlFor='stay-connected'>Mantenha-me conectado</Label>
					</div>
				</CardContent>

				<CardFooter>
					<Button type='submit' disabled={isSubmitting} className='w-full'>
						{isSubmitting && <LoaderCircle className='animate-spin duration-700' size={18} />}
						{!isSubmitting && 'Entrar'}
					</Button>
				</CardFooter>
			</Card>
		</form>
	)
}
