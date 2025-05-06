import { useState, type ChangeEvent, type FormEvent } from 'react';
import Error from './Error.tsx';

function App() {
	const [type, setType] = useState('buy');
	const [limitPrice, setLimitPrice] = useState('');
	const [volume, setVolume] = useState('');
	const [limitPriceError, setLimitPriceError] = useState(false);
	const [volumeError, setVolumeError] = useState(false);

	const marketPrice = 56389045;
	const formIsValid = limitPrice.trim() !== '' &&
											volume.trim() !== '' &&
											!limitPriceError &&
											!volumeError;

	const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
		setType(event.target.value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const tradeType = type === 'buy' ? 'kjøp' : 'salg';

		if (confirm(`Er du sikker på at du vil plassere en limit-ordre for ${tradeType}?`)) {
			// Proceed with placing limit order
		}
	};

	const formatPrice = (price: number) => {
		return (price / 100).toLocaleString('no-NO', {
			style: 'currency',
			currency: 'NOK',
			currencyDisplay: 'code'
		});
	}

	const validateLimitPrice = () => {
		const normalizedLimitPrice = limitPrice.replace(',', '.');
		const isInvalid = Number.isNaN(Number(normalizedLimitPrice));

		setLimitPriceError(isInvalid);
	};

	const validateVolume = () => {
		const normalizedVolume = volume.replace(',', '.');
		const isInvalid = Number.isNaN(Number(normalizedVolume));

		setVolumeError(isInvalid);
	};

	const calculateTotal = () => {
		if (!limitPrice || !volume) {
			return '0,00 NOK';
		}

		const normalizedLimitPrice = limitPrice.replace(',', '.');
		const normalizedVolume = volume.replace(',', '.');
		const limitPriceAsNumber = Number(normalizedLimitPrice);
		const volumeAsNumber = Number(normalizedVolume);

		if (Number.isNaN(limitPriceAsNumber) || Number.isNaN(volumeAsNumber)) {
			return '0,00 NOK';
		}

		const total = volumeAsNumber * limitPriceAsNumber;
		const withCurrencyFormatting = total.toLocaleString('nb-NO', {
			style: 'currency',
			currency: 'NOK',
			currencyDisplay: 'code'
		});

		return withCurrencyFormatting;
	}

	return (
		<>
			<div className="min-h-screen bg-gray-100 p-8">
				<div className="max-w-lg mx-auto">
					<h1 className="text-2xl text-center mb-8">Limit-ordre</h1>

					<form
						className="bg-white p-8 rounded-xl shadow-xs"
						onSubmit={handleSubmit}
					>
						<p className="mb-4">Eiendel: BTC/NOK</p>

						<p className='mb-2'>Nåværende markedspris</p>
						<p className="mb-4">{formatPrice(marketPrice)}</p>

						<div className="flex gap-4 mb-4">
							<label className="w-full text-center">
								<input
									className="sr-only"
									type="radio"
									value="buy"
									name="type"
									checked={type === 'buy'}
									onChange={handleTypeChange}
								/>

								<span className={`w-full inline-block py-2 border rounded-xl hover:bg-blue-500 ${type === 'buy' ? 'bg-blue-500 text-white border-blue-500' : 'border-neutral-300 hover:bg-blue-500 hover:text-white hover:border-blue-500'}`}>
									Kjøp
								</span>
							</label>

							<label className="w-full text-center">
								<input
									className="sr-only"
									type="radio"
									value="sell"
									name="type"
									checked={type === 'sell'}
									onChange={handleTypeChange}
								/>

									<span className={`w-full inline-block py-2 border rounded-xl hover:bg-blue-500 ${type === 'sell' ? 'bg-blue-500 text-white border-blue-500' : 'border-neutral-300 hover:bg-blue-500 hover:text-white hover:border-blue-500'}`}>
									Salg
								</span>
							</label>
						</div>

						<label className="block mb-4">
							<span className="block mb-2">Limit-pris</span>

							<input
								className="w-full border border-neutral-300 px-4 py-2 rounded-xl mb-1"
								type="text"
								value={limitPrice}
								onChange={event => setLimitPrice(event.target.value)}
								onBlur={validateLimitPrice}
							/>

							{limitPriceError && <Error description="Limit-prisen kan kun bestå av tall." />}

							<span className="text-sm">I norske kroner (NOK).</span>
						</label>

						<label className="block mb-4">
							<span className="block mb-2">Volum</span>

							<input
								className="w-full border border-neutral-300 px-4 py-2 rounded-xl mb-1"
								type="text"
								value={volume}
								onChange={event => setVolume(event.target.value)}
								onBlur={validateVolume}
							/>

							{volumeError && <Error description="Volumet kan kun bestå av tall." />}

							<span className="text-sm">I Bitcoin (BTC).</span>
						</label>

						<p className="mb-8 flex justify-between bg-blue-50 px-6 py-4 rounded-xl">
							<span>Total sum:</span>
							<span>{calculateTotal()}</span>
						</p>

						<button
							className={`w-full bg-blue-500 text-white py-2 rounded-xl ${!formIsValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
							type="submit"
							disabled={!formIsValid}
						>
								Plasser ordre
						</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default App;
