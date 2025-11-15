/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import { X, Eye, TrendingUp, Clock, CheckCircle, Trash2, Loader2 } from "lucide-react";
import {
  useGetAllSupportMessagesQuery,
  useReplyToSupportMessageMutation,
  useDeleteSupportMessageMutation,
  useGetSupportStatsQuery,
  ISupportMessage,
  MessageStatus,
} from "@/Redux/Features/support/supportApi";

interface ReplyState {
  subject: string;
  message: string;
}

const StatusTag: React.FC<{ status: string }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
  const colorClasses =
    status === MessageStatus.PENDING
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
};
const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  isLoading?: boolean;
}> = ({ title, value, icon, isLoading }) => (
  <div className="flex-1 min-w-40 bg-white p-6 rounded-xl shadow-sm transition-shadow duration-300 hover:shadow-lg border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <div className="text-blue-500">{icon}</div>
    </div>
    {isLoading ? (
      <Loader2 className="animate-spin text-gray-400" size={24} />
    ) : (
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    )}
  </div>
);

// --- Modal Component ---

const TicketModal: React.FC<{
  ticket: ISupportMessage;
  onClose: () => void;
  onReplySuccess: () => void;
}> = ({ ticket, onClose }) => {
  const [reply, setReply] = useState<ReplyState>({
    subject: `RE: ${ticket.subject}`,
    message: "",
  });

  const [replyToMessage, { isLoading: isReplying }] = useReplyToSupportMessageMutation();

  const handleSave = async () => {
    if (!reply.message.trim()) {
      alert("Please enter a reply message");
      return;
    }

    try {
       await replyToMessage({
        id: ticket._id,
        reply: reply.message,
      }).unwrap();
    } catch (error: any) {
      console.error("Error sending reply:", error);
      alert(error?.data?.error || "Failed to send reply");
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl p-8 transform transition-all max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-start border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {ticket.subject}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
            disabled={isReplying}
          >
            <X size={20} />
          </button>
        </div>

        {/* Original Ticket Info */}
        <div className="text-sm space-y-1 mb-6">
          <p className="text-gray-600">
            From:{" "}
            <span className="font-semibold text-gray-800">
              {ticket.name} ({ticket.email})
            </span>
          </p>
          <p className="text-gray-600">
            Ticket ID:{" "}
            <span className="font-semibold text-gray-800">{ticket._id}</span>
          </p>
          <p className="text-gray-600">
            Date:{" "}
            <span className="font-semibold text-gray-800">
              {formatDate(ticket.createdAt)}
            </span>
          </p>
          <p className="text-gray-600">
            Status: <StatusTag status={ticket.status} />
          </p>
        </div>

        {/* User Message Bubble */}
        <div className="bg-gray-100 p-4 rounded-xl text-gray-700 mb-8 border border-gray-200">
          <p className="text-base whitespace-pre-wrap">{ticket.message}</p>
        </div>

        {/* Show existing admin reply if resolved */}
        {ticket.status === MessageStatus.RESOLVED && ticket.adminReply && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
              Admin Reply
            </h3>
            <div className="bg-blue-50 p-4 rounded-xl text-gray-700 border border-blue-200">
              <p className="text-base whitespace-pre-wrap">{ticket.adminReply}</p>
              {ticket.repliedAt && (
                <p className="text-xs text-gray-500 mt-2">
                  Replied on: {formatDate(ticket.repliedAt)}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Reply Section - Only show for pending tickets */}
        {ticket.status === MessageStatus.PENDING && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Reply to User
            </h3>

            {/* Subject Field */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="RE: Subject"
                value={reply.subject}
                onChange={(e) => setReply({ ...reply, subject: e.target.value })}
                disabled={isReplying}
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Write your message here..."
                value={reply.message}
                onChange={(e) => setReply({ ...reply, message: e.target.value })}
                disabled={isReplying}
              />
            </div>
          </div>
        )}

        {/* Save Button */}
        {ticket.status === MessageStatus.PENDING && (
          <div className="flex justify-end mt-8">
            <button
              onClick={handleSave}
              disabled={isReplying || !reply.message.trim()}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isReplying && <Loader2 className="animate-spin" size={16} />}
              {isReplying ? "Sending..." : "Save changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Support Component ---

const Support: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<MessageStatus | "all">("all");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  // API Queries
  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    refetch: refetchMessages,
  } = useGetAllSupportMessagesQuery(
    statusFilter !== "all" ? { status: statusFilter } : undefined
  );

  console.log(messagesData)

  const {
    data: statsData,
    isLoading: isLoadingStats,
  } = useGetSupportStatsQuery({});

  const [deleteMessage] = useDeleteSupportMessageMutation();
  console.log(statsData)
  const tickets : any = [];
  const stats =  {
    pending: 0,
    resolved: 0,
    todayCount: 0,
  };

  const selectedTicket = useMemo(() => {
    return tickets.find((t : any) => t._id === selectedTicketId) || null;
  }, [selectedTicketId, tickets]);

  const handleDeleteTicket = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!confirm("Are you sure you want to delete this ticket?")) {
      return;
    }

    try {
      await deleteMessage(id).unwrap();
    } catch (error: any) {
      console.error("Error deleting ticket:", error);
      alert(error?.data?.error || "Failed to delete ticket");
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 font-['Inter']">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
        <p className="text-gray-500 mt-1">
          Manage all user reports and inquiries from one place.
        </p>
      </header>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4 mb-10">
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={<Clock size={24} />}
          isLoading={isLoadingStats}
        />
        <StatCard
          title="New Reports Today"
          value={stats.todayCount}
          icon={<TrendingUp size={24} />}
          isLoading={isLoadingStats}
        />
        <StatCard
          title="Resolved Tickets"
          value={stats.resolved}
          icon={<CheckCircle size={24} />}
          isLoading={isLoadingStats}
        />
      </div>

      {/* Filter Options */}
      <div className="mb-6 flex gap-4 items-center">
        <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as MessageStatus | "all")}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All</option>
          <option value={MessageStatus.PENDING}>Pending</option>
          <option value={MessageStatus.RESOLVED}>Resolved</option>
        </select>
      </div>

      {/* Loading State */}
      {isLoadingMessages && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      )}

      {/* Empty State */}
      {!isLoadingMessages && tickets.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">No support tickets found</p>
        </div>
      )}

      {/* Desktop Table View */}
      {!isLoadingMessages && tickets.length > 0 && (
        <div className="hidden md:block bg-white rounded-xl shadow-lg border border-gray-100 overflow-x-auto mb-10">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Ticket ID",
                  "Subject",
                  "User",
                  "Email",
                  "Date",
                  "Status",
                  "Actions",
                ].map((header) => (
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
              {tickets.map((ticket : any) => (
                <tr
                  key={ticket._id}
                  className="bg-white hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ticket._id.slice(-8)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                    {ticket.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {ticket.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {ticket.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {formatDate(ticket.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusTag status={ticket.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedTicketId(ticket._id)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer flex items-center space-x-1"
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </button>
                      <button
                        onClick={(e) => handleDeleteTicket(ticket._id, e)}
                        className="text-red-600 cursor-pointer hover:text-red-800 flex items-center space-x-1"
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Card View */}
      {!isLoadingMessages && tickets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden mb-10">
          {tickets.map((ticket : any) => (
            <div
              key={ticket._id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {ticket.subject}
                  </p>
                  <p className="text-xs text-gray-500">
                    ID: {ticket._id.slice(-8)}
                  </p>
                </div>
                <StatusTag status={ticket.status} />
              </div>
              <div className="text-sm text-gray-600 border-t border-b border-gray-100 py-2">
                <p>
                  <span className="font-medium text-gray-700">User:</span>{" "}
                  {ticket.name}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Email:</span>{" "}
                  {ticket.email}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Date:</span>{" "}
                  {formatDate(ticket.createdAt)}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setSelectedTicketId(ticket._id)}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer flex items-center space-x-1 text-sm font-medium"
                >
                  <Eye size={16} />
                  <span>View</span>
                </button>
                <button
                  onClick={(e) => handleDeleteTicket(ticket._id, e)}
                  className="text-red-600 hover:text-red-800 cursor-pointer flex items-center space-x-1 text-sm font-medium"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ticket Modal */}
      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicketId(null)}
          onReplySuccess={refetchMessages}
        />
      )}
    </div>
  );
};

export default Support;