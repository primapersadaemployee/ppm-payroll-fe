import { Popover, PopoverAction, PopoverContent } from "keep-react";
import { CalendarBlank } from "@phosphor-icons/react";
import { DatePicker } from "keep-react";
import { Button } from "keep-react";
import { format } from "date-fns";

export default function InputDate({ label, fieldName, value, onChange }) {
  const selectedDate = value ? new Date(value) : null;

  return (
    <div className="w-full mb-4">
      <label className="block text-sm font-medium text-[#455468] mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <Popover className="w-full">
        <PopoverAction asChild>
          <Button
            color="secondary"
            size="lg"
            className="w-full flex justify-between gap-2 border border-metal-100"
            variant="outline"
          >
            {selectedDate ? (
              format(selectedDate, "dd/MM/yyyy")
            ) : (
              <span className="text-[#8897AE]/30 text-sm">{label}</span>
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
            showOutsideDays={true}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
