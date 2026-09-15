export {
  EmailDispatchMode,
  MAX_EMAIL_MESSAGE_LENGTH,
  TRANSACTIONAL_FROM_EMAIL,
} from './constants';
export { escapeHtml } from './escape-html';
export {
  isSendgridConfigured,
  sendTransactionalEmail,
  type TransactionalEmailInput,
  type TransactionalEmailResult,
} from './send-transactional-email';
