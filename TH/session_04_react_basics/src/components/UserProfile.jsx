const UserProfile = () => {
  return (
    <div className="h-full">
        <h1 className="text-center text-2xl">Hồ sơ cá nhân</h1>
        <img src="../assets/avatar.png" alt="Ảnh đại diện" className="h-10 w-10"/>
        <table>
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Email</th>
            </tr>
          </thead>
           <tbody>
            <tr>
              <td>Công Xuân Duy</td>
              <td>congxuanduy@email.com</td>
            </tr>
           </tbody>
        </table>
    </div>
  )
}

export default UserProfile