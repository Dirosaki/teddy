import { Task } from '@/components/Task'
import { Tech } from '@/components/Tech'
import tasks from '@/data/tasks.json'
import techs from '@/data/techs.json'

export default function Home() {
	return (
		<div className='flex-1 max-w-screen-xl mx-auto flex flex-col'>
			<h1 className='text-2xl font-bold'>Sobre o projeto</h1>
			<p className='text-muted-foreground mt-1'>Aqui você entender um pouco mais sobre o projeto.</p>

			<div className='mt-8'>
				<strong className='text-xl font-bold'>Descrição</strong>
				<p className='mt-2 mb-8'>
					Este projeto é um micro-frontend feito para uma vaga de Desenvolvedor Front-End na <b>Teddy Open Finance</b>,
					uma fintech inovadora que visa revolucionar o mercado financeiro, oferecendo soluções modernas e lucrativas
					para profissionais autônomos e escritórios da área. Através da Teddy 360°, nossa plataforma busca digitalizar
					rotinas financeiras, conectar profissionais a uma ampla gama de produtos e instituições, e provar que é
					possível conquistar o sucesso bancário de forma autônoma.
				</p>

				<strong className='text-xl font-bold'>Objetivo</strong>
				<p className='mt-2 mb-8 '>
					O objetivo é que possamos cadastrar os parceiros que temos integrados em nossas aplicações, com informações
					dele, onde usamos e quais clientes atendemos.
				</p>

				<div className='grid grid-cols-2'>
					<div>
						<strong className='text-xl font-bold'>Stack</strong>
						<ul className='mt-2 mb-8 space-y-1'>
							{techs.map((tech) => (
								<Tech key={tech.name} name={tech.name} />
							))}
						</ul>
					</div>

					<div>
						<strong className='text-xl font-bold'>Tarefas feitas</strong>
						<ul className='mt-2 mb-8 space-y-1'>
							{tasks.map((task) => (
								<Task key={task.name} name={task.name} checked={task.checked} />
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
