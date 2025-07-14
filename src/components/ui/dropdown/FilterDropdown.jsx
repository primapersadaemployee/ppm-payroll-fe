import { Button, Popover, PopoverAction, PopoverContent } from 'keep-react';

export default function FilterDropdown({ value, options, onChange }) {
  return (
    <Popover>
      <PopoverAction asChild>
        <Button
          variant="outline"
          color="secondary"
          className="w-fit justify-between text-xs lg:text-sm"
        >
          {value}
          <span className="ml-2">▼</span>
        </Button>
      </PopoverAction>
      <PopoverContent className="w-40 p-1">
        <div className="flex flex-col">
          {options.map((option) => (
            <button
              key={option}
              className="px-3 py-2 text-sm text-left hover:bg-gray-100 rounded capitalize"
              onClick={() => onChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
