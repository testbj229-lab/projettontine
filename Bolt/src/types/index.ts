export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  type: 'initiator' | 'participant';
  code: string;
}

export interface Participant {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  position: number;
  hasReceivedPayout: boolean;
  paymentHistory: Payment[];
  addedBy: 'code' | 'email' | 'manual';
  addedAt: Date;
}

export interface Payment {
  id: string;
  participantId: string;
  cycle: number;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  participantValidated: boolean;
  participantValidatedAt?: Date;
  initiatorValidated: boolean;
  initiatorValidatedAt?: Date;
  status: 'pending' | 'participant_paid' | 'confirmed' | 'overdue';
  auditLog: PaymentAudit[];
}

export interface PaymentAudit {
  id: string;
  action: 'participant_marked_paid' | 'initiator_validated' | 'payment_created';
  userId: string;
  userName: string;
  timestamp: Date;
  notes?: string;
}

export interface Tontine {
  id: string;
  name: string;
  description: string;
  type: 'traditional' | 'savings';
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
  customDays?: number;
  paymentDay?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  participants: Participant[];
  maxParticipants?: number;
  unlimitedParticipants: boolean;
  startDate: Date;
  endDate?: Date;
  collectWindow?: {
    startDay: number;
    endDay: number;
  };
  currentCycle: number;
  status: 'draft' | 'active' | 'completed' | 'paused' | 'suspended';
  initiatorId: string;
  inviteCode: string;
  inviteLink: string;
  orderType: 'manual' | 'random';
  gainType: 'money' | 'pack';
  packDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'payment_due' | 'payment_received' | 'payout_ready' | 'tontine_started' | 'tontine_suspended' | 'payment_validated';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  tontineId?: string;
  paymentId?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface DashboardStats {
  activeTontines: number;
  pendingPayments: number;
  upcomingPayouts: number;
  totalAmount: number;
}