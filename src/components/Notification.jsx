import { useDonation } from '../context/DonationContext';

export default function Notification() {
  const { notifications, dismissNotification } = useDonation();

  if (notifications.length === 0) return null;

  const latestNotification = notifications[0];

  return (
    <div className="notification">
      <div className="notification-header">
        <div className="notification-title">Notification</div>
        <button
          className="notification-close"
          onClick={() => dismissNotification(latestNotification.id)}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
      <div className="notification-message">{latestNotification.message}</div>
    </div>
  );
}
