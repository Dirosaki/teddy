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
import { PartnerResponse, updatePartner } from '@/services/partners'
import { useModalStore } from '@/store'

import { EditPartnerForm, schema } from './schema'

type EditPartnerModalProps = {
	data: PartnerResponse
}

export const EditPartnerModal = ({ data }: EditPartnerModalProps) => {
	const closeModal = useModalStore((state) => state.closeModal)

	const [searchParams] = useSearchParams()
	const searchValue = searchParams.get('search') ?? ''

	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: updatePartner,
		onSuccess: (newData) => {
			queryClient.setQueryData<PartnerResponse[]>(['partners', searchValue], (oldData = []) =>
				oldData.map((partner) => (partner.id === data.id ? newData : partner))
			)
		},
	})

	const {
		formState: { isSubmitting, errors },
		...form
	} = useForm<EditPartnerForm>({
		resolver: zodResolver(schema),
		shouldUnregister: true,
	})

	useEffect(() => {
		form.reset({
			name: data?.name,
			site: data?.urlDoc,
		})
	}, [data])

	const handleSubmit = form.handleSubmit(async (formData) => {
		try {
			await mutation.mutateAsync({ ...data, name: formData.name, urlDoc: formData.site })

			toast.success('Parceiro atualizado com sucesso!')
			closeModal()
		} catch {
			toast.error('Falha ao atualizar parceiro, tente novamente!')
		}
	})

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Editar parceiro</DialogTitle>
				<DialogDescription>Modique os dados do parceiro para editá-lo</DialogDescription>
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
					{!isSubmitting && 'Salvar'}
				</Button>
			</DialogFooter>
		</DialogContent>
	)
}
