import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from 'components/ui/button'

import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { deletePartner, PartnerResponse } from '@/services/partners'
import { useModalStore } from '@/store'

type DeletePartnerModalProps = {
	data: PartnerResponse
}

export const DeletePartnerModal = ({ data }: DeletePartnerModalProps) => {
	const closeModal = useModalStore((state) => state.closeModal)

	const [searchParams] = useSearchParams()
	const searchValue = searchParams.get('search') ?? ''

	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: deletePartner,
		onSuccess: () => {
			queryClient.setQueryData<PartnerResponse[]>(['partners', searchValue], (oldData = []) =>
				oldData.filter((partner) => partner.id !== data.id)
			)
		},
	})

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		try {
			await mutation.mutateAsync(data.id)

			toast.success('Parceiro excluído com sucesso!')
			closeModal()
		} catch {
			toast.error('Falha ao excluir parceiro, tente novamente!')
		}
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Excluir parceiro</DialogTitle>
				<DialogDescription>A exclusão do parceiro será permanente.</DialogDescription>
			</DialogHeader>
			<p>
				Você tem certeza que deseja excluir o parceiro:
				<b className='block font-medium'> {data.name}</b>
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
