import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Block from '../components/PizzaBlock/Block';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
	const [items, setItems] = useState([]);
	const [isloading, setIsloading] = useState(true);
	const [categoryId, setCategoryId] = useState(0);
	const [sortType, setSortType] = useState({ name: 'популярности(убывание)', sortProperty: 'rating' });

	const order = sortType.sortProperty.includes('-') ? 'asr' : 'desc';
	const sortBy = sortType.sortProperty;
	const category = categoryId > 0 ? `category=${categoryId}` : '';

	useEffect(() => {
		setIsloading(true);
		fetch(
			`https://64b69a6fdf0839c97e15d9be.mockapi.io/items?${category}&sortBy=${sortBy.replace('-', '')}&order=${order}`
		)
			.then((res) => res.json())
			.then((arr) => {
				setItems(arr);
				setIsloading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType]);



	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={(index) => setCategoryId(index)} />
				<Sort value={sortType} onChangeSort={(index) => setSortType(index)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isloading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: items.map((obj) => <Block key={obj.id} {...obj} />)}
			</div>
		</div>
	);
};

export default Home;
