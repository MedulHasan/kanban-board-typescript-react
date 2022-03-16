import React, { useState } from 'react';
import { ColList } from '../List/List';

interface Props {
	list: ColList;
	lists: ColList[];
	setLists: React.Dispatch<React.SetStateAction<ColList[]>>;
}

const Card: React.FC<Props> = ({ list, lists, setLists }) => {
	const [cardText, setCardText] = useState('');

	const handleAddCard = () => {
		let addCard: ColList;
		const newLists = lists.map(l => {
			if (l.card) {
				if (l.id === list.id) {
					addCard = {
						...list,
						card: [
							...l.card,
							{
								id: `card-${Date.now()}`,
								title: cardText,
								isDraggable: true,
								editCard: false,
							},
						],
					};
					return addCard;
				}
				addCard = l;
				return addCard;
			}
			return addCard;
		});
		setLists(newLists);
		setCardText('');
	};

	const handleAddCardText = () => {
		handleAddCard();
	};

	const handleEnterAddCard = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleAddCard();
		}
	};

	return (
		<div>
			<div>
				<input
					placeholder='Enter list title'
					type='text'
					value={cardText}
					onChange={e => setCardText(e.target.value)}
					onKeyPress={e => handleEnterAddCard(e)}
				/>
				<div>
					<button type='button' onClick={handleAddCardText}>
						Add Card
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
