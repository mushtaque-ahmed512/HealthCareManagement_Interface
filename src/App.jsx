import { useState, useEffect } from 'react'
import { 
  Stethoscope, 
  Bell, 
  User, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Calendar, 
  Clock, 
  MapPin,
  Users,
  Activity,
  TrendingUp,
  Home,
  FileText,
  Settings,
  Heart,
  Shield,
  Zap,
  Star,
  Filter,
  Download,
  Mail,
  Phone,
  Droplets,
  AlertCircle,
  ChevronDown,
  LogOut,
  Menu,
  X,
  BarChart3,
  Pill,
  Microscope,
  Ambulance,
  ClipboardList,
  Eye,
  MoreVertical,
  CheckCircle,
  XCircle,
  PlayCircle
} from 'lucide-react'

// Custom hook for localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

// Utility functions
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validatePhone = (phone) => {
  const re = /^\d{10}$/
  return re.test(phone.replace(/\D/g, ''))
}

// Enhanced UI Components
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  onClick, 
  type = 'button',
  className = '',
  icon: Icon,
  loading = false
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white focus:ring-cyan-500 shadow-lg shadow-cyan-500/25',
    secondary: 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white focus:ring-purple-500 shadow-lg shadow-purple-500/25',
    success: 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white focus:ring-emerald-500 shadow-lg shadow-emerald-500/25',
    danger: 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white focus:ring-rose-500 shadow-lg shadow-rose-500/25',
    ghost: 'bg-white/80 hover:bg-white text-gray-700 border border-gray-200 hover:border-gray-300 focus:ring-gray-500 hover:shadow-md'
  }
  
  const sizes = {
    small: 'px-4 py-2.5 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
      ) : (
        Icon && <Icon className="h-4 w-4" />
      )}
      {children}
    </button>
  )
}

const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  error,
  required = false,
  className = '',
  icon: Icon
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-opacity-50 transition-all duration-200
            ${Icon ? 'pl-11' : 'pl-4'}
            ${error 
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/50 bg-rose-50' 
              : 'border-gray-200 focus:border-cyan-500 focus:ring-cyan-500/50 hover:border-gray-300'
            }
            ${className}
          `}
        />
      </div>
      {error && (
        <div className="flex items-center gap-1 mt-1">
          <AlertCircle className="h-4 w-4 text-rose-500" />
          <p className="text-sm text-rose-600">{error}</p>
        </div>
      )}
    </div>
  )
}

const Card = ({ children, className = '', title, actions, gradient = false }) => {
  return (
    <div className={`
      rounded-2xl shadow-lg overflow-hidden border border-gray-100/50 backdrop-blur-sm
      ${gradient 
        ? 'bg-gradient-to-br from-white to-gray-50/80' 
        : 'bg-white/90'
      }
      ${className}
    `}>
      {(title || actions) && (
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
          {title && <h3 className="text-lg font-bold text-gray-800">{title}</h3>}
          {actions && <div className="flex space-x-2">{actions}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto transform animate-scaleIn border border-gray-200/50`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

// Enhanced Badge Component
const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-blue-100 text-blue-800',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-rose-100 text-rose-800',
    info: 'bg-cyan-100 text-cyan-800',
    purple: 'bg-purple-100 text-purple-800'
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

// Loading Skeleton Component
const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
)

