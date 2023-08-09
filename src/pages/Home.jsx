import React, { useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { selectFilter, setCategoryId, setCurrentPage, setFilters, searchValue } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import Block from '../components/PizzaBlock/Block';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';

const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isMounted = useRef(false);

	//_________________________________________________________________________________________

	const { items, status } = useSelector(selectPizzaData);
	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

	// const categoryId = useSelector(selectFilter.categoryId);
	// const sort = useSelector(selectFilter.sort.sortProperty);
	// const currentPage = useSelector(selectFilter.currentPage);

	//_________________________________________________________________________________________

	// функции
	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	const getPizzas = async () => {
		// setIsloading(true);

		const order = sort.sortProperty.includes('-') ? 'asr' : 'desc';
		const sortBy = sort.sortProperty.replace('-', '');
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		//запрос данных с бэка
		dispatch(
			fetchPizzas({
				order,
				sortBy,
				category,
				search,
				currentPage,
			})
		);
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
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	// Если был первый рендер, то запрашиваем пиццы
	useEffect(() => {
		getPizzas();
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
			{status === 'error' ? (
				<div>
					<h1>
						УПППССС!!! <span>:(</span>
					</h1>
					<br></br>
					<h1>Что-то пошло не так</h1>
					<br></br>
					<h2>Попробуйте немного позже</h2>
				</div>
			) : (
				<div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
			)}

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
