import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Heart, ShoppingBag, Menu, X, UserRound } from 'lucide-react'
import { storeConfig } from '../config/store.config'
import { useStore } from '../context/StoreContext'
export default function Header() {
  const [query,setQuery]=useState(''), [open,setOpen]=useState(false)
  const {cartCount,favorites}=useStore(), navigate=useNavigate()
  const search = e => { e.preventDefault(); navigate(`/catalog?q=${encodeURIComponent(query)}`); setOpen(false) }
  return <><div className="announcement">{storeConfig.announcement}</div><header className="header"><div className="container header-main">
    <button className="icon-button mobile-menu" aria-label="Открыть меню" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    <Link to="/" className="logo" aria-label="На главную">{storeConfig.logo}<span>.</span></Link>
    <form className="search" onSubmit={search}><Search size={18}/><input aria-label="Поиск товаров" placeholder="Найти товар или бренд" value={query} onChange={e=>setQuery(e.target.value)}/><button type="submit">Найти</button></form>
    <nav className="header-actions"><Link to="/favorites" className="action-link"><span className="action-icon"><Heart/>{favorites.length>0&&<i>{favorites.length}</i>}</span><span>Избранное</span></Link><Link to="/cart" className="action-link"><span className="action-icon"><ShoppingBag/>{cartCount>0&&<i>{cartCount}</i>}</span><span>Корзина</span></Link></nav>
  </div><div className={`nav-wrap ${open?'nav-open':''}`}><nav className="container category-nav"><NavLink to="/catalog">Весь каталог</NavLink>{storeConfig.categories.map(c=><NavLink key={c.id} to={`/catalog?category=${c.id}`}>{c.label}</NavLink>)}<NavLink to="/about">О магазине</NavLink></nav></div></header>{open&&<button className="mobile-overlay" aria-label="Закрыть меню" onClick={()=>setOpen(false)}/>}</>
}