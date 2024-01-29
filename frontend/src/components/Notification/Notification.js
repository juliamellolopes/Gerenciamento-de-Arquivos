import React, { useState, useEffect } from "react";
import { Icon } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import "./Notification.css"; // Estilo para o componente de notificação

const NotificationComponent = ({ type, message }) => {
  const [visible, setVisible] = useState(false);

  const showNotification = () => {
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 5000);
  };

  useEffect(() => {
    if (type && message) {
      showNotification();
    }
  }, [type, message]);

  return (
    <div
      style={{
        display: "block",
        width: 700,
        paddingLeft: 30,
      }}
    >
      {/* Renderizar a notificação quando ela estiver visível */}
      {visible && (
        <div className={`notification ${type}`}>
          <Icon icon={getIconByType(type)} size="lg" />
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

const getIconByType = (type) => {
  switch (type) {
    case "info":
      return "bell";
    case "success":
      return "check";
    case "warning":
      return "warning";
    case "error":
      return "close";
    default:
      return "bell";
  }
};

export default NotificationComponent;
