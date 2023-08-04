import React, { useState, useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import Block from '../components/PizzaBlock/Block';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';

const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const { categoryId, sort, currentPage } = useSelector((state) => state.filterSlice);

	// const categoryId = useSelector((state) => state.filterSlice.categoryId);
	// const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);
	// const currentPage = useSelector((state) => state.filterSlice.currentPage);

	const { searchValue } = useContext(SearchContext);
	const [items, setItems] = useState([]);
	const [isloading, setIsloading] = useState(true);
	// const [currentPage, setCurrentPage] = useState(1);

	// функции
	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	const fetchPizzas = () => {
		setIsloading(true);

		const order = sort.sortProperty.includes('-') ? 'asr' : 'desc';
		const sortBy = sort.sortProperty.replace('-', '');
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
	};

	// Если был первый рендер, то проверяем URL параметры и сохраняем их в Redux
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
			dispatch(
				setFilters({
					...params,
					sort,
				})
			);
			isSearch.current = true;
		}
	}, []);

	// Если изменили параметры и был первый рендер, то будет вот эта проверка
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});

			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage]);

	// Если был первый рендер, то запрашиваем пиццы
	useEffect(() => {
		window.scrollTo(0, 0);

		if (!isSearch.current) {
			fetchPizzas();
		}

		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

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
