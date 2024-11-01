import axios, { isAxiosError } from 'axios'

export type RegisterCompanyPayload = {
	companyName: string
	collaboratorsCount: number
	createdAt: string
}

export type EditCompanyPayload = RegisterCompanyPayload & {
	id: string
}

export type CompanyResponse = {
	id: string
	createdAt: string
	companyName: string
	collaboratorsCount: number
	isActive: boolean
}

const getCompanies = async (search?: string, signal?: AbortSignal) => {
	try {
		const response = await axios.get<CompanyResponse[]>(import.meta.env.VITE_COMPANIES_URL, {
			params: { search: search || undefined },
			signal,
		})

		return response.data
	} catch (error) {
		if (isAxiosError(error) && error.status === 404) {
			return []
		}

		throw error
	}
}

export const useGetCompanies = {
	queryKey: (search: string) => ['companies', search],
	queryFn: getCompanies,
}

export const createCompany = async (data: RegisterCompanyPayload) => {
	const response = await axios.post<CompanyResponse>(import.meta.env.VITE_COMPANIES_URL, data)

	return response.data
}

export const updateCompany = async ({ id, ...data }: EditCompanyPayload) => {
	const response = await axios.put<CompanyResponse>(`${import.meta.env.VITE_COMPANIES_URL}/${id}`, data)

	return response.data
}

export const deleteCompany = async (id: string) => {
	const response = await axios.delete(`${import.meta.env.VITE_COMPANIES_URL}/${id}`)

	return response.data
}
