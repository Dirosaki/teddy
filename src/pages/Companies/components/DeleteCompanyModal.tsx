import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from 'components/ui/button'

import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CompanyResponse, deleteCompany } from '@/services/companies'
import { useModalStore } from '@/store'

type DeleteCompanyModalProps = {
	data: CompanyResponse
}

export const DeleteCompanyModal = ({ data }: DeleteCompanyModalProps) => {
	const closeModal = useModalStore((state) => state.closeModal)

	const [searchParams] = useSearchParams()
	const searchValue = searchParams.get('search') ?? ''

	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: deleteCompany,
		onSuccess: () => {
			queryClient.setQueryData<CompanyResponse[]>(['companies', searchValue], (oldData = []) =>
				oldData.filter((partner) => partner.id !== data.id)
			)
		},
	})

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		try {
			await mutation.mutateAsync(data.id)

			toast.success('Empresa excluído com sucesso!')
			closeModal()
		} catch {
			toast.error('Falha ao excluir empresa, tente novamente!')
		}
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Excluir empresa externa</DialogTitle>
				<DialogDescription>A exclusão da empresa será permanente.</DialogDescription>
			</DialogHeader>
			<p>
				Você tem certeza que deseja excluir a empresa:
				<b className='block font-medium'> {data.companyName}</b>
			</p>
			<form onSubmit={handleSubmit}>
				<DialogFooter>
					<Button
						className='flex-1'
						disabled={mutation.isPending}
						type='button'
						variant='secondary'
						onClick={closeModal}
					>
						Não, cancelar
					</Button>
					<Button className='flex-1' disabled={mutation.isPending} type='submit' variant='destructive'>
						{mutation.isPending && <LoaderCircle className='animate-spin duration-700' size={18} />}
						{!mutation.isPending && 'Sim, excluir'}
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	)
}
