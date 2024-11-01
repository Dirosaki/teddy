import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'

import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { createPartner, PartnerResponse } from '@/services/partners'
import { useModalStore } from '@/store'

import { RegisterPartnerForm, schema } from './schema'

export const RegisterPartnerModal = () => {
	const closeModal = useModalStore((state) => state.closeModal)

	const [searchParams] = useSearchParams()
	const searchValue = searchParams.get('search') ?? ''

	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: createPartner,
		onSuccess: (newData) => {
			queryClient.setQueryData<PartnerResponse[]>(['partners', searchValue], (oldData = []) => [...oldData, newData])
		},
	})

	const {
		formState: { isSubmitting, errors },
		...form
	} = useForm<RegisterPartnerForm>({
		resolver: zodResolver(schema),
		shouldUnregister: true,
	})

	const handleSubmit = form.handleSubmit(async (formData) => {
		try {
			await mutation.mutateAsync({
				name: formData.name,
				urlDoc: formData.site,
				createdAt: new Date().toISOString(),
			})

			console.log(['partners', searchValue])

			toast.success('Parceiro cadastrado com sucesso!')
			closeModal()
		} catch {
			toast.error('Falha ao cadastrar parceiro, tente novamente!')
		}
	})

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Cadastrar parceiro</DialogTitle>
				<DialogDescription>Insira os dados do parceiro para adicioná-lo à lista</DialogDescription>
			</DialogHeader>
			<form id='add-partner' className='space-y-4' onSubmit={handleSubmit}>
				<div className='space-y-1'>
					<Label>Nome</Label>
					<Input placeholder='Digite o nome do parceiro' {...form.register('name')} />
					{errors.name?.message && (
						<span className='mt-1 text-sm text-destructive inline-block'>{errors.name.message}</span>
					)}
				</div>
				<div className='space-y-1'>
					<Label>Site</Label>
					<Input placeholder='Digite o site do parceiro' {...form.register('site')} />
					{errors.site?.message && (
						<span className='mt-1 text-sm text-destructive inline-block'>{errors.site.message}</span>
					)}
				</div>
			</form>
			<DialogFooter>
				<Button type='button' className='flex-1' variant='secondary' onClick={closeModal}>
					Cancelar
				</Button>
				<Button type='submit' className='flex-1' form='add-partner' disabled={isSubmitting}>
					{isSubmitting && <LoaderCircle className='animate-spin duration-700' size={18} />}
					{!isSubmitting && 'Cadastrar'}
				</Button>
			</DialogFooter>
		</DialogContent>
	)
}
