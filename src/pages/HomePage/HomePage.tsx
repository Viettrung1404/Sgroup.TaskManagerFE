export const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Trả lời câu hỏi
      </h1>
      
      <div className="space-y-6">
        {/* Câu 1 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            Câu 1: StrictMode là gì và tại sao dùng?
          </h2>
          <p className="text-gray-700 mb-3">
            StrictMode là một công cụ để làm nổi bật các vấn đề tiềm ẩn trong một ứng dụng. 
            Giống như Fragment, StrictMode không render bất kỳ giao diện nào. 
            Nó kích hoạt các kiểm tra mở rộng và cảnh báo bổ sung cho các component con.
          </p>
          <p className="text-gray-600 font-medium mb-2">StrictMode hiện tại hỗ trợ:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Xác định các thành phần có lifecycle không an toàn</li>
            <li>Cảnh báo về việc sử dụng API tham chiếu chuỗi kiểu cũ</li>
            <li>Cảnh báo về việc sử dụng findDOMNode không còn dùng nữa</li>
            <li>Phát hiện các side-effects không mong muốn</li>
            <li>Phát hiện Context API cũ</li>
            <li>Đảm bảo trạng thái có thể tái sử dụng</li>
          </ul>
        </div>

        {/* Câu 2 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            Câu 2: Làm sao component cha nhận được data từ component con?
          </h2>
          <p className="text-gray-700 mb-2">Để component cha nhận dữ liệu từ component con:</p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-700">
            <li>Cha tạo hàm callback để nhận dữ liệu</li>
            <li>Truyền callback đó xuống con qua props</li>
            <li>Con gọi callback và gửi dữ liệu lên</li>
          </ol>
        </div>

        {/* Câu 3 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            Câu 3: 7 layers trong feature-sliced design
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700 mb-3">
            <li><span className="font-medium">App:</span> Khởi tạo ứng dụng, providers</li>
            <li><span className="font-medium">Pages:</span> Các trang, entry points</li>
            <li><span className="font-medium">Widgets:</span> Khối UI phức tạp, có thể tái sử dụng</li>
            <li><span className="font-medium">Features:</span> Chức năng nghiệp vụ, logic cụ thể</li>
            <li><span className="font-medium">Entities:</span> Thực thể nghiệp vụ, mô hình dữ liệu</li>
            <li><span className="font-medium">Shared:</span> Mã dùng chung, tiện ích, cấu hình</li>
            <li><span className="font-medium">Processes:</span> Quy trình nghiệp vụ, luồng công việc</li>
          </ol>
          <p className="text-gray-700">
            <span className="font-medium">Áp dụng:</span> Phân chia mã nguồn theo các layer trên, 
            giữ cho mã nguồn có tổ chức, dễ bảo trì và mở rộng.
          </p>
        </div>

        {/* Câu 4 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            Câu 4: Axios vs Fetch
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Axios:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                <li>Hỗ trợ trình duyệt và Node.js</li>
                <li>Tự động chuyển đổi JSON</li>
                <li>Hỗ trợ hủy yêu cầu</li>
                <li>Hỗ trợ interceptors</li>
                <li>Cấu hình mặc định dễ dàng</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Fetch API:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                <li>API gốc, không cần thư viện</li>
                <li>Dựa trên Promise</li>
                <li>Cần chuyển đổi thủ công sang JSON</li>
                <li>Không có interceptors tích hợp</li>
                <li>Cần nhiều code hơn cho cases phức tạp</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Câu 5 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            Câu 5: Các loại storage trong trình duyệt
          </h2>
          <div className="space-y-2 text-gray-700">
            <div><span className="font-medium">Local Storage:</span> Lưu trữ không có ngày hết hạn, persistent</div>
            <div><span className="font-medium">Session Storage:</span> Lưu trữ cho phiên hiện tại, xóa khi đóng tab</div>
            <div><span className="font-medium">Cookies:</span> Dữ liệu nhỏ, có thể có expiry, gửi đến server</div>
            <div><span className="font-medium">IndexedDB:</span> NoSQL database, lưu trữ lượng lớn dữ liệu</div>
            <div><span className="font-medium">Cache Storage:</span> Cache tài nguyên cho offline và performance</div>
          </div>
        </div>

        {/* Câu 6 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            Câu 6: useEffect và 4 trường hợp
          </h2>
          <p className="text-gray-700 mb-3">
            useEffect là hook cho side effects, thay thế lifecycle methods trong class components.
          </p>
          <div className="space-y-2 text-gray-700">
            <div><span className="font-medium">1. Không có dependency:</span> Chạy sau mỗi render</div>
            <div><span className="font-medium">2. Empty array []:</span> Chỉ chạy 1 lần (componentDidMount)</div>
            <div><span className="font-medium">3. Có dependencies:</span> Chạy khi dependencies thay đổi</div>
            <div><span className="font-medium">4. Cleanup function:</span> Chạy khi unmount hoặc trước effect tiếp theo</div>
          </div>
        </div>

        {/* Câu 7 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            Câu 7: useState
          </h2>
          <p className="text-gray-700 mb-3">
            useState là hook để thêm state vào functional components. 
            Trả về array gồm [giá trị hiện tại, setter function].
          </p>
          <div className="space-y-2 text-gray-700">
            <div><span className="font-medium">Giá trị state:</span> Snapshot tại thời điểm render, persistent giữa renders</div>
            <div><span className="font-medium">Setter function:</span> Trigger re-render, có thể nhận value hoặc callback function</div>
            <div><span className="font-medium">Batching:</span> React gộp nhiều setState calls trong cùng event handler</div>
          </div>
        </div>
      </div>
    </div>
  );
};