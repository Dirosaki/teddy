import { useModalStore } from '@/store'
import { Dialog } from './ui/dialog'

export const Modal = () => {
	const isOpen = useModalStore((state) => state.isOpen)
	const children = useModalStore((state) => state.children)
	const closeModal = useModalStore((state) => state.closeModal)

	return (
		<Dialog open={isOpen} onOpenChange={closeModal}>
			{children}
		</Dialog>
	)
}
