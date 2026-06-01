import ProductCard from "./components/ProductCard";
import UserCard from "./components/UserCard";
import PriceTag from "./components/PriceTag";

function App() {
    const products = [
        { id: 1, name: "iPhone 15", price: "25.000.000", image: "https://via.placeholder.com/200" },
        { id: 2, name: "Samsung S24", price: "22.000.000", image: "https://via.placeholder.com/200" },
        { id: 3, name: "Xiaomi 14", price: "15.000.000", image: "https://via.placeholder.com/200" }
    ];

    return (
      <>
        <div>
            <h1 style={{ textAlign: "center" }}>Cửa hàng điện thoại</h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {products.map(product => (
                    <ProductCard 
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />
                ))}
            </div>
        </div>
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>Thử thách 3.3: Thực hành Props 🎁</h1>
            
            <hr />
            <h2>1. Thẻ Người Dùng (UserCard)</h2>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {/* HIỂN THỊ 3 USERCARD VỚI DỮ LIỆU KHÁC NHAU */}
                
                {/* Card 1 */}
                <UserCard 
                    name="Nguyễn Văn A" 
                    email="vana@gmail.com" 
                    avatar="https://i.pravatar.cc/150?img=11" 
                />
                
                {/* Card 2 */}
                <UserCard 
                    name="Trần Thị B" 
                    email="thib@gmail.com" 
                    avatar="https://i.pravatar.cc/150?img=5" 
                />
                
                {/* Card 3 */}
                <UserCard 
                    name="Lê Hoàng C" 
                    email="hoangc@gmail.com" 
                    avatar="https://i.pravatar.cc/150?img=8" 
                />
            </div>

            <hr />
            <h2>2. Thẻ Giá Tiền (PriceTag)</h2>
            <div style={{ display: "flex", gap: "20px" }}>
                <PriceTag originalPrice={500000} salePrice={350000} />
                <PriceTag originalPrice={1200000} salePrice={990000} />
            </div>
        </div>
      </>  
    );
}

export default App;