'use client';

// components/Dialog.tsx
import { ReactNode, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Dialog({ isOpen, onClose, children }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // ESC 키 이벤트 핸들러
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 포커스 초기 위치 설정
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={onClose} // 배경 클릭 시 닫기
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            ref={dialogRef}
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              e.stopPropagation()
            } // 내부 클릭 시 닫히지 않도록
            className="focus-ring w-full max-w-md rounded-xl bg-white p-6 shadow-lg outline-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
