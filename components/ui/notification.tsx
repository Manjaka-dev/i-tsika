"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle, AlertTriangle } from "lucide-react";

interface NotificationProps {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
  isVisible: boolean;
}

const Notification = ({
  type = "info",
  title,
  message,
  duration = 5000,
  onClose,
  isVisible,
}: NotificationProps) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    setIsShowing(isVisible);
    
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setIsShowing(false);
        if (onClose) onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-white" />,
    error: <AlertTriangle className="w-5 h-5 text-white" />,
    warning: <AlertTriangle className="w-5 h-5 text-white" />,
    info: <CheckCircle className="w-5 h-5 text-white" />,
  };

  const handleClose = () => {
    setIsShowing(false);
    if (onClose) onClose();
  };

  if (!isShowing) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className={`${bgColor[type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-start w-80`}>
        <div className="mr-3 mt-0.5">
          {icons[type]}
        </div>
        <div className="flex-1">
          <h4 className="font-medium">{title}</h4>
          {message && <p className="text-sm mt-1 opacity-90">{message}</p>}
        </div>
        <button onClick={handleClose} className="ml-4">
          <X className="w-5 h-5 text-white opacity-80 hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
}

export default Notification;
