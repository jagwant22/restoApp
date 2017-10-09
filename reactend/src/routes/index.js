import React from 'react';
import { BrowserRouter , Route } from 'react-router-dom';
import IndexHome from '../Components/Home/IndexHome';
import DashHome from '../Components/DashBoard/DashHome';


export default () => (
		<BrowserRouter>
			<switch>
				<Route path='/' exact component={IndexHome} />
				<Route path='/main/dashboard' exact component={DashHome} />

				
			</switch>

		</BrowserRouter>
	);