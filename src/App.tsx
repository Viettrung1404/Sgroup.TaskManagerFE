import { Button } from './components/ui/button.js'
import LoginPage from './modules/login/LoginPage.js'

function App() {
  return (
    <>
      <LoginPage />
      <div className='p-10'>
        <h4>Câu hỏi: Tại sao phải dùng key khi sử dụng list rendering</h4>
        <p>- Nhận diện phần tử: React dùng key để phân biệt các phần tử trong danh sách</p>
        <p>- Tối ưu hiệu suất: Giúp React xác định phần tử nào thay đổi, thêm hoặc xóa</p>
        <p>- Tối ưu hiệu năng: Tránh tạo lại DOM elements không cần thiết</p>
        <p>- Bảo toàn state: Giữ nguyên state của component khi vị trí thay đổi</p>
        <p>- Tránh bug render: Đảm bảo đúng phần tử được cập nhật</p>
      </div>
    </>
  )
}

export default App
