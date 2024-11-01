type TechProps = {
	name: string
}

export const Tech = ({ name }: TechProps) => {
	return <li className='font-medium list-disc list-inside'>{name}</li>
}
