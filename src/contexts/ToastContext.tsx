import React, { createContext, useContext, useState } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { Toast as ToastType } from '../types';
import { X } from 'lucide-react';

interface ToastContextType {
  showToast: (toast: Omit<ToastType, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const showToast = (toast: Omit<ToastType, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((currentToasts) => [...currentToasts, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastPrimitive.Provider>
        {toasts.map((toast) => (
          <ToastPrimitive.Root
            key={toast.id}
            className={`
              fixed bottom-4 right-4 z-50
              bg-white dark:bg-gray-800
              rounded-lg shadow-lg
              border border-gray-200 dark:border-gray-700
              p-4 pr-8
              data-[state=open]:animate-in
              data-[state=closed]:animate-out
              data-[state=closed]:fade-out-0
              data-[state=open]:fade-in-0
              data-[state=closed]:slide-out-to-right-full
              data-[state=open]:slide-in-from-right-full
            `}
            onOpenChange={(open) => !open && removeToast(toast.id)}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <ToastPrimitive.Title className="text-sm font-semibold text-gray-900 dark:text-white">
                  {toast.title}
                </ToastPrimitive.Title>
                {toast.description && (
                  <ToastPrimitive.Description className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {toast.description}
                  </ToastPrimitive.Description>
                )}
              </div>
              <ToastPrimitive.Close className="absolute right-2 top-2 rounded-md p-1 text-gray-500 opacity-0 transition-opacity hover:text-gray-900 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 dark:text-gray-400 dark:hover:text-gray-50">
                <X className="h-4 w-4" />
              </ToastPrimitive.Close>
            </div>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};