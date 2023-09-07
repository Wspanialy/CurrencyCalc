
const ExchangeForm = () => {
  return (
    <form className="">
      <label for="currencyAmount">How much money would you like to check?</label>
      <input type="number" name="currencyAmount" required></input>
      <label for="currency">In which currency is your money now?</label>
      <select>
        <option value="test">Test</option>
        <option value="test">Test2</option> 
        <option value="test">Test3</option> 
      </select>
      <label for="currencyChecking">To which currency would you like to check?</label>
      <select name="currencyChecking">
        <option value="test">Test</option>
        <option value="test">Test2</option> 
        <option value="test">Test3</option> 
      </select>
      <input type="button" value="Check!" onClick=""/>
    </form>

  
  )
}

export default ExchangeForm