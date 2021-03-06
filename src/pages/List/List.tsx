import React, { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsFillLockFill, BsFillUnlockFill } from 'react-icons/bs';
import { IoIosAdd } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import Card from '../Card/Card';
import './List.css';

export interface CardArray {
	id: string;
	title: string;
	isDraggable: boolean;
	editCard: boolean;
}

export interface ColList {
	id: string;
	title: string;
	isAddCard: boolean;
	card?: CardArray[];
	editTitle: boolean;
}

const List: React.FC = () => {
	const [lists, setLists] = useState<ColList[]>([]);
	const [listText, setListText] = useState<string>('');
	const [addFirstList, setAddFirstList] = useState<boolean>(true);

	// add list
	const handleAddFirstList = () => {
		setAddFirstList(false);
	};

	const handleListAdd = () => {
		setLists([
			...lists,
			{
				id: `list-${Date.now()}`,
				title: listText,
				isAddCard: false,
				card: [],
				editTitle: false,
			},
		]);
		setListText('');
	};

	const handleList = () => {
		handleListAdd();
	};

	const handleEnterAddList = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleListAdd();
		}
	};

	// add card
	const handleCreateCard = (id: string) => {
		const newLists = lists.map(list => {
			if (list.id === id) {
				return { ...list, isAddCard: true };
			}
			return list;
		});

		setLists(newLists);
	};

	// drag and drop
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

	// delete card
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

	// delete list
	const handleDeleteList = (listId: string) => {
		const restLists = lists.filter(list => list.id !== listId);
		setLists(restLists);
	};

	// update list
	const handleUpdateTitle = (listId: string) => {
		const editItem = lists.map(list => {
			if (list.id === listId) {
				return { ...list, editTitle: !list.editTitle };
			}
			return list;
		});

		setLists(editItem);
	};

	const handleEditList = (listId: string) => {
		handleUpdateTitle(listId);
	};

	const handleUpdateListValue = (e: string, listId: string) => {
		const editItem = lists.map(list => {
			if (list.id === listId) {
				return { ...list, title: e };
			}
			return list;
		});
		setLists(editItem);
	};

	const handlePressUpdateTitle = (
		e: React.KeyboardEvent<HTMLInputElement>,
		listId: string
	) => {
		if (e.key === 'Enter') {
			handleUpdateTitle(listId);
		}
	};

	// updtae card
	const handleCardUpdate = (cardId: string, listId: string) => {
		let newCard: CardArray[];
		const newList = lists.map(list => {
			if (list.card && list.card?.length > 0 && list.id === listId) {
				newCard = list.card?.map(c => {
					if (c.id === cardId) {
						return { ...c, editCard: !c.editCard };
					}
					return c;
				});
				return { ...list, card: newCard };
			}
			return list;
		});
		setLists(newList);
	};

	const handleEnableEditCard = (cardId: string, listId: string) => {
		handleCardUpdate(cardId, listId);
	};

	const handlePressUpdateCardTitle = (
		e: React.KeyboardEvent<HTMLInputElement>,
		cardId: string,
		listId: string
	) => {
		if (e.key === 'Enter') {
			handleCardUpdate(cardId, listId);
		}
	};

	const handleUpdtaeCardTitle = (e: string, cardId: string, listId: string) => {
		let editCard: CardArray[];
		const newLists = lists.map(list => {
			if (list.card && list.card?.length > 0 && list.id === listId) {
				editCard = list.card?.map(c => {
					if (c.id === cardId) {
						return { ...c, title: e };
					}
					return c;
				});
				return { ...list, card: editCard };
			}
			return list;
		});
		setLists(newLists);
	};

	return (
		<>
			<h2 className='header'>Kanban Board</h2>
			<div className='all-lists'>
				{lists.map(list => (
					<div key={list.id} className='single-list'>
						<div
							className='single-list-column'
							onDragOver={e => dragOver(e)}
							onDrop={e => drop(e, list.id)}
						>
							{list.editTitle ? (
								<div>
									<input
										className='single-list-input'
										type='text'
										value={list.title}
										onChange={e => handleUpdateListValue(e.target.value, list.id)}
										onKeyPress={e => handlePressUpdateTitle(e, list.id)}
									/>
								</div>
							) : (
								<div
									className='list-container'
									onDoubleClick={() => handleEditList(list.id)}
								>
									<h5 className='col-name'>{list.title}</h5>
									<div>
										<MdDelete
											className='delete-list'
											onClick={() => handleDeleteList(list.id)}
										/>
										{/* <AiOutlineEdit onClick={() => handleEditList(list.id)} /> */}
									</div>
								</div>
							)}

							{list.card?.map(c => (
								<div>
									{c.editCard ? (
										<div>
											<input
												className='single-list-input'
												type='text'
												value={c.title}
												onChange={e => handleUpdtaeCardTitle(e.target.value, c.id, list.id)}
												onKeyPress={e => handlePressUpdateCardTitle(e, c.id, list.id)}
											/>
										</div>
									) : (
										<div
											onDragStart={e => dragStart(e, c)}
											draggable={c.isDraggable}
											onDragEnd={e => drag(e, c, list.id)}
											key={c.id}
											className='single-card-item'
											onDoubleClick={() => handleEnableEditCard(c.id, list.id)}
										>
											<p>{c.title}</p>
											<div className='card-icons'>
												{!c.isDraggable ? (
													<BsFillLockFill onClick={() => handleDraggable(c.id, list.id)} />
												) : (
													<BsFillUnlockFill onClick={() => handleDraggable(c.id, list.id)} />
												)}
												<MdDelete onClick={() => handleDeleteCard(c.id, list.id)} />
												<AiOutlineEdit
													onClick={() => handleEnableEditCard(c.id, list.id)}
												/>
											</div>
										</div>
									)}
								</div>
							))}
							{!list.isAddCard ? (
								<div>
									<button
										type='button'
										className='add-list add-card'
										onClick={() => handleCreateCard(list.id)}
									>
										{/* <IoIosAdd /> */}
										Add Card
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
						Add list
					</button>
				) : (
					<div>
						<div className='single-list'>
							<input
								className='single-list-input'
								placeholder='Enter List Title'
								type='text'
								value={listText}
								onChange={e => setListText(e.target.value)}
								onKeyPress={e => handleEnterAddList(e)}
							/>
							<div>
								<button className='add-button' type='button' onClick={handleList}>
									Add List
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default List;
