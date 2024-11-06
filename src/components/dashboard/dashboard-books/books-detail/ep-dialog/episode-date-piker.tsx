import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { ChangeEvent, useState } from 'react';
import { format } from 'date-fns-tz';
import { th } from 'date-fns/locale';

const hours = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toString().padStart(2, '0')
);
const minutes = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, '0')
);
const periods = ['AM', 'PM'];

const EpisodeDatePicker = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string>('12');
  const [minute, setMinute] = useState<string>('00');
  const [period, setPeriod] = useState<string>('AM');

  const formatDateTime = () => {
    if (!date) return 'เลือกวันที่และเวลา';
    const dateWithTime = new Date(date);
    const adjustedHour = period === 'PM' ? parseInt(hour) + 12 : parseInt(hour);
    dateWithTime.setHours(adjustedHour, parseInt(minute));

    return format(dateWithTime, 'd MMMM yyyy HH:mm น.', {
      locale: th,
      timeZone: 'Asia/Bangkok',
    });
  };

  return (
    <div>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[280px] justify-start text-left font-normal text-gray-700"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDateTime()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 shadow-md">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className="p-4"
        />
        <div className="p-4 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            เลือกเวลา
          </label>
          <div className="flex gap-2">
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="bg-white text-black  rounded-md px-2 py-1 focus:ring-0"
            >
              {hours.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
            <select
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="bg-white text-black rounded-md px-2 py-1 focus:ring-0"
            >
              {minutes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-white text-black  rounded-md px-2 py-1 focus:ring-0"
            >
              {periods.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </PopoverContent>
    </div>
  );
};

export default EpisodeDatePicker;
