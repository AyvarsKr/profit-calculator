// App.js
import React from 'react';
import ProfitCalculator from './ProfitCalculator'; // Убедитесь, что путь правильный

function App() {
  return (
    <div className="App">
      <h1>Добро пожаловать в Калькулятор Прибыли!</h1>
      <ProfitCalculator /> {/* Использование компонента */}
    </div>
  );
}

export default App;
