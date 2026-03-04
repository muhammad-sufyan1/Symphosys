import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { BookingModal } from '../components/booking/BookingModal';

interface BookingModalContextValue {
  openBookingModal: (source?: string) => void;
  closeBookingModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

interface BookingModalProviderProps {
  children: React.ReactNode;
}

export function BookingModalProvider({ children }: BookingModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('website');

  const openBookingModal = useCallback((nextSource = 'website') => {
    setSource(nextSource);
    setIsOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      openBookingModal,
      closeBookingModal,
    }),
    [openBookingModal, closeBookingModal],
  );

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      <BookingModal isOpen={isOpen} onClose={closeBookingModal} source={source} />
    </BookingModalContext.Provider>
  );
}

export function useBookingModal(): BookingModalContextValue {
  const context = useContext(BookingModalContext);

  if (!context) {
    throw new Error('useBookingModal must be used within a BookingModalProvider.');
  }

  return context;
}
