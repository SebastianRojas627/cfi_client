import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { getUserNotifications } from '../api/solicitudService';
import { UserNotification } from '../api/types';

const socket = io('http://localhost:5001', {
  transports: ['websocket'],
  withCredentials: true,
});

export function useNotifications(usuario_id: string | null) {
  const [notifications, setNotifications] = useState<UserNotification[]>([])

  const fetchNotifications = async (usuario_id: string) => {
    const existingNotifications = await getUserNotifications(usuario_id)
    console.log(existingNotifications)
    setNotifications(existingNotifications)
  }

  useEffect(() => {

    if (!usuario_id) return

    fetchNotifications(usuario_id)

    socket.on('connect', () => {
      console.log('Connected to websocket server')
    })

    socket.on('new-request', (data) => {
      console.log('New Request Notification:', data)
      setNotifications((prev) => [data, ...prev])
    })

    return () => {
      socket.off('new-request')
      socket.off('connect')
      //socket.disconnect()
    }
  }, [])

  return notifications
}