import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Mail,
  MessageSquare,
  LogOut,
  BarChart3,
  Inbox,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";

export default function AdminDashboard() {
  const { user, isLoading: authLoading, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== "admin")) {
      navigate("/");
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  const contactsQuery = trpc.admin.listContacts.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
    retry: false,
  });

  const messagesQuery = trpc.admin.listMessages.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
    retry: false,
  });

  const stats = {
    totalContacts: contactsQuery.data?.length || 0,
    totalMessages: messagesQuery.data?.length || 0,
    totalUsers: 0,
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FDF8F5] flex items-center justify-center">
        <div className="text-[#8B7B6B]">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#FDF8F5] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <AlertTriangle className="w-12 h-12 text-[#D4A574] mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-[#2D3142] mb-2">Access Denied</h2>
          <p className="text-[#8B7B6B] mb-4">You need admin privileges to access this page.</p>
          <Link to="/">
            <Button className="bg-[#C97B84] text-white rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      {/* Top bar */}
      <header className="bg-white border-b border-[#E8DDD4]/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C97B84] to-[#A85D65] flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-display text-lg font-semibold text-[#2D3142]">
                  Admin Dashboard
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#8B7B6B] hidden sm:inline">
                {user.name || "Admin"}
              </span>
              <Link to="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-[#E8DDD4] text-[#5A5450]"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Site
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
                className="rounded-full border-[#E8DDD4] text-[#5A5450] hover:text-red-500"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-6 border border-[#E8DDD4]/50 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#8B7B6B] mb-1">Contact Messages</p>
                <p className="font-display text-3xl font-bold text-[#2D3142]">
                  {stats.totalContacts}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#C97B84]/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#C97B84]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-[#E8DDD4]/50 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#8B7B6B] mb-1">Board Messages</p>
                <p className="font-display text-3xl font-bold text-[#2D3142]">
                  {stats.totalMessages}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#D4A574]/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[#D4A574]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-[#E8DDD4]/50 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#8B7B6B] mb-1">Status</p>
                <p className="font-display text-lg font-bold text-[#2D3142]">Active</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Submissions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl border border-[#E8DDD4]/50 shadow-sm mb-8"
        >
          <div className="p-6 border-b border-[#E8DDD4]/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Inbox className="w-5 h-5 text-[#C97B84]" />
              <h2 className="font-display text-xl font-semibold text-[#2D3142]">
                Contact Form Submissions
              </h2>
            </div>
            <Badge
              variant="outline"
              className="border-[#C97B84]/30 text-[#C97B84]"
            >
              {stats.totalContacts} total
            </Badge>
          </div>

          {contactsQuery.isLoading ? (
            <div className="p-8 text-center text-[#8B7B6B]">Loading contacts...</div>
          ) : contactsQuery.isError ? (
            <div className="p-8 text-center text-red-500">
              <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
              Error loading contacts. You may not have admin privileges.
            </div>
          ) : contactsQuery.data?.length === 0 ? (
            <div className="p-8 text-center text-[#8B7B6B]">No contact submissions yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#E8DDD4]/50">
                    <TableHead className="text-[#8B7B6B] font-medium">Name</TableHead>
                    <TableHead className="text-[#8B7B6B] font-medium">Email</TableHead>
                    <TableHead className="text-[#8B7B6B] font-medium">Subject</TableHead>
                    <TableHead className="text-[#8B7B6B] font-medium">Message</TableHead>
                    <TableHead className="text-[#8B7B6B] font-medium">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contactsQuery.data?.map((contact) => (
                    <TableRow key={contact.id} className="border-[#E8DDD4]/50 hover:bg-[#F8F0EB]/50">
                      <TableCell className="font-medium text-[#2D3142]">
                        {contact.name}
                      </TableCell>
                      <TableCell className="text-[#5A5450] text-sm">{contact.email}</TableCell>
                      <TableCell className="text-[#5A5450] text-sm">
                        {contact.subject || "—"}
                      </TableCell>
                      <TableCell className="text-[#5A5450] text-sm max-w-xs truncate">
                        {contact.message}
                      </TableCell>
                      <TableCell className="text-[#8B7B6B] text-xs whitespace-nowrap">
                        {formatDate(contact.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>

        {/* Message Board Submissions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl border border-[#E8DDD4]/50 shadow-sm"
        >
          <div className="p-6 border-b border-[#E8DDD4]/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-[#D4A574]" />
              <h2 className="font-display text-xl font-semibold text-[#2D3142]">
                Message Board Posts
              </h2>
            </div>
            <Badge
              variant="outline"
              className="border-[#D4A574]/30 text-[#D4A574]"
            >
              {stats.totalMessages} total
            </Badge>
          </div>

          {messagesQuery.isLoading ? (
            <div className="p-8 text-center text-[#8B7B6B]">Loading messages...</div>
          ) : messagesQuery.isError ? (
            <div className="p-8 text-center text-red-500">
              <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
              Error loading messages. You may not have admin privileges.
            </div>
          ) : messagesQuery.data?.length === 0 ? (
            <div className="p-8 text-center text-[#8B7B6B]">No message board posts yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#E8DDD4]/50">
                    <TableHead className="text-[#8B7B6B] font-medium">Name</TableHead>
                    <TableHead className="text-[#8B7B6B] font-medium">Email</TableHead>
                    <TableHead className="text-[#8B7B6B] font-medium">Content</TableHead>
                    <TableHead className="text-[#8B7B6B] font-medium">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messagesQuery.data?.map((msg) => (
                    <TableRow key={msg.id} className="border-[#E8DDD4]/50 hover:bg-[#F8F0EB]/50">
                      <TableCell className="font-medium text-[#2D3142]">{msg.name}</TableCell>
                      <TableCell className="text-[#5A5450] text-sm">{msg.email}</TableCell>
                      <TableCell className="text-[#5A5450] text-sm max-w-md line-clamp-2">
                        {msg.content}
                      </TableCell>
                      <TableCell className="text-[#8B7B6B] text-xs whitespace-nowrap">
                        {formatDate(msg.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
