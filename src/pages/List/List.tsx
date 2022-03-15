import React, { useState } from 'react';
import { BsFillLockFill, BsFillUnlockFill } from 'react-icons/bs';
import { IoIosAdd } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import Card from '../Card/Card';
import './List.css';

export interface CardArray {
	id: string;
	title: string;
	isDraggable: boolean;
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

	const dragStart = (e: React.DragEvent<HTMLDivElement>, card: CardArray) => {
		e.dataTransfer.setData('card', JSON.stringify(card));
	};

	const drag = (
		e: React.DragEvent<HTMLDivElement>,
		card: CardArray,
		listId: string
	) => {
		let newCardList: CardArray[];
		let addCard: ColList;
		const deleteCard = lists.map(l => {
			if (l.card) {
				if (l.id === listId) {
					newCardList = l.card?.filter(c => c.id !== card.id);
					addCard = {
						...l,
						card: newCardList,
					};
					return addCard;
				}
				addCard = l;
			}
			return addCard;
		});
		setLists(deleteCard);
	};

	const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const drop = (e: React.DragEvent<HTMLDivElement>, listId: string) => {
		const card = e.dataTransfer.getData('card');
		let addCard: ColList;
		const newList = lists.map(l => {
			if (l?.card) {
				if (l.id === listId) {
					addCard = {
						...l,
						card: [...l.card, JSON.parse(card)],
					};
					return addCard;
				}
				addCard = l;
				return addCard;
			}
			return addCard;
		});
		setLists(newList);
	};

	const handleDraggable = (cardId: string, listId: string) => {
		let newCard: CardArray[];
		const newLists = lists.map(list => {
			if (list.card && list.card?.length > 0 && list.id === listId) {
				newCard = list.card?.map(l => {
					if (l.id === cardId) {
						return { ...l, isDraggable: !l.isDraggable };
					}
					return l;
				});
				return { ...list, card: newCard };
			}
			return list;
		});
		setLists(newLists);
	};

	const handleDeleteCard = (cardId: string, listId: string) => {
		let restCard: CardArray[];
		const newLists = lists.map(list => {
			if (list.card && list.card?.length > 0 && list.id === listId) {
				restCard = list.card?.filter(l => l.id !== cardId);
				return { ...list, card: restCard };
			}
			return list;
		});
		setLists(newLists);
	};

	const handleDeleteList = (listId: string) => {
		const restLists = lists.filter(list => list.id !== listId);
		setLists(restLists);
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
						<div className='list-container'>
							<h5 className='col-name'>{list.title}</h5>
							<MdDelete onClick={() => handleDeleteList(list.id)} />
						</div>
						{list.card?.map(c => (
							<div
								onDragStart={e => dragStart(e, c)}
								draggable={c.isDraggable}
								onDragEnd={e => drag(e, c, list.id)}
								key={c.id}
								className='single-card-item'
							>
								<p>{c.title}</p>
								<div>
									{!c.isDraggable ? (
										<BsFillLockFill onClick={() => handleDraggable(c.id, list.id)} />
									) : (
										<BsFillUnlockFill onClick={() => handleDraggable(c.id, list.id)} />
									)}
									<MdDelete onClick={() => handleDeleteCard(c.id, list.id)} />
								</div>
							</div>
						))}
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
