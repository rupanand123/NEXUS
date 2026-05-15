export enum InquiryStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  RESOLVED = 'resolved'
}

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
  status: InquiryStatus;
  createdAt: any; // serverTimestamp
}
