import React, { useState } from 'react';
import './ProfitCalculator.css';

const ProfitCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(0); // Закупочная цена с НДС
  const [salePrice, setSalePrice] = useState(0); // Сумма продажи
  const [tax, setTax] = useState(15); // Налог с прибыли (по умолчанию 15%)
  const [includeVAT, setIncludeVAT] = useState(true); // Включен ли НДС в закупочную цену
  const [netProfit, setNetProfit] = useState(null); // Чистая прибыль
  const [priceForProfitPercent, setPriceForProfitPercent] = useState(null); // Цена для заданного процента прибыли
  const [profitPercentage, setProfitPercentage] = useState(10); // Процент чистой прибыли (по умолчанию 10%)
  const [profitPercentOfSale, setProfitPercentOfSale] = useState(null); // Процент чистой прибыли от продажи
  const [steps, setSteps] = useState(''); // Формулы и шаги
  const [error, setError] = useState(''); // Ошибки ввода

  const calculateProfit = () => {
    const vatRate = 0.20; // НДС 20%

    // Проверяем, что введены правильные значения
    if (isNaN(purchasePrice) || isNaN(salePrice) || purchasePrice <= 0 || salePrice <= 0 || isNaN(profitPercentage) || profitPercentage <= 0) {
      setError('Пожалуйста, введите корректные значения для всех полей.');
      return;
    } else {
      setError('');
    }

    // Если НДС включен, вычитаем его из закупочной цены для расчетов
    const purchasePriceWithoutVAT = purchasePrice / (1 + vatRate);

    // Рассчитываем валовую прибыль (цена продажи без НДС минус закупочная цена без НДС)
    const grossProfit = salePrice / (1 + vatRate) - purchasePriceWithoutVAT;

    // Рассчитываем налог с прибыли
    const profitTaxRate = tax / 100;
    const netProfitValue = grossProfit * (1 - profitTaxRate); // Чистая прибыль после налога

    setNetProfit(netProfitValue.toFixed(2)); // Округляем до 2 знаков после запятой

    // Рассчитываем цену продажи для заданного процента чистой прибыли
    const priceForProfit = purchasePriceWithoutVAT / (1 - profitPercentage / 100); // Цена для заданного процента чистой прибыли

    // Учитываем НДС при расчете цены продажи
    const salePriceForProfit = priceForProfit * (1 + vatRate);

    setPriceForProfitPercent(salePriceForProfit.toFixed(2)); // Округляем до 2 знаков

    // Рассчитываем процент чистой прибыли относительно суммы продажи
    const profitPercentFromSale = (netProfitValue / salePrice) * 100;
    setProfitPercentOfSale(profitPercentFromSale.toFixed(2)); // Округляем до 2 знаков

    // Формула для вывода шагов
    const stepByStep = `
      1. Рассчитываем цену закупки без НДС: ${purchasePrice} / (1 + 0.20) = ${purchasePriceWithoutVAT.toFixed(2)} ₽.
      2. Рассчитываем валовую прибыль: ${salePrice} / (1 + 0.20) - ${purchasePriceWithoutVAT.toFixed(2)} = ${grossProfit.toFixed(2)} ₽.
      3. Рассчитываем чистую прибыль с учетом налога с прибыли (${tax}%): ${grossProfit.toFixed(2)} * (1 - ${profitTaxRate}) = ${netProfitValue} ₽.
      4. Для того чтобы получить ${profitPercentage}% чистой прибыли, цена продажи должна быть: ${priceForProfit.toFixed(2)} / (1 - ${profitPercentage / 100}) = ${salePriceForProfit.toFixed(2)} ₽.
    `;

    setSteps(stepByStep); // Устанавливаем шаги
  };

  return (
    <div className="calculator-container">
      <h2>Калькулятор чистой прибыли</h2>

      <div>
        <label>
          Закупочная цена с НДС (цена с НДС от поставщика):
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            placeholder="Введите закупочную цену с НДС"
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
            <option value={15}>15% (БОЁК)</option>
            <option value={25}>25% (СО)</option>
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
            min="1"
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

      {profitPercentOfSale !== null && !error && (
        <div className="result">
          <h3>Процент чистой прибыли относительно суммы продажи: {profitPercentOfSale}%</h3>
        </div>
      )}

      {/* Формулы и шаги */}
      {steps && (
        <div className="steps">
          <h3>Шаги расчета:</h3>
          <pre>{steps}</pre>
        </div>
      )}

      <div className="info">
        <p><strong>Важно:</strong> НДС при продаже составляет 20%, а закупочная цена указана с учетом НДС, который можно возместить.</p>
      </div>
    </div>
  );
};

export default ProfitCalculator;
