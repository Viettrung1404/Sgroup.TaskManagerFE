import { memo, useMemo, useState } from "react";

// Component con không dùng memo - sẽ re-render mỗi khi parent render
const ChildWithoutMemo = ({ name }: { name: string }) => {
  console.log('ChildWithoutMemo rendered');
    return <div>Hello {name}</div>;
};

  // Component con dùng memo - chỉ re-render khi props thay đổi
const ChildWithMemo = memo(({ name }: { name: string }) => {
  console.log('ChildWithMemo rendered');
  return <div>Hello {name}</div>;
});

export const HomePage = () => {
  const [count, setCount] = useState(0);
  const [name] = useState("Trung");

  // 2 hàm tính tổng từ 1 đến count
  const sum1 = (count: number) => {
    let total = 0;
    for (let i = 1; i <= count; i++) {
      total += i;
    }
    console.log('sum1 calculated');
    return total;
  };

  const sum2 = useMemo(() => {
    let total = 0;
    for (let i = 1; i <= count; i++) {
      total += i;
    }
    console.log('sum2 calculated');
    return total;
  }, [count]);

  return (
    <div>
      <h3>1. Giải thích về memo và useMemo, cho ví dụ</h3>
      <p>- Memo là một higher order component dùng để ngăn re-render component mà không thiết, component chỉ re-render khi props của nó thay đổi.</p>
      <p>Ví dụ:</p>

      <button onClick={() => setCount(count + 1)}>Increment Count: {count}</button>
      <ChildWithoutMemo name={name} />
      <ChildWithMemo name={name} />

      <p>(Khi click vào button thì ChildWithoutMemo sẽ re-render còn ChildWithMemo thì không do name chưa thay đổi)</p>

      <div className="p-1"></div>

      <p>- useMemo là một hook dùng để ghi nhớ giá trị tính toán, tránh việc tính toán lại không cần thiết khi component re-render.</p>
      <p>Ví dụ:</p>
      <p>Tổng từ 1 đến {count} (tính bằng hàm bình thường): {sum1(count)}</p>
      <p>Tổng từ 1 đến {count} (tính bằng useMemo): {sum2}</p>
      <p>(Khi click vào button thì sum1 sẽ được tính toán lại còn sum2 thì không do đã được ghi nhớ bởi useMemo)</p>

      <div className="p-3"></div>

      <h3>2. Cookie là gì, cách sử dụng cookie, các loại…</h3>
      <p>- Cookie là một đoạn dữ liệu nhỏ được lưu trữ trên trình duyệt của người dùng bởi các trang web. Cookie thường được sử dụng để lưu trữ thông tin phiên làm việc, tùy chọn người dùng, và các dữ liệu khác nhằm cải thiện trải nghiệm người dùng.</p>
      <p>- Cách sử dụng cookie: Cookie có thể được tạo và truy cập thông qua JavaScript trên trình duyệt hoặc thông qua các header HTTP trong các yêu cầu và phản hồi từ máy chủ.</p>
      <p>- Các loại cookie:</p>
      <ul className="list-disc ml-5">
        <li>Cookie phiên (Session Cookies): Được lưu trữ tạm thời và bị xóa khi người dùng đóng trình duyệt.</li>
        <li>Cookie lâu dài (Persistent Cookies): Được lưu trữ trên thiết bị của người dùng trong một khoảng thời gian xác định, ngay cả sau khi đóng trình duyệt.</li>
        <li>Cookie bên thứ ba (Third-Party Cookies): Được tạo bởi các trang web khác với trang web mà người dùng đang truy cập, thường được sử dụng cho quảng cáo và theo dõi.</li>
      </ul>

    </div>
  );
};