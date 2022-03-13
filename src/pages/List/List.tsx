import React, { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import Card from './Card';
import './List.css';

interface CardArray {
	id: number;
	title: string;
}

interface ColList {
	id: number;
	title: string;
	isAddCard: boolean;
	card?: CardArray[];
}

const List: React.FC = () => {
	const [addFirstList, setAddFirstList] = useState<boolean>(true);
	const [listText, setListText] = useState<string>('');
	const [lists, setLists] = useState<ColList[]>([]);

	const handleAddFirstList = () => {
		setAddFirstList(false);
	};

	const handleList = () => {
		setLists([...lists, { id: Date.now(), title: listText, isAddCard: false }]);
		setListText('');
	};

	const handleCreateCard = (id: number) => {
		const newLists = lists.map(list => {
			if (list.id === id) {
				return { ...list, isAddCard: true };
			}
			return list;
		});
		setLists(newLists);
	};

	return (
		<div className='all-lists'>
			{lists.map(list => (
				<div key={list.id} className='single-list'>
					<h5 className='col-name'>{list.title}</h5>
					{!list.isAddCard ? (
						<div>
							<button
								type='button'
								className='add-list add-card'
								onClick={() => handleCreateCard(list.id)}
							>
								<IoIosAdd />
								Add a Card
							</button>
						</div>
					) : (
						<Card />
					)}
				</div>
			))}
			{addFirstList ? (
				<button type='button' className='add-list' onClick={handleAddFirstList}>
					<IoIosAdd />
					Add a list
				</button>
			) : (
				<div>
					<div className='single-list'>
						<input
							placeholder='Enter list title'
							type='text'
							value={listText}
							onChange={e => setListText(e.target.value)}
						/>
						<div>
							<button type='button' onClick={handleList}>
								Add List
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default List;
