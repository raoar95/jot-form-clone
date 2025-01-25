"use client";

import React, { useState, useEffect, MouseEvent } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

/** swiper */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

/** style */
import "./SlotBooking.scss";

/** interfaces */
import type { ICalendarDay } from "../interface/common";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SlotBooking: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeExpertID, setActiveExpertID] = useState<number | null>(1);
  const [activeID, setActiveID] = useState<number | null>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  // Expert Card
  const experts = [
    { id: 1, name: "Anyone", experience: "3 - 8" },
    { id: 2, name: "Expert 2", experience: "2 - 5" },
    { id: 3, name: "Expert 3", experience: "5 - 10" },
  ];

  const handleCardClick = (id: number) => {
    setActiveExpertID(id);
  };

  // Calender
  const generateCalendarDays = (
    year: number,
    month: number
  ): ICalendarDay[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: ICalendarDay[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push({ date: null, isCurrentMonth: false });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          date: new Date(year, month + 1, i),
          isCurrentMonth: false,
        });
      }
    }

    return days;
  };

  const months = [
    generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth() - 1),
    generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth()),
    generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth() + 1),
  ];

  const handlePrevMonth = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);

    if (
      newDate >= new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    ) {
      setCurrentDate(newDate);
    }
    swiper?.slideTo(1, 0);
  };

  const handleNextMonth = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
    swiper?.slideTo(1, 0);
  };

  const isDateDisabled = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isCurrentDay = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleDateClick = (date: Date) => {
    if (!isDateDisabled(date)) {
      setSelectedDate(date);

      const selectSlotSection = document.getElementById("SelectSlot");

      if (selectSlotSection) {
        selectSlotSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(1, 0);
    }
  }, [currentDate, swiper]);

  // Slot Booking
  const timeSlots = [
    { id: 1, startingTime: 11, endTime: 12 },
    { id: 2, startingTime: 12, endTime: 13 },
    { id: 3, startingTime: 13, endTime: 14 },
    { id: 4, startingTime: 14, endTime: 15 },
    { id: 5, startingTime: 15, endTime: 16 },
    { id: 6, startingTime: 16, endTime: 17 },
    { id: 7, startingTime: 17, endTime: 18 },
    { id: 8, startingTime: 18, endTime: 19 },
    { id: 9, startingTime: 19, endTime: 20 },
    { id: 10, startingTime: 20, endTime: 21 },
    { id: 11, startingTime: 21, endTime: 22 },
    { id: 12, startingTime: 22, endTime: 23 },
  ];

  //Format Current Time for Time Slot
  const options: Intl.DateTimeFormatOptions = {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  };

  const currentHours = new Date().getHours();

  const handleActiveID = (id: number) => {
    setActiveID(id);
  };

  return (
    <div className="slot_booking_container flex flex-space-between">
      <div className="calender_container">
        <div className="head">Select Date</div>
        <div className="calender_date_header">
          <button
            onClick={handlePrevMonth}
            disabled={
              currentDate.getMonth() === new Date().getMonth() &&
              currentDate.getFullYear() === new Date().getFullYear()
            }
            className="prev_icon"
            aria-label="Previous month"
          >
            <FaChevronLeft />
          </button>
          <h2 className="head_date_display">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            onClick={handleNextMonth}
            className="next_icon"
            aria-label="Next month"
          >
            <FaChevronRight />
          </button>
        </div>
        <Swiper
          onSwiper={setSwiper}
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          autoHeight={true}
          onSlideChange={(swiper: any) => {
            if (swiper.activeIndex === 0) {
              handlePrevMonth();
            } else if (swiper.activeIndex === 2) {
              handleNextMonth();
            }
          }}
        >
          {months.map((month, monthIndex) => (
            <SwiperSlide key={monthIndex}>
              <div className="weekday_display_section grid">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center py-2">
                    {day}
                  </div>
                ))}
                {month.map((day, index) => (
                  <div
                    key={index}
                    className={`date_display flex justify-center items-center
                    ${
                      !day.date || (day.date && isDateDisabled(day.date))
                        ? "disable"
                        : ""
                    }
                    ${day.date && isCurrentDay(day.date) ? "current_day" : ""}
                    ${
                      day.date &&
                      selectedDate &&
                      day.date.toDateString() === selectedDate.toDateString()
                        ? "selected_day"
                        : ""
                    }
                    ${
                      !day.isCurrentMonth
                        ? "text-gray-400 cursor-not-allowed"
                        : ""
                    }
                  `}
                    onClick={() => day.date && handleDateClick(day.date)}
                  >
                    {day.date ? day.date.getDate() : ""}
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div id="SelectSlot" className="slot_container">
        <div className="head">Select Slot</div>
        <div className="slot_time flex flex-wrap">
          {timeSlots
            .filter((cureElem) => {
              if (
                selectedDate &&
                selectedDate.toDateString() === new Date().toDateString()
              ) {
                return cureElem.startingTime > currentHours;
              } else {
                return cureElem;
              }
            })
            .map((cureElem) => {
              let slotStartingTime = new Date(
                new Date(new Date().setHours(cureElem.startingTime)).setMinutes(
                  0
                )
              ).toLocaleTimeString("en-US", options);

              let slotEndTime = new Date(
                new Date(new Date().setHours(cureElem.endTime)).setMinutes(0)
              ).toLocaleTimeString("en-US", options);
              return (
                <div
                  key={cureElem.id}
                  className={`slot ${activeID === cureElem.id ? "active" : ""}`}
                  onClick={() => handleActiveID(cureElem.id)}
                >
                  {slotStartingTime} - {slotEndTime}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SlotBooking;
