const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Example cards */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-medium">Total Users</h2>
          <p className="text-2xl font-bold mt-2">--</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-medium">New Candidates</h2>
          <p className="text-2xl font-bold mt-2">--</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-medium">Interviews Scheduled</h2>
          <p className="text-2xl font-bold mt-2">--</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
