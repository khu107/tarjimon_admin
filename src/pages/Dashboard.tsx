function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">대시보드</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">총 사용자</h3>
          <p className="text-3xl font-bold mt-2">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">오늘 방문자</h3>
          <p className="text-3xl font-bold mt-2">567</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">매출</h3>
          <p className="text-3xl font-bold mt-2">₩8,900,000</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
