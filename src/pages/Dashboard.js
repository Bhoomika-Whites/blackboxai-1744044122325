import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('reports');

  // Sample data - will be replaced with API calls
  const recentReports = [
    { id: 1, date: '2023-11-15', type: 'Blood Test', status: 'Completed', result: 'Normal' },
    { id: 2, date: '2023-11-10', type: 'Biopsy', status: 'Completed', result: 'Abnormal' },
  ];

  const upcomingAppointments = [
    { id: 1, date: '2023-11-20', time: '10:00 AM', doctor: 'Dr. Smith' },
    { id: 2, date: '2023-11-25', time: '2:30 PM', doctor: 'Dr. Johnson' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Dashboard</h1>
      
      <div className="flex mb-6 border-b border-gray-200">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'reports' ? 'text-secondary border-b-2 border-secondary' : 'text-gray-500'}`}
          onClick={() => setActiveTab('reports')}
        >
          My Reports
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'appointments' ? 'text-secondary border-b-2 border-secondary' : 'text-gray-500'}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'consultations' ? 'text-secondary border-b-2 border-secondary' : 'text-gray-500'}`}
          onClick={() => setActiveTab('consultations')}
        >
          Consultations
        </button>
      </div>

      {activeTab === 'reports' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Reports</h2>
            <Link to="/upload" className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-600">
              Upload New Report
            </Link>
          </div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentReports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${report.result === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {report.result}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/report/${report.id}`} className="text-secondary hover:text-blue-600 mr-3">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'appointments' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.doctor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-secondary hover:text-blue-600 mr-3">Reschedule</button>
                      <button className="text-red-600 hover:text-red-800">Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'consultations' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Consultations</h2>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-500">No recent consultations found.</p>
            <Link to="/consult" className="mt-4 inline-block px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-600">
              Schedule New Consultation
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}