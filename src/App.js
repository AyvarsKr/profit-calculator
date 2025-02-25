// App.js
import React from 'react';
import ProfitCalculator from './ProfitCalculator'; // Убедитесь, что путь правильный

function App() {
  return (
    <div className="App">
      <h1>Добро пожаловать в Калькулятор Прибыли от БОЁК ПРО!</h1>
      <h1>ПОМНИ! БОЁК - ЭТО УДАР ПО ЦЕНАМ.</h1>
      <ProfitCalculator /> {/* Использование компонента */}
    </div>
  );
}

export default App;
