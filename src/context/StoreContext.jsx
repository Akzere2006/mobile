import { createContext, useContext, useEffect, useMemo, useState } from 'react'
const StoreContext = createContext(null)
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } }
export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => read('volt-cart', []))
  const [favorites, setFavorites] = useState(() => read('volt-favorites', []))
  useEffect(() => localStorage.setItem('volt-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('volt-favorites', JSON.stringify(favorites)), [favorites])
  const addToCart = (id, quantity=1) => setCart(old => { const found=old.find(x=>x.id===id); return found ? old.map(x=>x.id===id?{...x,quantity:x.quantity+quantity}:x) : [...old,{id,quantity}] })
  const setQuantity = (id, quantity) => setCart(old => quantity < 1 ? old.filter(x=>x.id!==id) : old.map(x=>x.id===id?{...x,quantity}:x))
  const removeFromCart = id => setCart(old=>old.filter(x=>x.id!==id))
  const toggleFavorite = id => setFavorites(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id])
  const value = useMemo(()=>({cart,favorites,addToCart,setQuantity,removeFromCart,toggleFavorite,clearCart:()=>setCart([]),cartCount:cart.reduce((n,x)=>n+x.quantity,0)}),[cart,favorites])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
export const useStore = () => useContext(StoreContext)