import { create } from "zustand";
import { Review, ReviewForm, Property, User } from "@/types";
import { mockReviews } from "@/data/mockData";

interface ReviewState {
  reviews: Review[];
  isLoading: boolean;
  getReviewsByProperty: (propertyId: string) => Review[];
  getReviewsByUser: (userId: string) => Review[];
  createReview: (
    reviewData: ReviewForm & { propertyId: string; reviewerId: string }
  ) => Promise<Review>;
  updateReview: (
    reviewId: string,
    reviewData: Partial<ReviewForm>
  ) => Promise<void>;
  deleteReview: (reviewId: string) => Promise<void>;
  getAverageRating: (propertyId: string) => number;
  getRatingBreakdown: (propertyId: string) => Record<string, number>;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: mockReviews,
  isLoading: false,

  getReviewsByProperty: (propertyId: string) => {
    const { reviews } = get();
    return reviews.filter((review) => review.propertyId === propertyId);
  },

  getReviewsByUser: (userId: string) => {
    const { reviews } = get();
    return reviews.filter((review) => review.reviewerId === userId);
  },

  createReview: async (reviewData) => {
    set({ isLoading: true });

    // Mock review creation - simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newReview: Review = {
      id: Math.random().toString(36).substr(2, 9),
      propertyId: reviewData.propertyId,
      property: {} as Property, // Will be populated in real app
      reviewerId: reviewData.reviewerId,
      reviewer: {} as User, // Will be populated in real app
      rating: reviewData.rating,
      comment: reviewData.comment,
      accuracy: reviewData.accuracy,
      communication: reviewData.communication,
      cleanliness: reviewData.cleanliness,
      location: reviewData.location,
      checkIn: reviewData.checkIn,
      value: reviewData.value,
      createdAt: new Date(),
    };

    const { reviews } = get();
    set({
      reviews: [...reviews, newReview],
      isLoading: false,
    });

    return newReview;
  },

  updateReview: async (reviewId: string, reviewData: Partial<ReviewForm>) => {
    set({ isLoading: true });

    // Mock review update - simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { reviews } = get();
    const updatedReviews = reviews.map((review) =>
      review.id === reviewId ? { ...review, ...reviewData } : review
    );

    set({
      reviews: updatedReviews,
      isLoading: false,
    });
  },

  deleteReview: async (reviewId: string) => {
    set({ isLoading: true });

    // Mock review deletion - simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300));

    const { reviews } = get();
    const filteredReviews = reviews.filter((review) => review.id !== reviewId);

    set({
      reviews: filteredReviews,
      isLoading: false,
    });
  },

  getAverageRating: (propertyId: string) => {
    const { getReviewsByProperty } = get();
    const propertyReviews = getReviewsByProperty(propertyId);

    if (propertyReviews.length === 0) return 0;

    const totalRating = propertyReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return Math.round((totalRating / propertyReviews.length) * 10) / 10;
  },

  getRatingBreakdown: (propertyId: string) => {
    const { getReviewsByProperty } = get();
    const propertyReviews = getReviewsByProperty(propertyId);

    if (propertyReviews.length === 0) {
      return {
        accuracy: 0,
        communication: 0,
        cleanliness: 0,
        location: 0,
        checkIn: 0,
        value: 0,
      };
    }

    const breakdown = propertyReviews.reduce(
      (acc, review) => ({
        accuracy: acc.accuracy + review.accuracy,
        communication: acc.communication + review.communication,
        cleanliness: acc.cleanliness + review.cleanliness,
        location: acc.location + review.location,
        checkIn: acc.checkIn + review.checkIn,
        value: acc.value + review.value,
      }),
      {
        accuracy: 0,
        communication: 0,
        cleanliness: 0,
        location: 0,
        checkIn: 0,
        value: 0,
      }
    );

    const count = propertyReviews.length;
    return {
      accuracy: Math.round((breakdown.accuracy / count) * 10) / 10,
      communication: Math.round((breakdown.communication / count) * 10) / 10,
      cleanliness: Math.round((breakdown.cleanliness / count) * 10) / 10,
      location: Math.round((breakdown.location / count) * 10) / 10,
      checkIn: Math.round((breakdown.checkIn / count) * 10) / 10,
      value: Math.round((breakdown.value / count) * 10) / 10,
    };
  },
}));
