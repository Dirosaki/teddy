import axios, { isAxiosError } from 'axios'

export type RegisterPartnerPayload = {
	name: string
	urlDoc: string
	createdAt: string
}

export type EditPartnerPayload = RegisterPartnerPayload & {
	id: string
}

export type PartnerResponse = {
	id: string
	name: string
	urlDoc: string
	createdAt: string
}

const getPartners = async (search?: string, signal?: AbortSignal) => {
	try {
		const response = await axios.get<PartnerResponse[]>(import.meta.env.VITE_PARTNERS_URL, {
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

export const useGetPartners = {
	queryKey: (search: string) => ['partners', search],
	queryFn: getPartners,
}

export const createPartner = async (data: RegisterPartnerPayload) => {
	const response = await axios.post<PartnerResponse>(import.meta.env.VITE_PARTNERS_URL, data)

	return response.data
}

export const updatePartner = async ({ id, ...data }: EditPartnerPayload) => {
	const response = await axios.put<PartnerResponse>(`${import.meta.env.VITE_PARTNERS_URL}/${id}`, data)

	return response.data
}

export const deletePartner = async (id: string) => {
	const response = await axios.delete(`${import.meta.env.VITE_PARTNERS_URL}/${id}`)

	return response.data
}
