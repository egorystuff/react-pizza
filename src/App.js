import React from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import Pizzas from './assets/pizzas.json';

import './scss/app.scss';

console.log(Pizzas);

function App() {
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<div className="content__top">
						<Categories />
						<Sort />
					</div>
					<h2 className="content__title">Все пиццы</h2>
					<div className="content__items">
						{Pizzas.map((obj) => (
							<PizzaBlock {...obj} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

{
	/* <PizzaBlock title="Мексиканская" price={500} />
<PizzaBlock title="Чизбургер" price={350} /> */
}
