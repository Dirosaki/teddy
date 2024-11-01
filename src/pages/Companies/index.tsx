import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { LoaderCircle, PackageOpen, RefreshCw, X } from 'lucide-react'
import { ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'

import { Modal } from '@/components/Modal'
import { useDebounce } from '@/hooks/useDebounce'
import { cn } from '@/lib/utils'
import { CompanyResponse, useGetCompanies } from '@/services/companies'
import { useModalStore } from '@/store'

import { CompanyTable } from './components/CompanyTable'
import { RegisterCompanyModal } from './components/RegisterCompanyModal'

export default function Companies() {
	const [searchParams, setSearchParams] = useSearchParams()
	const searchValue = searchParams.get('search') ?? ''

	const searchDebounced = useDebounce(searchValue)

	const {
		data: companies,
		isError,
		isFetching,
		isPending,
		isSuccess,
		refetch,
	} = useQuery<CompanyResponse[], AxiosError>({
		queryKey: useGetCompanies.queryKey(searchDebounced),
		queryFn: ({ signal }) => useGetCompanies.queryFn(searchDebounced, signal),
		placeholderData: keepPreviousData,
		staleTime: 1000 * 60 * 1,
	})

	const openModal = useModalStore((state) => state.openModal)

	const handleOpenRegisterCompanyModal = () => {
		openModal(<RegisterCompanyModal />)
	}

	const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target
		if (value) {
			setSearchParams({ search: value }, { replace: true })
		} else {
			setSearchParams({}, { replace: true })
		}
	}

	const handleClearSearch = () => setSearchParams({}, { replace: true })

	const isNoDataFound = isSuccess && !companies.length
	const hasData = isSuccess && !!companies.length

	return (
		<>
			<div className='flex-1 max-w-screen-xl mx-auto flex flex-col'>
				<h1 className='text-2xl font-bold'>Empresas externas</h1>
				<p className='text-muted-foreground mt-1'>Aqui está a lista de todas as empresas externas</p>

				<div className='flex items-center mt-8 justify-between mb-4'>
					<Button size='icon' variant='outline' onClick={refetch}>
						<RefreshCw className={cn('animate-spin-once animate-paused duration-300', isFetching && 'animate-play')} />
					</Button>

					<Input
						placeholder='Pesquisar por empresas...'
						className='w-64 relative z-10 ml-2'
						onChange={handleChangeSearch}
						value={searchValue}
					/>

					<Button
						type='button'
						onClick={handleClearSearch}
						size='icon'
						variant='outline'
						tabIndex={searchValue ? 0 : -1}
						className={cn(
							'mr-auto -translate-x-[48px] relative z-0 transition-all',
							searchValue && 'ml-2 translate-x-0'
						)}
					>
						<X />
					</Button>

					<Button type='button' onClick={handleOpenRegisterCompanyModal}>
						Cadastrar empresa
					</Button>
				</div>

				<div className='flex border rounded-md max-h-[calc(100vh-276px)] flex-1 overflow-hidden flex-col'>
					{isPending && (
						<div className='flex m-auto flex-col items-center gap-2'>
							<LoaderCircle className='animate-spin duration-700' size={32} absoluteStrokeWidth />
							<p className='text-muted-foreground'>Carregando empresas externas...</p>
						</div>
					)}

					{isNoDataFound && (
						<div className='flex m-auto flex-col items-center gap-2'>
							<PackageOpen size={32} absoluteStrokeWidth />
							<p className='text-muted-foreground'>
								Não foi encontrado nenhuma empresa externa correspondente à sua pesquisa.
							</p>
						</div>
					)}

					{isError && (
						<div className='flex m-auto flex-col items-center gap-2'>
							<LoaderCircle size={32} absoluteStrokeWidth />
							<p className='text-muted-foreground'>Erro</p>
						</div>
					)}

					{hasData && <CompanyTable data={companies} />}
				</div>
			</div>
			<Modal />
		</>
	)
}
