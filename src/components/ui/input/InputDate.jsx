import { Popover, PopoverAction, PopoverContent } from 'keep-react';
import { CalendarBlank } from '@phosphor-icons/react';
import { DatePicker } from 'keep-react';
import { Button } from 'keep-react';
import { format } from 'date-fns';

export default function InputDate({
  label,
  placeHolder,
  htmlFor,
  fieldName,
  value,
  onChange,
  hideAsterisk = false,
}) {
  const selectedDate = value ? new Date(value) : null;

  return (
    <div className="w-full mb-4">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-[#455468] mb-2"
      >
        {label}{' '}
        <span className={`text-red-500 ${hideAsterisk && 'hidden'}`}>*</span>
      </label>
      <Popover className="w-full">
        <PopoverAction asChild>
          <Button
            id={htmlFor}
            name={htmlFor}
            color="secondary"
            size="lg"
            className="w-full flex justify-between gap-2 border border-metal-100"
            variant="outline"
          >
            {selectedDate ? (
              format(selectedDate, 'dd/MM/yyyy')
            ) : (
              <span className="text-[#8897AE]/30 text-sm">{placeHolder}</span>
            )}
            <CalendarBlank
              size={20}
              className="text-metal-400 dark:text-white"
            />
          </Button>
        </PopoverAction>
        <PopoverContent align="start" className="max-w-min border-0">
          <DatePicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => onChange(fieldName, date)}
            captionLayout="dropdown"
            fromYear={1950}
            toYear={2030}
            classNames={{
              caption: 'relative',
              caption_label: 'hidden',
              caption_dropdowns:
                'flex gap-4 items-center w-full justify-center',
              dropdown_month: 'min-w-[120px] text-sm',
              dropdown_year: 'min-w-[100px] text-sm',
              dropdown:
                'px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
