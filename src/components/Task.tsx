import { Checkbox } from './ui/checkbox'

type TaskProps = {
	name: string
	checked?: boolean
}

export const Task = ({ name, checked = false }: TaskProps) => {
	return (
		<li className='font-medium flex items-center gap-2'>
			<Checkbox checked={checked} /> {name}
		</li>
	)
}
