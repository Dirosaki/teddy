import { ColumnDef } from '@tanstack/react-table'
import { Pencil, Trash2 } from 'lucide-react'

import { Button } from 'components/ui/button'

import { useModalStore } from '@/store'
import { formatDate } from '@/utils/formatDate'

import { CompanyResponse } from '@/services/companies'
import { DeleteCompanyModal } from '../DeleteCompanyModal'
import { EditCompanyModal } from '../EditCompanyModal'

const openModal = useModalStore.getState().openModal

export const columns: ColumnDef<CompanyResponse>[] = [
	{
		accessorKey: 'companyName',
		header: 'Nome',
		size: 379,
	},
	{
		accessorKey: 'collaboratorsCount',
		header: 'Quantidade de colaboradores',
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
					onClick={() => openModal(<EditCompanyModal data={row.original} />)}
				>
					<Pencil />
				</Button>

				<Button
					size='icon'
					className='size-8'
					variant='outline'
					onClick={() => openModal(<DeleteCompanyModal data={row.original} />)}
				>
					<Trash2 />
				</Button>
			</div>
		),
	},
]
