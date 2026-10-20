import { motion } from 'framer-motion';
import WhatsAppIcon from './WhatsAppIcon';
import { openWhatsApp, generalMessage } from '../utils/whatsapp';

export default function WhatsAppButton() {
  return (
    <motion.button
      type="button"
      onClick={() => openWhatsApp(generalMessage())}
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed z-40 right-4 sm:right-6 bottom-4 sm:bottom-6 grid place-items-center w-14 h-14 rounded-full bg-wa text-white shadow-lg shadow-black/50"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <WhatsAppIcon className="w-7 h-7" />
    </motion.button>
  );
}
