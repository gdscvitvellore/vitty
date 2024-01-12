import { create } from "zustand";

export interface Course {
  name: string;
  code: string;
  venue: string;
  slot: string;
  type: string;
  start_time: string | null;
  end_time: string | null;
}

export interface TimeTable {
  timetable: Course[] | null;
}

interface TimeTableStore {
  timetable: TimeTable | null;
  uploadTimetable: (timetable: TimeTable) => void;
  deleteTimetable: () => void;
  deleteSlot: (slot: string) => void;
  addCourse: (course: Course) => void;
}

export const useTimeTableStore = create<TimeTableStore>((set) => ({
  timetable: null,
  uploadTimetable: (data) => {
    set(() => ({
      timetable: data
    }));
  },
  deleteTimetable: () => {
    set(() => ({
      timetable: null,
    }));
  },
  deleteSlot: (slot) => {
    set((state) => ({
      timetable: {
        timetable: state.timetable?.timetable?.filter((course) => course.slot !== slot) || null
      }
    }));
  },
  addCourse: (course: Course) => {
    set((state) => ({
      timetable: {
        timetable: [...state.timetable?.timetable || [], course]
      }
    }));
  }
}));