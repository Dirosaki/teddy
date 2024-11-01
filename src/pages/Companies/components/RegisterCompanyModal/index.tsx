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
import { CompanyResponse, createCompany } from '@/services/companies'
import { useModalStore } from '@/store'

import { RegisterCompanyForm, schema } from './schema'

export const RegisterCompanyModal = () => {
	const closeModal = useModalStore((state) => state.closeModal)

	const [searchParams] = useSearchParams()
	const searchValue = searchParams.get('search') ?? ''

	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: createCompany,
		onSuccess: (newData) => {
			queryClient.setQueryData<CompanyResponse[]>(['companies', searchValue], (oldData = []) => [...oldData, newData])
		},
	})

	const {
		formState: { isSubmitting, errors },
		...form
	} = useForm<RegisterCompanyForm>({
		resolver: zodResolver(schema),
		shouldUnregister: true,
		defaultValues: {
			collaboratorsCount: 3,
		},
	})

	const handleSubmit = form.handleSubmit(async (formData) => {
		try {
			await mutation.mutateAsync({
				companyName: formData.name,
				collaboratorsCount: formData.collaboratorsCount,
				createdAt: new Date().toISOString(),
			})

			toast.success('Parceiro cadastrado com sucesso!')
			closeModal()
		} catch {
			toast.error('Falha ao cadastrar parceiro, tente novamente!')
		}
	})

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Cadastrar empresa externa</DialogTitle>
				<DialogDescription>Insira os dados da empresa para adicioná-lo à lista</DialogDescription>
			</DialogHeader>
			<form id='add-partner' className='space-y-4' onSubmit={handleSubmit}>
				<div className='space-y-1'>
					<Label>Nome</Label>
					<Input placeholder='Digite o nome da empresa' {...form.register('name')} />
					{errors.name?.message && (
						<span className='mt-1 text-sm text-destructive inline-block'>{errors.name.message}</span>
					)}
				</div>
				<div className='space-y-1'>
					<Label>Quantidade de colaboradores</Label>
					<Input
						placeholder='Digite a quantidade de colaboradores'
						type='number'
						{...form.register('collaboratorsCount')}
					/>
					{errors.collaboratorsCount?.message && (
						<span className='mt-1 text-sm text-destructive inline-block'>{errors.collaboratorsCount.message}</span>
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
