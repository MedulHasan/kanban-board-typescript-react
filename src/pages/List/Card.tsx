const Card = () => (
	<div>
		<div>
			<input
				placeholder='Enter list title'
				type='text'
				/* value={listText}
				onChange={e => setListText(e.target.value)} */
			/>
			<div>
				<button type='button'>Add Card</button>
			</div>
		</div>
	</div>
);

export default Card;
