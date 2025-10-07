import React, { useState, useMemo } from 'react';
import { X, Eye, TrendingUp, Clock, CheckCircle } from 'lucide-react';

// --- Types ---
type TicketStatus = 'Pending' | 'Resolved';

interface Ticket {
  id: string;
  subject: string;
  user: string;
  date: string;
  status: TicketStatus;
  userMessage: string;
  from: string;
}

interface ReplyState {
    subject: string;
    message: string;
}

// --- Mock Data ---
const MOCK_TICKETS: Ticket[] = [
  { id: '001234', subject: 'Order #123456 Issue', user: 'Alex Johnson', date: '15/10/2023', status: 'Pending', userMessage: 'Product received damaged. Can you please help with a refund or replacement?', from: 'John Doe' },
  { id: '001235', subject: 'Login Problem', user: 'Maria Smith', date: '16/10/2023', status: 'Resolved', userMessage: 'I can\'t log into my account, my password reset link is expired.', from: 'Maria Smith' },
  { id: '001236', subject: 'Account Verification', user: 'David Brown', date: '17/10/2023', status: 'Resolved', userMessage: 'Please verify my account so I can access premium features.', from: 'David Brown' },
  { id: '001237', subject: 'Order #123456 Issue', user: 'Emily Davis', date: '18/10/2023', status: 'Pending', userMessage: 'My delivery tracking hasn\'t updated in 3 days. What\'s going on?', from: 'Emily Davis' },
  { id: '001238', subject: 'Account Verification', user: 'Michael Wilson', date: '19/10/2023', status: 'Resolved', userMessage: 'I need to update my billing address for the next cycle.', from: 'Michael Wilson' },
  { id: '001239', subject: 'Login Problem', user: 'Sarah Taylor', date: '20/10/2023', status: 'Pending', userMessage: 'I keep getting a 404 error when I try to reset my password.', from: 'Sarah Taylor' },
];

// --- Utility Components ---

/**
 * Renders a small colored pill for the ticket status.
 */
const StatusTag: React.FC<{ status: TicketStatus }> = ({ status }) => {
  const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-full';
  const colorClasses = status === 'Pending'
    ? 'bg-yellow-100 text-yellow-700'
    : 'bg-green-100 text-green-700';

  return (
    <span className={`${baseClasses} ${colorClasses}`}>
      {status}
    </span>
  );
};

/**
 * Renders a dashboard statistic card.
 */
const StatCard: React.FC<{ title: string, value: number, icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="flex-1 min-w-40 bg-white p-6 rounded-xl shadow-sm transition-shadow duration-300 hover:shadow-lg border border-gray-100">
    <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="text-blue-500">{icon}</div>
    </div>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </div>
);

// --- Modal Component (Screenshot 2025-10-07 092546.png) ---

const TicketModal: React.FC<{ ticket: Ticket, onClose: () => void }> = ({ ticket, onClose }) => {
  const [reply, setReply] = useState<ReplyState>({ subject: `RE: ${ticket.subject}`, message: '' });

  const handleSave = () => {
    console.log('Saving reply:', reply, 'for ticket:', ticket.id);
    // Here you would integrate with your actual backend logic
    onClose();
  };

  return (
<div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl p-8 transform transition-all max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex justify-between items-start border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Order #{ticket.id.slice(-6)} Issue</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={20} />
          </button>
        </div>

        {/* Original Ticket Info */}
        <div className="text-sm space-y-1 mb-6">
          <p className="text-gray-600">From: <span className="font-semibold text-gray-800">{ticket.from}</span></p>
          <p className="text-gray-600">Ticket ID: <span className="font-semibold text-gray-800">{ticket.id}</span></p>
        </div>

        {/* User Message Bubble */}
        <div className="bg-gray-100 p-4 rounded-xl text-gray-700 mb-8 border border-gray-200">
          <p className="text-base">{ticket.userMessage}</p>
        </div>

        {/* Reply Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Reply to User</h3>

          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              id="subject"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="--"
              value={reply.subject}
              onChange={(e) => setReply({ ...reply, subject: e.target.value })}
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Write your message here..."
              value={reply.message}
              onChange={(e) => setReply({ ...reply, message: e.target.value })}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-200"
          >
            Save changes
          </button>
        </div>

      </div>
    </div>
  );
};


// --- Main Support Component (Support Center Dashboard) ---

const Support: React.FC = () => {
  const [tickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [autoReplyTemplate, setAutoReplyTemplate] = useState<string>('');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const selectedTicket = useMemo(() => {
      return tickets.find(t => t.id === selectedTicketId) || null;
  }, [selectedTicketId, tickets]);

  const stats = useMemo(() => ({
    pending: tickets.filter(t => t.status === 'Pending').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
    newToday: 5, // Mocked for the screenshot
  }), [tickets]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-['Inter']">
      
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
        <p className="text-gray-500 mt-1">Manage all user reports and inquiries from one place.</p>
      </header>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4 mb-10">
        <StatCard title="Pending" value={stats.pending} icon={<Clock size={24} />} />
        <StatCard title="New Reports Today" value={stats.newToday} icon={<TrendingUp size={24} />} />
        <StatCard title="Resolved Tickets" value={stats.resolved} icon={<CheckCircle size={24} />} />
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-x-auto mb-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Ticket ID', 'Subject', 'User', 'Date', 'Status', 'Actions'].map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <tr 
                key={ticket.id} 
                className="bg-white hover:bg-gray-50 transition duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Ticket ID: {ticket.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {ticket.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {ticket.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {ticket.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusTag status={ticket.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setSelectedTicketId(ticket.id)}
                    className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                  >
                    <Eye size={16} />
                    <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Support Settings */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Support Settings</h2>
        
        {/* Auto Reply Template */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <label htmlFor="auto-reply" className="block text-sm font-medium text-gray-700 mb-2">
            Auto Reply Template
          </label>
          <textarea
            id="auto-reply"
            rows={5}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Write your auto-reply here..."
            value={autoReplyTemplate}
            onChange={(e) => setAutoReplyTemplate(e.target.value)}
          />
          <div className="flex justify-end mt-4">
            <button
              // Note: The screenshot button is misspelled as "Save cahnges". I'll correct it here.
              onClick={() => console.log('Auto reply template saved:', autoReplyTemplate)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-200"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>

      {/* Ticket Modal */}
      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicketId(null)}
        />
      )}
    </div>
  );
}

export default Support;
