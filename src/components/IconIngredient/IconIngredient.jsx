import styles from './IconIngredient.module.scss';

const IconIngredient = (props) => {
	return (
		<div className={styles.main} style={props.style}>
			<img className={styles.img} src={props.img} alt='ingredient'/>
			{props.desc && (
				<div className={`${styles.desc} text text_type_main-default`}>
					{props.desc}
				</div>
			)}
		</div>
	);
};
export default IconIngredient;
