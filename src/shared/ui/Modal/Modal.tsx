import {ReactNode, useCallback, useEffect} from "react";
import * as cls from './Modal.module.scss';
import clsx from "clsx";
import {Portal} from "src/shared/ui/Portal/Portal";

interface ModalProps {
	children?: ReactNode,
	isOpen?: boolean,
	onClose?: () => void,
	className?: string,
}

export const Modal = (props: ModalProps) => {
	const {children, isOpen = true, onClose, className} = props;

	const onCloseModal = useCallback(() => {
		if(onClose) {
			onClose()
		}
	}, [onClose])

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if(e.key === 'Escape') {
			onCloseModal();
		}
	}, [onCloseModal])

	useEffect(() => {
		if(isOpen) {
			window.addEventListener('keydown', onKeyDown)
		}

		return () => {
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [isOpen, onKeyDown])


	return (
			<Portal>
				<div className={clsx(cls.modal, isOpen && cls.active, className)}>
					<div onClick={onCloseModal} onKeyDown={onCloseModal} className={clsx(cls.shadow)}></div>

					<div className={clsx(cls.content)}>
						{children}
					</div>
				</div>
			</Portal>
	);
};
