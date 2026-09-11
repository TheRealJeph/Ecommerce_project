import { useCart } from '../context/CartContext';

function CartPage() {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="pt-20 min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4 border-b pb-4">
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">Price: ${item.price}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => updateCartItemQuantity(item.id, Math.max(0, item.quantity - 1))}
                >
                  -
                </button>

                <span className="text-lg font-bold">{item.quantity}</span>

                <button
                  type="button"
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>

                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6 flex justify-end items-center">
            <h2 className="text-xl font-bold">Total:</h2>
            <p className="text-xl font-bold ml-2">${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;