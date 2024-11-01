import { ReactNode } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type ModalStore = {
	isOpen: boolean
	children: ReactNode
}

type ModalActions = {
	openModal: (children: ReactNode) => void
	closeModal: () => void
}

export type Store = ModalActions & ModalStore

export const useModalStore = create<Store>()(
	devtools(
		immer((set) => ({
			isOpen: false,
			children: null,
			data: undefined,

			openModal: (children) => {
				set((store) => {
					store.isOpen = true
					store.children = children
				})
			},

			closeModal: () => {
				set((store) => {
					store.isOpen = false
				})
			},
		})),
		{ enabled: import.meta.env.DEV }
	)
)
