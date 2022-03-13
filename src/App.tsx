import React from 'react';
import './App.css';
import List from './pages/List/List';

const App: React.FC = () => (
	<div className='app-container'>
		<div className='background' />
		<List />
	</div>
);

export default App;
