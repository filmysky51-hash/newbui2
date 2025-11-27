
// Fix: Removed circular import of 'Content'. The interface is defined in this file.
export type Theme = 'Filmysky-dark' | 'classic-dark' | 'gradient-luxe' | 'minimal-light';

export interface User {
  id: string;
  name: string;
  email: string | null;
  isAnonymous: boolean;
  role: boolean; // true for admin
  createdAt: number;
  viewCount: number;
  fcmToken?: string;
  subscription?: {
    planName: string;
    expiresAt?: number; // For time-based plans
    viewLimit: number; // For view-based plans or base limit. -1 for unlimited (time-based).
    maxQuality: string;
    adsDisabled: boolean;
    liveTvAccess: boolean;
  };
  watchlist?: { [contentId: string]: boolean };
}

export interface CastMember {
    name: string;
    image: string;
}

export interface QualityLink {
    quality: string; // e.g., '1080', '720'
    url: string;
}

export interface Season {
    number: number;
    qualityLinks: QualityLink[];
}

export interface Content {
    id: string;
    title: string;
    type: 'movie' | 'webseries';
    poster: string;
    backdrop: string;
    year: number;
    language: string;
    rating: number;
    storyline: string;
    category: string;
    cast?: CastMember[]; // Changed to optional array
    // For movies
    qualityLinks?: QualityLink[]; // Changed to optional array
    // For series
    seasons?: Season[]; // Changed to optional array
}

export interface LiveTvStream {
    id: string;
    title: string;
    poster: string;
    streamUrl: string;
}

export interface LiveTvNetwork {
    id: string;
    name: string;
    poster: string; // 16:9 poster
}

export interface UpcomingContent {
    id: string;
    title: string;
    poster: string;
    releaseDate: number;
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    type: 'time-based' | 'view-based';
    validity?: number; // in days, for time-based plans
    viewsToAdd?: number; // for view-based plans
    maxQuality: string;
    adsDisabled: boolean;
    liveTvAccess: boolean;
    benefits: string[];
}

export interface Comment {
    id: string;
    userId: string;
    userName:string;
    text: string;
    timestamp: number;
}

export interface ContentRequest {
    id: string;
    userId: string;
    userName: string;
    title: string;
    type: 'Movie' | 'Series';
    notes: string;
    status: 'pending' | 'completed' | 'rejected';
    requestedAt: number;
}

export interface PaymentRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string | null;
  planId: string;
  planName: string;
  amount: number;
  upiId: string;
  transactionNote: string;
  userTransactionId?: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: number;
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    submittedAt: number;
}

export interface AppSettings {
    logoText?: string;
    maintenance?: {
        status: 'ACTIVE' | 'INACTIVE' | 'SCHEDULED';
        scheduledEnd?: number;
        message?: string;
    };
    upiIds?: string[];
    socials?: {
        telegram?: string;
        instagram?: string;
        website?: string;
    };
    adBanner?: {
        imageUrl?: string;
        linkUrl?: string;
    };
    interstitialAd?: {
        url?: string;
        duration?: number;
    };
}
