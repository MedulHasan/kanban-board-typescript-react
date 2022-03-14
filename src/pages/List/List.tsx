import React, { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import Card from '../Card/Card';
import './List.css';

export interface CardArray {
	id: string;
	title: string;
}

export interface ColList {
	id: string;
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
		setLists([
			...lists,
			{ id: `list-${Date.now()}`, title: listText, isAddCard: false, card: [] },
		]);
		setListText('');
	};

	const handleCreateCard = (id: string) => {
		const newLists = lists.map(list => {
			if (list.id === id) {
				return { ...list, isAddCard: true };
			}
			return list;
		});

		setLists(newLists);
	};

	const dragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
		console.log('id', id);
		e.dataTransfer.setData('id', id);
	};

	const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const drop = (e: React.DragEvent<HTMLDivElement>, listId: string) => {
		const id = e.dataTransfer.getData('id');
		console.log(id, listId);
	};

	return (
		<div className='all-lists'>
			{lists.map(list => (
				<div key={list.id} className='single-list'>
					<div
						className='single-list-column'
						onDragOver={e => dragOver(e)}
						onDrop={e => drop(e, list.id)}
					>
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
							<div>
								{list.card?.map(c => (
									<div
										onDragStart={e => dragStart(e, c.id)}
										draggable
										key={c.id}
										className='single-card-item'
									>
										<p>{c.title}</p>
									</div>
								))}
								<Card list={list} lists={lists} setLists={setLists} />
							</div>
						)}
					</div>
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
