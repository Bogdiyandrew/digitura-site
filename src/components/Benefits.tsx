'use client';

import React, { useRef, useEffect, ReactElement } from 'react';
import { Target, Shield, Sparkles, Settings, Gauge, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Asigură-te că ai gsap instalat și configurat pentru Next.js
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Interfețe TypeScript
interface Benefit {
  title: string;
  desc: string;
  icon: ReactElement;
  gradient: string;
  borderColor: string;
  hoverColor: string;
  stat: string;
  statLabel: string;
  iconColor: 'teal' | 'blue'; // Adăugăm o proprietate separată pentru culoare
}

// --- MODIFICARE TEXTE BENEFICII ---
// Am înlocuit primul beneficiu pentru a elimina repetiția și a introduce un concept nou.
const benefits: Benefit[] = [
	{
		title: 'Un Magnet Pentru Clienții Potriviți',
		desc: 'Nu construim doar un site frumos, ci o platformă optimizată strategic (SEO, mesaje clare) pentru a atrage exact tipul de client pe care ți-l dorești și a-l convinge să acționeze.',
		icon: <Target className="w-8 h-8 text-blue-400" />,
		gradient: 'from-blue-500/20 to-teal-500/20',
		borderColor: 'border-blue-500/30',
		hoverColor: 'hover:border-blue-400/60 hover:shadow-blue-400/20',
		stat: '100%',
		statLabel: 'Targetat',
		iconColor: 'blue',
	},
	{
		title: 'Imaginea care Vinde din Prima Secundă',
		desc: 'În online, imaginea este totul. Creăm un design impecabil care elimină orice dubiu și comunică instantaneu: "Aceasta este o firmă serioasă".',
		icon: <Sparkles className="w-8 h-8 text-teal-400" />,
		gradient: 'from-teal-500/20 to-blue-500/20',
		borderColor: 'border-teal-500/30',
		hoverColor: 'hover:border-teal-400/60 hover:shadow-teal-400/20',
		stat: '100%',
		statLabel: 'Profesionalism',
		iconColor: 'teal',
	},
	{
		title: 'Tehnologie Complexă, Liniște Completă',
		desc: 'Tu te concentrezi pe afacerea ta, noi gestionăm tehnologia. Uită de update-uri, erori sau probleme de securitate. Primești un sistem robust care pur și simplu funcționează.',
		icon: <Shield className="w-8 h-8 text-blue-400" />,
		gradient: 'from-blue-500/20 to-teal-500/20',
		borderColor: 'border-blue-500/30',
		hoverColor: 'hover:border-blue-400/60 hover:shadow-blue-400/20',
		stat: 'Zero',
		statLabel: 'Stres',
		iconColor: 'blue',
	},
	{
		title: 'Recuperează-ți Timpul, Automatizează Succesul',
		desc: 'Delegăm sarcinile repetitive către sisteme inteligente. Eliberăm zeci de ore pe lună pentru ca tu să te poți ocupa de strategie și inovație, nu de muncă de rutină.',
		icon: <Settings className="w-8 h-8 text-teal-400" />,
		gradient: 'from-teal-600/20 to-blue-400/20',
		borderColor: 'border-teal-500/30',
		hoverColor: 'hover:border-teal-400/60 hover:shadow-teal-400/20',
		stat: '+20h',
		statLabel: 'Timp salvat',
		iconColor: 'teal',
	},
	{
		title: 'Viteză care Convertește, Nu doar Impresionează',
		desc: 'Fiecare secundă de așteptare înseamnă clienți pierduți. Construim site-uri fulgerător de rapide care încântă vizitatorii și sunt iubite de Google.',
		icon: <Gauge className="w-8 h-8 text-blue-400" />,
		gradient: 'from-blue-600/20 to-teal-400/20',
		borderColor: 'border-blue-500/30',
		hoverColor: 'hover:border-blue-400/60 hover:shadow-blue-400/20',
		stat: '<1.5s',
		statLabel: 'Încărcare',
		iconColor: 'blue',
	},
	{
		title: 'De la Idee la Impact, în Timp Record',
		desc: 'Agilitatea este cheia. Procesul nostru optimizat ne permite să lansăm prezența ta online în câteva zile, nu luni. Începi să culegi roadele investiției tale aproape imediat.',
		icon: <Rocket className="w-8 h-8 text-teal-400" />,
		gradient: 'from-teal-500/20 to-blue-500/20',
		borderColor: 'border-teal-500/30',
		hoverColor: 'hover:border-teal-400/60 hover:shadow-teal-400/20',
		stat: 'Zile',
		statLabel: 'Nu luni',
		iconColor: 'teal',
	},
];

const Benefits: React.FC = () => {
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const ctx = gsap.context(() => {
			gsap.fromTo('.benefits-title', 
				{ opacity: 0, y: 40, scale: 0.9 }, 
				{ 
					opacity: 1, 
					y: 0, 
					scale: 1, 
					duration: 1, 
					ease: 'back.out(1.3)', 
					scrollTrigger: { 
						trigger: sectionRef.current, 
						start: 'top 75%', 
						once: true 
					} 
				}
			);

			gsap.fromTo('.benefits-subtitle', 
				{ opacity: 0, y: 20 }, 
				{ 
					opacity: 1, 
					y: 0, 
					duration: 0.8, 
					ease: 'power3.out', 
					scrollTrigger: { 
						trigger: sectionRef.current, 
						start: 'top 75%', 
						once: true 
					}, 
					delay: 0.3 
				}
			);

			gsap.fromTo('.benefit-card', 
				{ opacity: 0, y: 60, scale: 0.8, rotationY: 45 }, 
				{ 
					opacity: 1, 
					y: 0, 
					scale: 1, 
					rotationY: 0, 
					duration: 0.8, 
					ease: 'back.out(1.2)', 
					stagger: { 
						amount: 0.6, 
						grid: [2, 3], 
						from: 'start' 
					}, 
					scrollTrigger: { 
						trigger: sectionRef.current, 
						start: 'top 60%', 
						once: true 
					}, 
					delay: 0.6 
				}
			);

			gsap.fromTo('.benefit-stat', 
				{ opacity: 0, scale: 0.5 }, 
				{ 
					opacity: 1, 
					scale: 1, 
					duration: 0.6, 
					ease: 'back.out(1.4)', 
					stagger: 0.1, 
					scrollTrigger: { 
						trigger: sectionRef.current, 
						start: 'top 50%', 
						once: true 
					}, 
					delay: 1.2 
				}
			);

			gsap.fromTo('.bg-blob', 
				{ opacity: 0, scale: 0.8, rotation: -45 }, 
				{ 
					opacity: 1, 
					scale: 1, 
					rotation: 0, 
					duration: 1.5, 
					ease: 'power2.out', 
					stagger: 0.3, 
					scrollTrigger: { 
						trigger: sectionRef.current, 
						start: 'top 80%', 
						once: true 
					} 
				}
			);
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			id="beneficii"
			ref={sectionRef}
			className="w-full py-28 bg-gradient-to-br from-slate-950 to-slate-900 text-white relative overflow-hidden"
			style={{ fontFamily: 'Exo2, sans-serif' }}
		>
			<div className="bg-blob absolute left-0 top-0 w-48 h-48 bg-teal-400/8 rounded-full blur-3xl opacity-0" />
			<div className="bg-blob absolute right-0 bottom-0 w-56 h-56 bg-blue-400/8 rounded-full blur-3xl opacity-0" />
			<div className="bg-blob absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-teal-400/5 to-blue-400/5 rounded-full blur-3xl opacity-0" />

			<div className="max-w-6xl mx-auto px-6 text-center relative z-10">
				<div className="mb-16">
					<h2 className="benefits-title text-4xl md:text-5xl font-bold mb-6 opacity-0">
						Nu doar un Site. <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">Un Avantaj Competitiv.</span>
					</h2>
					<p className="benefits-subtitle text-lg md:text-xl text-slate-300 max-w-3xl mx-auto opacity-0">
						Fiecare funcționalitate este gândită ca o investiție directă în afacerea ta. Acestea nu sunt promisiuni, sunt rezultate.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{benefits.map((benefit: Benefit) => (
						<div
							key={benefit.title}
							className={`benefit-card group relative p-8 rounded-2xl bg-gradient-to-br ${benefit.gradient} border-2 ${benefit.borderColor} ${benefit.hoverColor} hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl backdrop-blur-sm opacity-0`}
						>
							<div className="benefit-stat absolute -top-4 -right-4 bg-slate-800/90 border border-slate-600 rounded-xl px-4 py-2 backdrop-blur-md opacity-0">
								<div className={`text-2xl font-bold ${benefit.iconColor === 'teal' ? 'text-teal-400' : 'text-blue-400'}`}>
									{benefit.stat}
								</div>
								<div className="text-xs text-slate-400 whitespace-nowrap">
									{benefit.statLabel}
								</div>
							</div>

							<div className="flex justify-center mb-6">
								<div className={`p-4 rounded-2xl ${benefit.gradient} backdrop-blur-sm border ${benefit.borderColor} group-hover:scale-110 transition-transform duration-300`}>
									{benefit.icon}
								</div>
							</div>

							<h3 className="text-xl font-bold mb-4 text-white leading-tight">
								{benefit.title}
							</h3>
							<p className="text-slate-300 text-sm leading-relaxed">
								{benefit.desc}
							</p>

							<div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none`}></div>
						</div>
					))}
				</div>

				<div className="mt-16 text-center">
					<p className="text-slate-400 text-lg">
						Ești gata să transformi aceste beneficii în realitate?
						<span className="text-teal-400 font-semibold ml-2">Hai să discutăm!</span>
					</p>
				</div>
			</div>
		</section>
	);
};

export default Benefits;