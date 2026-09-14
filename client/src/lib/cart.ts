export type CartItem = { title: string; detail: string; price: string; color: string; image?: string; quantity: number };
const key = "paper-trail-cart";

export function readCart(): CartItem[] {
  try { return JSON.parse(localStorage.getItem(key) ?? "[]") as CartItem[]; } catch { return []; }
}
export function writeCart(items: CartItem[]) {
  localStorage.setItem(key, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("paper-trail-cart"));
}
export function addToCart(item: Omit<CartItem, "quantity">) {
  const items = readCart();
  const existing = items.find((entry) => entry.title === item.title);
  if (existing) existing.quantity += 1;
  else items.push({ ...item, quantity: 1 });
  writeCart(items);
}
export function removeFromCart(title: string) { writeCart(readCart().filter((item) => item.title !== title)); }
export function changeQuantity(title: string, delta: number) {
  const items = readCart().map((item) => item.title === title ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item);
  writeCart(items);
}
export function clearCart() { writeCart([]); }
export function cartCount(items = readCart()) { return items.reduce((total, item) => total + item.quantity, 0); }
