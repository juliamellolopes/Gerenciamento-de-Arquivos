import React, { useState, useEffect } from "react";
import { FaCoffee, FaCheck, FaExclamation, FaTimes } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./Notification.css";

const Notification = ({ type, message, visible }) => {
  const [notificationVisible, setNotificationVisible] = useState(visible);
  const iconMap = {
    info: <FaCoffee />,
    warning: <FaExclamation />,
    error: <FaTimes />,
  };

  useEffect(() => {
    if (visible) {
      toast[type](
        <div>
          <span>{message}</span>
        </div>,
        {
          autoClose: 5000,
          onClose: () => setNotificationVisible(false),
        }
      );
    }
  }, [visible, type, message, iconMap]);

  return null;
};

export default Notification;
