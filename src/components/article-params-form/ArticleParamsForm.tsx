import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import React, { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Text } from '../text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { RadioGroup } from 'components/radio-group';

type ArticleStateProps = {
	articleState: ArticleStateType;
	setArticleState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleStateProps) => {
	const { setArticleState } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const rootRef = useRef(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	const changeFormState = (name: string) => {
		return (value: OptionType) => {
			setFormState((currentState) => ({
				...currentState,
				[name]: value,
			}));
		};
	};

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		setArticleState(formState);
	};

	const handleFormReset = (e: FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				onClick={() => setIsOpen((current) => !current)}
				isOpen={isOpen}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={changeFormState('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						name='fontSize'
						onChange={changeFormState('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={changeFormState('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={changeFormState('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={changeFormState('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
