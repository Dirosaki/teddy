import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PartnerResponse } from '@/services/partners'

import { columns } from './columns'

type PartnersTableProps = {
	data: PartnerResponse[]
	isLoading?: boolean
}

export const PartnersTable = ({ data }: PartnersTableProps) => {
	const table = useReactTable<PartnerResponse>({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id} className='hover:bg-transparent'>
						{headerGroup.headers.map((header) => (
							<TableHead
								key={header.id}
								style={{
									width: header.getSize() !== 150 ? `${header.getSize()}px` : undefined,
								}}
							>
								{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
							</TableHead>
						))}
					</TableRow>
				))}
			</TableHeader>

			<TableBody>
				{table.getRowModel().rows.map((row) => (
					<TableRow key={row.id} className='hover:bg-muted/20'>
						{row.getVisibleCells().map((cell) => (
							<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
