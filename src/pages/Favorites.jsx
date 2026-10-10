import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
export default function Favorites(){const {favorites}=useStore(),items=products.filter(p=>favorites.includes(p.id));return <div className="container page-wrap"><div className="breadcrumbs"><Link to="/">Главная</Link><span>/</span>Избранное</div><div className="page-title-row"><div><span className="eyebrow">СОХРАНЁННЫЕ ТОВАРЫ</span><h1>Избранное</h1></div></div>{items.length?<div className="product-grid catalog-grid">{items.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="empty-state"><div className="empty-illustration"><Heart size={32}/></div><h2>Здесь пока ничего нет</h2><p>Нажимайте на сердечко у товаров, чтобы сохранить их.</p><Link className="button button-dark" to="/catalog">Посмотреть каталог</Link></div>}</div>}