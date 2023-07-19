import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import Block from './components/PizzaBlock/Block';
import Skeleton from './components/PizzaBlock/Skeleton';

import './scss/app.scss';

function App() {
	const [items, setItems] = useState([]);
	const [isloading, setIsloading] = useState(true);

	useEffect(() => {
		fetch('https://64b69a6fdf0839c97e15d9be.mockapi.io/items')
			.then((res) => res.json())
			.then((arr) => {
				setItems(arr);
				setIsloading(false);
			});
	}, []);

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
						{isloading
							? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
							: items.map((obj) => <Block key={obj.id} {...obj} />)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
