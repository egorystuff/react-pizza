import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

const FullPizza = () => {
	const [pizza, setPizza] = useState;
	const { id } = useParams();

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get('https://64b69a6fdf0839c97e15d9be.mockapi.io/items/' + id);
				setPizza(data);
			} catch (error) {
				alert('error');
			}
		}

		fetchPizza();
	}, []);

	return (
		<div className="container">
			<img src=""></img>
			<h2>{id}</h2>
			<p>
				Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing
				layouts and visual mockups.
			</p>
			<h4>250 ₽</h4>
		</div>
	);
};

export default FullPizza;
