import warningIcon from './assets/warning.svg';

type ErrorProps = {
	description: string;
}

function Error({ description }: ErrorProps) {
	return (
		<p className="flex bg-red-100 text-red-700 text-sm px-4 py-2 rounded-xl mb-1">
			<img className="mr-1" src={warningIcon} alt="" />
			{description}
		</p>
	);
}

export default Error;
