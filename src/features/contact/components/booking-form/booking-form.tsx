'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@lib/utils';
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope } from 'react-icons/fa';

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    try {
      // Mock API call to Cal.com
      console.log("Booking data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-card rounded-3xl border border-white/10">
        <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
          <FaCalendarAlt className="text-primary text-2xl" />
        </div>
        <h3 className="text-xl font-bold mb-2">Booking Confirmed!</h3>
        <p className="text-muted-foreground">Thank you. I'll see you on the scheduled time.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl border border-white/10 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <FaCalendarAlt className="text-primary text-xl" />
        <h3 className="text-xl font-bold">Book a 1:1 Session</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Name</label>
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm" />
            <input
              {...register("name")}
              placeholder="Your Name"
              className={cn(
                "w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                errors.name && "border-red-500"
              )}
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email</label>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm" />
            <input
              {...register("email")}
              placeholder="your@email.com"
              className={cn(
                "w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                errors.email && "border-red-500"
              )}
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Date</label>
            <input
              {...register("date")}
              type="date"
              className={cn(
                "w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm",
                errors.date && "border-red-500"
              )}
            />
            {errors.date && <p className="text-red-500 text-xs ml-1">{errors.date.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Time</label>
            <input
              {...register("time")}
              type="time"
              className={cn(
                "w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm",
                errors.time && "border-red-500"
              )}
            />
            {errors.time && <p className="text-red-500 text-xs ml-1">{errors.time.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Confirm Booking
              <FaClock className="text-sm opacity-50" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
