'use client';

import { Modal } from 'flowbite-react';
import { Share2 } from 'lucide-react';
import { useState } from 'react';

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share';

export function ProductShareBtn({ productUrl }: { productUrl: string }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center space-x-1 text-green-950 dark:text-green-50"
      >
        <Share2 />
        <span>Share</span>
      </button>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Share this Product</Modal.Header>
        <Modal.Body>
          <div className="flex gap-3 flex-wrap">
            <FacebookShareButton url={productUrl}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            <TwitterShareButton url={productUrl}>
              <XIcon size={40} round />
            </TwitterShareButton>

            <WhatsappShareButton url={productUrl}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>

            <LinkedinShareButton url={productUrl}>
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>

            <TelegramShareButton url={productUrl}>
              <TelegramIcon size={40} round />
            </TelegramShareButton>

            <EmailShareButton url={productUrl}>
              <EmailIcon size={40} round />
            </EmailShareButton>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
