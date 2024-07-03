import {Modal} from "src/shared/ui/Modal/Modal";
import {LoginForm} from "./LoginForm";

interface LoginModalProps {
	onClose: () => void,
	isOpen: boolean
}

export const LoginModal = (props: LoginModalProps) => {
	const {onClose, isOpen} = props;

	return (
			<Modal onClose={onClose} isOpen={isOpen}>
				<LoginForm onSuccess={onClose} />
			</Modal>
	);
};
