// ProfitCalculator.js
import React, { useState } from 'react';
import './ProfitCalculator.css'; // Импортируем стили

const ProfitCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(0); // Закупочная цена
  const [salePrice, setSalePrice] = useState(0); // Сумма продажи
  const [tax, setTax] = useState(15); // Налог с прибыли (по умолчанию 15%)
  const [includeVAT, setIncludeVAT] = useState(false); // Включен ли НДС в закупочную цену
  const [netProfit, setNetProfit] = useState(null); // Чистая прибыль
  const [priceForProfitPercent, setPriceForProfitPercent] = useState(null); // Цена для заданного процента прибыли
  const [profitPercentage, setProfitPercentage] = useState(7); // Процент чистой прибыли
  const [steps, setSteps] = useState(''); // Формулы и шаги
  const [error, setError] = useState('');

  const calculateProfit = () => {
    // Устанавливаем НДС (20%)
    const vatRate = 0.20;
    const vatAmount = purchasePrice * vatRate; // Рассчитываем НДС

    // Проверяем, что введены правильные значения
    if (isNaN(purchasePrice) || isNaN(salePrice) || purchasePrice <= 0 || salePrice <= 0 || isNaN(profitPercentage) || profitPercentage <= 0) {
      setError('Пожалуйста, введите корректные значения для всех полей.');
      return;
    } else {
      setError('');
    }

    // Если НДС включен, вычитаем его из закупочной цены
    const adjustedPurchasePrice = includeVAT ? purchasePrice / (1 + vatRate) : purchasePrice;

    // Рассчитываем налог с прибыли
    const profitTaxRate = tax / 100;

    // Шаг 1: Рассчитываем чистую прибыль
    const profitBeforeTax = salePrice - adjustedPurchasePrice - vatAmount; // П profit без учета налога
    const netProfitValue = profitBeforeTax * (1 - profitTaxRate); // Чистая прибыль после налога

    setNetProfit(netProfitValue.toFixed(2)); // Округляем до 2 знаков после запятой

    // Шаг 2: Рассчитываем цену продажи для получения заданного процента чистой прибыли
    // Учитываем НДС, если включен
    const priceToEarnProfitPercent = (adjustedPurchasePrice * (1 + vatRate)) / (1 - profitPercentage / 100); // Цена для заданного процента

    setPriceForProfitPercent(priceToEarnProfitPercent.toFixed(2)); // Округляем до 2 знаков

    // Формула для вывода шагов
    const stepByStep = `
      1. Рассчитываем НДС (20% от закупочной цены): ${purchasePrice} * 0.20 = ${vatAmount} ₽.
      2. Если НДС включен, корректируем закупочную цену: ${adjustedPurchasePrice} ₽.
      3. Вычисляем прибыль до налога: ${salePrice} - ${adjustedPurchasePrice} - ${vatAmount} = ${profitBeforeTax} ₽.
      4. Рассчитываем чистую прибыль с учетом налога с прибыли (${tax}%): ${profitBeforeTax} * (1 - ${profitTaxRate}) = ${netProfitValue} ₽.
      5. Для того чтобы получить ${profitPercentage}% чистой прибыли, цена продажи должна быть: ${(adjustedPurchasePrice * (1 + vatRate))} / (1 - ${profitPercentage / 100}) = ${priceToEarnProfitPercent} ₽.
    `;

    setSteps(stepByStep); // Устанавливаем шаги
  };

  return (
    <div className="calculator-container">
      <h2>Калькулятор чистой прибыли</h2>

      <div>
        <label>
          Закупочная цена:
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            placeholder="Введите закупочную цену"
          />
        </label>
      </div>

      <div>
        <label>
          Сумма продажи:
          <input
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            placeholder="Введите сумму продажи"
          />
        </label>
      </div>

      <div>
        <label>
          Налог с прибыли (%):
          <select value={tax} onChange={(e) => setTax(Number(e.target.value))}>
            <option value={15}>15%</option>
            <option value={25}>25%</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Включен ли НДС в закупочную цену (если НДС можно возместить)?
          <input
            type="checkbox"
            checked={includeVAT}
            onChange={() => setIncludeVAT(!includeVAT)}
          />
        </label>
      </div>

      <div>
        <label>
          Процент чистой прибыли:
          <input
            type="number"
            value={profitPercentage}
            onChange={(e) => setProfitPercentage(Number(e.target.value))}
            placeholder="Введите процент чистой прибыли"
          />
        </label>
      </div>

      {error && <div className="error">{error}</div>}

      <div>
        <button onClick={calculateProfit}>Посчитать чистую прибыль</button>
      </div>

      {netProfit !== null && !error && (
        <div className="result">
          <h3>Чистая прибыль: {netProfit} ₽</h3>
        </div>
      )}

      {priceForProfitPercent !== null && !error && (
        <div className="result">
          <h3>Для чистой прибыли {profitPercentage}% необходима цена продажи: {priceForProfitPercent} ₽</h3>
        </div>
      )}

      {/* Формулы и шаги */}
      {steps && (
        <div className="steps">
          <h3>Шаги расчета:</h3>
          <pre>{steps}</pre>
        </div>
      )}
    </div>
  );
};

export default ProfitCalculator;
