'use client';

import { Modal } from 'flowbite-react';
import {
  CornerDownLeft,
  Headphones,
  HelpCircle,
  MessageSquare,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function HelpModal() {
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center space-x-1 text-green-950 dark:text-green-50"
      >
        <HelpCircle />
        <span>Help</span>
      </button>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Need Help with Shopping, Talk to us</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="tel:18001234567"
              className="flex items-center space-x-2 text-green-950 dark:text-green-50"
            >
              <div className="flex items-center w-8 h-8 bg-lime-100 justify-center rounded-full">
                <Headphones className="w-6 h-6 text-lime-800" />
              </div>

              <span>Call : 1800-123-4567</span>
            </Link>

            <Link
              href="/track"
              className="flex items-center space-x-2 text-green-950 dark:text-green-50"
            >
              <div className="flex items-center w-8 h-8 bg-lime-100 justify-center rounded-full">
                <Truck className="w-6 h-6 text-lime-800" />
              </div>

              <span>Track your Order</span>
            </Link>

            <Link
              href="/returns"
              className="flex items-center space-x-2 text-green-950 dark:text-green-50"
            >
              <div className="flex items-center w-8 h-8 bg-lime-100 justify-center rounded-full">
                <CornerDownLeft className="w-6 h-6 text-lime-800" />
              </div>

              <span>Returns and Refunds</span>
            </Link>

            <Link
              href="/chat"
              className="flex items-center space-x-2 text-green-950 dark:text-green-50"
            >
              <div className="flex items-center w-8 h-8 bg-lime-100 justify-center rounded-full">
                <MessageSquare className="w-6 h-6 text-lime-800" />
              </div>
              <span>Chat with us</span>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
