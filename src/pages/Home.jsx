import React, { useState, useEffect, useContext } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Block from '../components/PizzaBlock/Block';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';

const Home = () => {
	const { searchValue } = useContext(SearchContext);
	const [items, setItems] = useState([]);
	const [isloading, setIsloading] = useState(true);
	const [categoryId, setCategoryId] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortType, setSortType] = useState({ name: 'популярности(убывание)', sortProperty: 'rating' });

	const order = sortType.sortProperty.includes('-') ? 'asr' : 'desc';
	const sortBy = sortType.sortProperty.replace('-', '');
	const category = categoryId > 0 ? `category=${categoryId}` : '';
	const search = searchValue ? `&search=${searchValue}` : '';

	useEffect(() => {
		setIsloading(true);
		fetch(
			`https://64b69a6fdf0839c97e15d9be.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
			.then((res) => res.json())
			.then((arr) => {
				setItems(arr);
				setIsloading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue, currentPage]);

	const pizzas = items.map((obj) => <Block key={obj.id} {...obj} />);
	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={(index) => setCategoryId(index)} />
				<Sort value={sortType} onChangeSort={(index) => setSortType(index)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isloading ? skeletons : pizzas}</div>
			<Pagination onChangePage={(number) => setCurrentPage(number)} />
		</div>
	);
};

export default Home;

// поиск по статичному массиву методом фильтровки items перед рендером

// .filter((obj) => {
// 	if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
// 		return true;
// 	}
// 	return false;
// })
