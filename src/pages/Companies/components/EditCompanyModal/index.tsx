import { zodResolver } from '@hookform/resolvers/zod'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'

import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CompanyResponse, updateCompany } from '@/services/companies'
import { useModalStore } from '@/store'

import { EditCompanyForm, schema } from './schema'

type EditCompanyModalProps = {
	data: CompanyResponse
}

export const EditCompanyModal = ({ data }: EditCompanyModalProps) => {
	const closeModal = useModalStore((state) => state.closeModal)

	const [searchParams] = useSearchParams()
	const searchValue = searchParams.get('search') ?? ''

	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: updateCompany,
		onSuccess: (newData) => {
			queryClient.setQueryData<CompanyResponse[]>(['companies', searchValue], (oldData = []) =>
				oldData.map((company) => (company.id === data.id ? newData : company))
			)
		},
	})

	const {
		formState: { isSubmitting, errors },
		...form
	} = useForm<EditCompanyForm>({
		resolver: zodResolver(schema),
	})

	useEffect(() => {
		form.reset({
			name: data?.companyName,
			collaboratorsCount: data?.collaboratorsCount,
		})
	}, [data])

	const handleSubmit = form.handleSubmit(async (formData) => {
		try {
			await mutation.mutateAsync({
				...data,
				companyName: formData.name,
				collaboratorsCount: formData.collaboratorsCount,
			})

			toast.success('Parceiro atualizado com sucesso!')
			closeModal()
		} catch {
			toast.error('Falha ao atualizar parceiro, tente novamente!')
		}
	})

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Editar empresa externa</DialogTitle>
				<DialogDescription>Modique os dados da empresa para editá-la</DialogDescription>
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
					<Input placeholder='Digite a quantidade de colaboradores' {...form.register('collaboratorsCount')} />
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
					{!isSubmitting && 'Salvar'}
				</Button>
			</DialogFooter>
		</DialogContent>
	)
}
