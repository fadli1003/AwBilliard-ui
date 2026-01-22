interface UserType {
  id?: number,
  name?: string,
  email: string,
  password: string,
  password_confirmation?: string,
  phone?: string,
  role?: 'admin' | 'user' | 'owner' | 'manager' | 'staff' | 'coach',
}

interface BookingType {
  id: number,
  user_id: number,
  meja_id: number,
  jam_mulai: string,
  jam_selesai: string,
  durasi?: number,
  total_harga?: number,
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
}

interface PaymentType {
  booking_id: number,
  order_id: string,
  jumlah_bayar: number,
  payment_method?: string,
  payment_type: 'dp' | 'full' | 'settlement',
  status: 'pending' | 'paid' | 'failed' | 'expired',
  snap_token?: string  
}

// interface JadwalType {
//   booking_id: number,
//   meja_id: number,
//   jam_mulai: string,
//   jam_selesai: string,
// }