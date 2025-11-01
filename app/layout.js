import '../styles/globals.css';
import 'swiper/css';
import 'aos/dist/aos.css';

export const metadata = {
  title: "MiDay",
  description: "Ứng dụng đếm ngày yêu và lưu trữ kỷ niệm đáng nhớ của bạn",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
