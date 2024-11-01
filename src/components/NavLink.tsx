import { NavLink as Link, NavLinkProps } from 'react-router-dom'

import { cn } from '@/lib/utils'

export const NavLink = ({ className, ...props }: NavLinkProps) => {
	return (
		<Link
			className={({ isActive }) =>
				cn(
					'font-medium transition-colors text-center',
					!isActive && 'text-muted-foreground hover:text-foreground',
					className
				)
			}
			{...props}
		/>
	)
}
