// src/pages/Dashboard/Dashboard.tsx
import { useLocation } from "wouter";
import authService from "../../services/authService";

const Dashboard = () => {
  const [, setLocation] = useLocation();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    setLocation('/signin');
  };

  if (!user) {
    setLocation('/signin');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.firstName}!
              </h2>
              <p className="text-gray-600 mt-1">Great to see you again</p>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="text-lg font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email Address</p>
                <p className="text-lg font-semibold text-gray-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Status</p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mt-1">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">View Analytics</h3>
            <p className="text-sm text-gray-600">Check your account analytics and insights</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-3">⚙️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Settings</h3>
            <p className="text-sm text-gray-600">Manage your account preferences</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="font-semibold text-gray-900 mb-2">Resources</h3>
            <p className="text-sm text-gray-600">Explore helpful guides and documentation</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;