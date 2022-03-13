import React, { useState } from 'react';
import { ColList } from '../List/List';

interface Props {
	list: ColList;
	lists: ColList[];
	setLists: React.Dispatch<React.SetStateAction<ColList[]>>;
}

const Card: React.FC<Props> = ({ list, lists, setLists }) => {
	const [cardText, setCardText] = useState('');

	const handleAddCardText = () => {
		let addCard: ColList;
		const newLists = lists.map(l => {
			if (l.card) {
				if (l.id === list.id) {
					addCard = {
						...list,
						card: [...l.card, { id: Date.now(), title: cardText }],
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

	return (
		<div>
			<div>
				<input
					placeholder='Enter list title'
					type='text'
					value={cardText}
					onChange={e => setCardText(e.target.value)}
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
