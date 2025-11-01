import '../styles/globals.css';
export const metadata = {
  title: "MiDay",
  description: "Ứng dụng đếm ngày yêu và kỷ niệm đáng nhớ của bạn",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
