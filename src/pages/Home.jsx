import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Block from '../components/PizzaBlock/Block';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';

const Home = () => {
	const dispatch = useDispatch();
	// const { categoryId, sortType, currentPage } = useSelector((state) => state.filterSlice);

	const categoryId = useSelector((state) => state.filterSlice.categoryId);
	const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);
	const currentPage = useSelector((state) => state.filterSlice.currentPage);

	const { searchValue } = useContext(SearchContext);
	const [items, setItems] = useState([]);
	const [isloading, setIsloading] = useState(true);
	// const [currentPage, setCurrentPage] = useState(1);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	useEffect(() => {
		setIsloading(true);

		const order = sortType.includes('-') ? 'asr' : 'desc';
		const sortBy = sortType.replace('-', '');
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		axios
			.get(
				`https://64b69a6fdf0839c97e15d9be.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
			)
			.then((res) => {
				setItems(res.data);
				setIsloading(false);
			});

		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue, currentPage]);

	const pizzas = items.map((obj) => <Block key={obj.id} {...obj} />);
	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isloading ? skeletons : pizzas}</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
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
