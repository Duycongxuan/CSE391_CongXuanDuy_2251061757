function UserCard({ name, email, avatar }) {
    return (
      <>
        <div style={{ 
            border: "1px solid #ddd", 
            borderRadius: "10px", 
            padding: "15px", 
            textAlign: "center",
            width: "200px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
        }}>
            <img 
                src={avatar} 
                alt={`Avatar của ${name}`} 
                style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }} 
            />
            <h3 style={{ margin: "10px 0 5px 0" }}>{name}</h3>
            <p style={{ color: "gray", margin: 0, fontSize: "14px" }}>{email}</p>
        </div>
      </>  
    );
}

export default UserCard;