// Main App Component
function App() {
  const [patients, setPatients] = useLocalStorage('healthcare-patients', [
    { 
      id: 1, 
      name: 'John Doe', 
      age: 45, 
      email: 'john.doe@email.com',
      phone: '1234567890',
      condition: 'Hypertension', 
      bloodType: 'A+',
      allergies: 'Penicillin',
      lastVisit: '2024-01-15',
      createdAt: '2024-01-01',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      age: 32, 
      email: 'jane.smith@email.com',
      phone: '0987654321',
      condition: 'Diabetes', 
      bloodType: 'B-',
      allergies: 'None',
      lastVisit: '2024-01-10',
      createdAt: '2024-01-02',
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Michael Brown', 
      age: 58, 
      email: 'm.brown@email.com',
      phone: '5551234567',
      condition: 'Arthritis', 
      bloodType: 'O+',
      allergies: 'Aspirin',
      lastVisit: '2024-01-12',
      createdAt: '2024-01-03',
      status: 'recovery'
    }
  ])
  
  const [appointments, setAppointments] = useLocalStorage('healthcare-appointments', [
    { 
      id: 1, 
      patientId: 1, 
      patientName: 'John Doe', 
      date: '2024-01-20', 
      time: '10:00', 
      doctor: 'Dr. Sarah Brown',
      department: 'Cardiology',
      notes: 'Regular checkup and blood pressure monitoring',
      status: 'scheduled'
    },
    { 
      id: 2, 
      patientId: 2, 
      patientName: 'Jane Smith', 
      date: '2024-01-21', 
      time: '14:30', 
      doctor: 'Dr. James Wilson',
      department: 'Endocrinology',
      notes: 'Diabetes management and insulin adjustment',
      status: 'scheduled'
    },
    { 
      id: 3, 
      patientId: 3, 
      patientName: 'Michael Brown', 
      date: '2024-01-22', 
      time: '11:15', 
      doctor: 'Dr. Emily Chen',
      department: 'Rheumatology',
      notes: 'Joint pain evaluation and treatment plan review',
      status: 'confirmed'
    }
  ])

  const [activeTab, setActiveTab] = useState('dashboard')
  const [patientModalOpen, setPatientModalOpen] = useState(false)
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false)
  const [patientDetailModalOpen, setPatientDetailModalOpen] = useState(false)
  const [editingPatient, setEditingPatient] = useState(null)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [patientSearch, setPatientSearch] = useState('')
  const [patientForm, setPatientForm] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    condition: '',
    bloodType: '',
    allergies: ''
  })
  const [appointmentForm, setAppointmentForm] = useState({
    patientId: '',
    date: '',
    time: '',
    doctor: '',
    department: '',
    notes: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)

  // Simulate loading
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [activeTab])

  // Patient Management
  const validatePatientForm = () => {
    const newErrors = {}
    
    if (!patientForm.name.trim()) newErrors.name = 'Name is required'
    if (!patientForm.age || patientForm.age < 0 || patientForm.age > 150) newErrors.age = 'Valid age is required'
    if (patientForm.email && !validateEmail(patientForm.email)) newErrors.email = 'Valid email is required'
    if (patientForm.phone && !validatePhone(patientForm.phone)) newErrors.phone = 'Valid phone number is required'
    if (!patientForm.condition.trim()) newErrors.condition = 'Condition is required'
    
    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePatientSubmit = (e) => {
    e.preventDefault()
    
    if (!validatePatientForm()) return

    const patientData = {
      ...patientForm,
      id: editingPatient ? editingPatient.id : Date.now(),
      lastVisit: new Date().toISOString().split('T')[0],
      createdAt: editingPatient ? editingPatient.createdAt : new Date().toISOString(),
      status: 'active'
    }

    if (editingPatient) {
      setPatients(patients.map(p => p.id === editingPatient.id ? patientData : p))
    } else {
      setPatients([...patients, patientData])
    }

    closePatientModal()
  }

  const editPatient = (patient) => {
    setEditingPatient(patient)
    setPatientForm({
      name: patient.name,
      age: patient.age,
      email: patient.email || '',
      phone: patient.phone || '',
      condition: patient.condition,
      bloodType: patient.bloodType || '',
      allergies: patient.allergies || ''
    })
    setPatientModalOpen(true)
  }

  const viewPatientDetails = (patient) => {
    setSelectedPatient(patient)
    setPatientDetailModalOpen(true)
  }

  const deletePatient = (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(p => p.id !== patientId))
      setAppointments(appointments.filter(apt => apt.patientId !== patientId))
    }
  }

  const closePatientModal = () => {
    setPatientModalOpen(false)
    setEditingPatient(null)
    setPatientForm({
      name: '',
      age: '',
      email: '',
      phone: '',
      condition: '',
      bloodType: '',
      allergies: ''
    })
    setFormErrors({})
  }

  // Appointment Management
  const handleAppointmentSubmit = (e) => {
    e.preventDefault()
    
    const selectedPatient = patients.find(p => p.id === parseInt(appointmentForm.patientId))
    
    const appointmentData = {
      id: Date.now(),
      patientId: parseInt(appointmentForm.patientId),
      patientName: selectedPatient?.name || 'Unknown Patient',
      date: appointmentForm.date,
      time: appointmentForm.time,
      doctor: appointmentForm.doctor,
      department: appointmentForm.department,
      notes: appointmentForm.notes,
      status: 'scheduled'
    }

    setAppointments([...appointments, appointmentData])
    closeAppointmentModal()
  }

  const updateAppointmentStatus = (appointmentId, status) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status } : apt
    ))
  }

  const closeAppointmentModal = () => {
    setAppointmentModalOpen(false)
    setAppointmentForm({
      patientId: '',
      date: '',
      time: '',
      doctor: '',
      department: '',
      notes: ''
    })
  }

  // Filtered data
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
    patient.condition.toLowerCase().includes(patientSearch.toLowerCase())
  )

  const today = new Date().toISOString().split('T')[0]
  const upcomingAppointments = appointments
    .filter(apt => apt.date >= today)
    .sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time))

  const todayAppointments = appointments.filter(apt => apt.date === today)

  // Enhanced Dashboard Stats
  const stats = [
    {
      title: 'Total Patients',
      value: patients.length,
      icon: Users,
      color: 'blue',
      change: '+12%',
      description: 'Active patients',
      trend: 'up'
    },
    {
      title: 'Today\'s Appointments',
      value: todayAppointments.length,
      icon: Calendar,
      color: 'emerald',
      change: '+5%',
      description: 'Scheduled visits',
      trend: 'up'
    },
    {
      title: 'Active Cases',
      value: patients.filter(p => p.condition).length,
      icon: Activity,
      color: 'amber',
      change: '+8%',
      description: 'Under treatment',
      trend: 'up'
    },
    {
      title: 'Monthly Growth',
      value: '24%',
      icon: TrendingUp,
      color: 'purple',
      change: '+3%',
      description: 'Patient increase',
      trend: 'up'
    }
  ]

  // Quick Actions
  const quickActions = [
    {
      title: 'Add Patient',
      description: 'Register new patient',
      icon: User,
      color: 'teal',
      action: () => setPatientModalOpen(true)
    },
    {
      title: 'Schedule',
      description: 'Book appointment',
      icon: Calendar,
      color: 'blue',
      action: () => setAppointmentModalOpen(true)
    },
    {
      title: 'Reports',
      description: 'View analytics',
      icon: BarChart3,
      color: 'purple',
      action: () => setActiveTab('reports')
    },
    {
      title: 'Prescriptions',
      description: 'Manage medications',
      icon: Pill,
      color: 'green',
      action: () => console.log('Prescriptions clicked')
    }
  ]

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  // Notifications
  const notifications = [
    { id: 1, message: 'New appointment request from Jane Smith', time: '5 min ago', read: false },
    { id: 2, message: 'Lab results ready for John Doe', time: '1 hour ago', read: false },
    { id: 3, message: 'System maintenance scheduled', time: '2 hours ago', read: true }
  ]

  // Get status color for appointments
  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-emerald-100 text-emerald-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-rose-100 text-rose-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  const markAllNotificationsAsRead = () => {
    setNotificationCount(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Modern Enhanced Header */}
      <header className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    MediCare Pro
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Advanced Healthcare Management</p>
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 font-semibold ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/25'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <div className="relative">
                <button 
                  className="relative p-3 text-gray-600 hover:text-gray-900 transition-colors rounded-2xl hover:bg-gray-100/50 group"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                >
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute top-2 right-2 h-3 w-3 bg-rose-500 rounded-full animate-pulse"></span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/60 py-2 z-50 animate-scaleIn">
                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                      <button 
                        onClick={markAllNotificationsAsRead}
                        className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/80 transition-colors ${!notification.read ? 'bg-blue-50/50' : ''}`}>
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-3 text-gray-600 hover:text-gray-900 transition-colors rounded-2xl hover:bg-gray-100/50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              {/* Enhanced Profile Dropdown */}
              <div className="relative">
                <button 
                  className="flex items-center space-x-3 bg-white/80 rounded-2xl px-4 py-2.5 border border-gray-200/60 hover:border-gray-300/60 transition-all duration-200 hover:shadow-lg group"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                  <div className="h-10 w-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left hidden sm:block">
                    <span className="text-sm font-semibold text-gray-800 block">Dr. Shehrem Shah</span>
                    <p className="text-xs text-gray-500">Senior Cardiologist</p>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/60 py-2 z-50 animate-scaleIn">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">Dr. Shehrem Shah</p>
                      <p className="text-xs text-gray-500 mt-1">shehrem.shah@medicare.com</p>
                    </div>
                    <div className="py-2">
                      <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50/80 transition-colors">
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                      </button>
                      <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50/80 transition-colors">
                        <Settings className="h-4 w-4" />
                        <span>Account Settings</span>
                      </button>
                      <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50/80 transition-colors">
                        <FileText className="h-4 w-4" />
                        <span>My Schedule</span>
                      </button>
                    </div>
                    <div className="border-t border-gray-100 pt-2">
                      <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-rose-600 hover:bg-rose-50/80 transition-colors">
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/60 mt-4 mb-4 p-4 animate-fadeIn">
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-semibold ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modern Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -translate-x-24 translate-y-24"></div>
              
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">Welcome back, Dr. Shah! 👋</h2>
                  <p className="text-teal-100 text-lg mb-4">Here's your healthcare overview for today</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-2">
                      <Calendar className="h-4 w-4" />
                      <span className="font-semibold text-sm">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-semibold text-sm">{todayAppointments.length} appointments today</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-2">
                      <Users className="h-4 w-4" />
                      <span className="font-semibold text-sm">{patients.length} total patients</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 lg:mt-0 flex gap-3">
                  <Button 
                    variant="secondary" 
                    icon={Plus}
                    className="bg-white/20 hover:bg-white/30 border-white/30"
                    onClick={() => setPatientModalOpen(true)}
                  >
                    Add Patient
                  </Button>
                  <Button 
                    variant="secondary" 
                    icon={Calendar}
                    className="bg-white/20 hover:bg-white/30 border-white/30"
                    onClick={() => setAppointmentModalOpen(true)}
                  >
                    New Appointment
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Grid with Skeleton Loading */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading ? (
                // Skeleton loading for stats
                Array(4).fill(0).map((_, index) => (
                  <Card key={index} className="p-6" gradient>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-8 w-12 mb-2" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                      <Skeleton className="h-12 w-12 rounded-xl" />
                    </div>
                  </Card>
                ))
              ) : (
                stats.map((stat, index) => (
                  <Card key={index} className="p-6 transform hover:scale-105 transition-transform duration-300 group cursor-pointer" gradient>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <TrendingUp className={`h-4 w-4 ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`} />
                          <p className="text-xs text-emerald-600 font-semibold">{stat.change} from last month</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                      </div>
                      <div className={`h-12 w-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                        <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Actions */}
              <Card title="Quick Actions" className="lg:col-span-1">
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className="w-full flex items-center space-x-4 p-4 rounded-xl border border-gray-200/50 hover:border-gray-300/50 hover:shadow-md transition-all duration-200 group bg-gradient-to-r from-white to-gray-50/50"
                    >
                      <div className={`h-12 w-12 bg-${action.color}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <action.icon className={`h-6 w-6 text-${action.color}-600`} />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="font-semibold text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-500">{action.description}</p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-400 transform -rotate-90" />
                    </button>
                  ))}
                </div>
              </Card>

              {/* Today's Appointments */}
              <Card 
                title={
                  <div className="flex items-center justify-between w-full">
                    <span>Today's Appointments</span>
                    <Badge variant={todayAppointments.length > 0 ? 'success' : 'default'}>
                      {todayAppointments.length} scheduled
                    </Badge>
                  </div>
                } 
                className="lg:col-span-2"
              >
                {loading ? (
                  // Skeleton loading for appointments
                  <div className="space-y-4">
                    {Array(3).fill(0).map((_, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-gray-200/50">
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-12 w-12 rounded-xl" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-48" />
                          </div>
                        </div>
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-200 group">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Calendar className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-bold text-gray-900">{appointment.patientName}</h3>
                              <button 
                                onClick={() => viewPatientDetails(patients.find(p => p.id === appointment.patientId))}
                                className="text-gray-400 hover:text-cyan-600 transition-colors"
                                title="View patient details"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-1">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span className="font-semibold">{appointment.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>{appointment.doctor}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{appointment.department}</span>
                              </div>
                            </div>
                            {appointment.notes && (
                              <p className="text-sm text-gray-500 mt-2 bg-blue-50 rounded-lg px-3 py-2 border border-blue-200">
                                {appointment.notes}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                          <div className="relative group">
                            <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                            <div className="absolute right-0 top-6 hidden group-hover:block bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                              <button 
                                onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                              >
                                <CheckCircle className="h-4 w-4 text-emerald-500" />
                                <span>Confirm</span>
                              </button>
                              <button 
                                onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                              >
                                <XCircle className="h-4 w-4 text-rose-500" />
                                <span>Cancel</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {todayAppointments.length === 0 && (
                      <div className="text-center py-12">
                        <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg mb-2">No appointments scheduled for today.</p>
                        <p className="text-gray-400 text-sm mb-4">Schedule an appointment to get started</p>
                        <Button 
                          onClick={() => setAppointmentModalOpen(true)}
                          variant="primary"
                          icon={Plus}
                        >
                          Schedule Appointment
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </div>

            {/* Recent Activity */}
            <Card title="Recent Activity">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    New Patients
                  </h4>
                  {patients.slice(0, 3).map(patient => (
                    <div key={patient.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="h-8 w-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-semibold text-white">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                        <p className="text-xs text-gray-500">{patient.condition}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Health Trends
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Hypertension</span>
                      <Badge variant="info">15%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Diabetes</span>
                      <Badge variant="warning">12%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cardiac Issues</span>
                      <Badge variant="danger">8%</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Performance
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Patient Satisfaction</span>
                      <span className="text-sm font-semibold text-emerald-600">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Appointment Rate</span>
                      <span className="text-sm font-semibold text-blue-600">88%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Response Time</span>
                      <span className="text-sm font-semibold text-amber-600">12min</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Other tabs would continue here with similar enhancements */}
        {/* Patients Tab */}
        {activeTab === 'patients' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Patient Management
                </h2>
                <p className="text-gray-600 mt-1">Manage your patients and their medical records</p>
              </div>
              <Button 
                onClick={() => setPatientModalOpen(true)}
                variant="primary"
                icon={Plus}
              >
                Add Patient
              </Button>
            </div>

            <Card>
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
                <Input
                  label=""
                  placeholder="Search patients by name or condition..."
                  value={patientSearch}
                  onChange={(e) => setPatientSearch(e.target.value)}
                  className="max-w-md"
                  icon={Search}
                />
                <div className="flex gap-2">
                  <Button variant="ghost" icon={Filter}>
                    Filter
                  </Button>
                  <Button variant="ghost" icon={Download}>
                    Export
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200/50">
                <table className="min-w-full divide-y divide-gray-200/50">
                  <thead className="bg-gradient-to-r from-gray-50 to-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Condition
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Blood Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Last Visit
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200/50">
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform cursor-pointer"
                                 onClick={() => viewPatientDetails(patient)}>
                              <span className="text-sm font-semibold text-white">
                                {patient.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-bold text-gray-900">{patient.name}</div>
                              <div className="text-sm text-gray-500">Age: {patient.age}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 space-y-1">
                            {patient.email && (
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3 text-gray-400" />
                                <span>{patient.email}</span>
                              </div>
                            )}
                            {patient.phone && (
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3 text-gray-400" />
                                <span>{patient.phone}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="info">{patient.condition}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Droplets className="h-4 w-4 text-rose-500" />
                            <span className="text-sm font-semibold text-gray-900">{patient.bloodType}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {patient.lastVisit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => viewPatientDetails(patient)}
                              className="text-blue-600 hover:text-blue-900 transition-colors p-2 rounded-lg hover:bg-blue-50"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => editPatient(patient)}
                              className="text-cyan-600 hover:text-cyan-900 transition-colors p-2 rounded-lg hover:bg-cyan-50"
                              title="Edit Patient"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deletePatient(patient.id)}
                              className="text-rose-600 hover:text-rose-900 transition-colors p-2 rounded-lg hover:bg-rose-50"
                              title="Delete Patient"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Appointments Tab and other tabs would follow similar patterns */}
      </div>

      {/* Enhanced Patient Modal */}
      <Modal
        isOpen={patientModalOpen}
        onClose={closePatientModal}
        title={editingPatient ? 'Edit Patient Information' : 'Add New Patient'}
      >
        <form onSubmit={handlePatientSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              value={patientForm.name}
              onChange={(e) => setPatientForm({...patientForm, name: e.target.value})}
              required
              error={formErrors.name}
              icon={User}
              placeholder="Enter patient's full name"
            />
            <Input
              label="Age"
              type="number"
              value={patientForm.age}
              onChange={(e) => setPatientForm({...patientForm, age: e.target.value})}
              required
              error={formErrors.age}
              placeholder="Patient age"
            />
            <Input
              label="Email Address"
              type="email"
              value={patientForm.email}
              onChange={(e) => setPatientForm({...patientForm, email: e.target.value})}
              error={formErrors.email}
              icon={Mail}
              placeholder="patient@email.com"
            />
            <Input
              label="Phone Number"
              type="tel"
              value={patientForm.phone}
              onChange={(e) => setPatientForm({...patientForm, phone: e.target.value})}
              placeholder="1234567890"
              error={formErrors.phone}
              icon={Phone}
            />
            <Input
              label="Medical Condition"
              value={patientForm.condition}
              onChange={(e) => setPatientForm({...patientForm, condition: e.target.value})}
              required
              error={formErrors.condition}
              icon={Heart}
              placeholder="Primary medical condition"
            />
            <Input
              label="Blood Type"
              value={patientForm.bloodType}
              onChange={(e) => setPatientForm({...patientForm, bloodType: e.target.value})}
              placeholder="A+, B-, O+, etc."
              icon={Droplets}
            />
          </div>
          <Input
            label="Allergies & Sensitivities"
            value={patientForm.allergies}
            onChange={(e) => setPatientForm({...patientForm, allergies: e.target.value})}
            placeholder="List any known allergies or sensitivities..."
            icon={AlertCircle}
          />
          
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="ghost"
              onClick={closePatientModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={editingPatient ? Edit : Plus}
            >
              {editingPatient ? 'Update Patient' : 'Add Patient'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Patient Detail Modal */}
      <Modal
        isOpen={patientDetailModalOpen}
        onClose={() => setPatientDetailModalOpen(false)}
        title="Patient Details"
        size="lg"
      >
        {selectedPatient && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Full Name</label>
                    <p className="font-medium">{selectedPatient.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Age</label>
                    <p className="font-medium">{selectedPatient.age} years</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Contact</label>
                    <p className="font-medium">{selectedPatient.phone}</p>
                    <p className="text-sm text-gray-600">{selectedPatient.email}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Medical Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Condition</label>
                    <Badge variant="info">{selectedPatient.condition}</Badge>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Blood Type</label>
                    <p className="font-medium">{selectedPatient.bloodType}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Allergies</label>
                    <p className="font-medium">{selectedPatient.allergies || 'None reported'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-700 mb-4">Appointment History</h3>
              <div className="space-y-3">
                {appointments.filter(apt => apt.patientId === selectedPatient.id).map(appointment => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{appointment.date} at {appointment.time}</p>
                      <p className="text-sm text-gray-600">With {appointment.doctor} - {appointment.department}</p>
                    </div>
                    <Badge variant={appointment.status === 'completed' ? 'success' : 'info'}>
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Enhanced Appointment Modal */}
      <Modal
        isOpen={appointmentModalOpen}
        onClose={closeAppointmentModal}
        title="Schedule New Appointment"
      >
        <form onSubmit={handleAppointmentSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Patient <span className="text-rose-500">*</span>
              </label>
              <select
                value={appointmentForm.patientId}
                onChange={(e) => setAppointmentForm({...appointmentForm, patientId: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-cyan-500/50 focus:border-cyan-500 hover:border-gray-300 transition-colors"
                required
              >
                <option value="">Choose a patient...</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.condition} (Age: {patient.age})
                  </option>
                ))}
              </select>
            </div>
            
            <Input
              label="Appointment Date"
              type="date"
              value={appointmentForm.date}
              onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
              required
              min={today}
              icon={Calendar}
            />
            <Input
              label="Appointment Time"
              type="time"
              value={appointmentForm.time}
              onChange={(e) => setAppointmentForm({...appointmentForm, time: e.target.value})}
              required
              icon={Clock}
            />
            <Input
              label="Assigned Doctor"
              value={appointmentForm.doctor}
              onChange={(e) => setAppointmentForm({...appointmentForm, doctor: e.target.value})}
              required
              placeholder="Dr. Smith"
              icon={User}
            />
            <Input
              label="Department"
              value={appointmentForm.department}
              onChange={(e) => setAppointmentForm({...appointmentForm, department: e.target.value})}
              required
              placeholder="Cardiology"
              icon={MapPin}
            />
          </div>
          
          <Input
            label="Appointment Notes"
            value={appointmentForm.notes}
            onChange={(e) => setAppointmentForm({...appointmentForm, notes: e.target.value})}
            placeholder="Any additional notes, symptoms, or special requirements..."
          />
          
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="ghost"
              onClick={closeAppointmentModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={Calendar}
            >
              Schedule Appointment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default App