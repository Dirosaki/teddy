import { ColumnDef } from '@tanstack/react-table'
import { Pencil, Trash2 } from 'lucide-react'

import { Button } from 'components/ui/button'

import { PartnerResponse } from '@/services/partners'
import { useModalStore } from '@/store'
import { formatDate } from '@/utils/formatDate'

import { DeletePartnerModal } from '../DeletePartnerModal'
import { EditPartnerModal } from '../EditPartnerModal'

const openModal = useModalStore.getState().openModal

export const columns: ColumnDef<PartnerResponse>[] = [
	{
		accessorKey: 'name',
		header: 'Nome',
		size: 379,
	},
	{
		accessorKey: 'urlDoc',
		header: 'Site',
		size: 379,
	},
	{
		accessorKey: 'createdAt',
		header: 'Data de criação',
		size: 379,
		cell: ({ row }) => formatDate(row.original.createdAt),
	},
	{
		accessorKey: 'actions',
		header: () => <div className='flex justify-center'>Ações</div>,
		cell: ({ row }) => (
			<div className='flex gap-2 justify-center'>
				<Button
					size='icon'
					className='size-8'
					variant='outline'
					onClick={() => openModal(<EditPartnerModal data={row.original} />)}
				>
					<Pencil />
				</Button>

				<Button
					size='icon'
					className='size-8'
					variant='outline'
					onClick={() => openModal(<DeletePartnerModal data={row.original} />)}
				>
					<Trash2 />
				</Button>
			</div>
		),
	},
]
