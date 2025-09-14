import OrdersList from "./features/orders/OrdersList";
import OrderForm from "./components/OrderForm";

function App() {
  return (
    <div>
      <h1>Orders Dashboard</h1>
      <OrderForm />
      <OrdersList />
    </div>
  );
}

export default App;
